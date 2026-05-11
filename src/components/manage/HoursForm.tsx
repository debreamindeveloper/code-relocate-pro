import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";

import {
  createOpeningHour,
  updateOpeningHour,
  type OpeningHour,
  type OpeningHourInput,
} from "@/integrations/azure";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const baseSchema = z.object({
  dayOfWeek: z.coerce.number().int().min(0).max(6),
  nameEn: z.string().min(1, "Required"),
  nameFi: z.string().optional(),
  nameAm: z.string().optional(),
  isClosed: z.boolean(),
  openTime: z.string(),
  closeTime: z.string(),
});

const schema = baseSchema.superRefine((data, ctx) => {
  if (!data.isClosed) {
    if (!data.openTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["openTime"],
        message: "Required when not closed",
      });
    }
    if (!data.closeTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["closeTime"],
        message: "Required when not closed",
      });
    }
  }
});

type FormValues = z.infer<typeof schema>;

const buildDefaults = (hour?: OpeningHour): FormValues => ({
  dayOfWeek: hour?.dayOfWeek ?? 0,
  nameEn: hour?.dayName?.en ?? "",
  nameFi: hour?.dayName?.fi ?? "",
  nameAm: hour?.dayName?.am ?? "",
  isClosed: hour?.isClosed ?? false,
  openTime: hour?.openTime ?? "",
  closeTime: hour?.closeTime ?? "",
});

const toInput = (values: FormValues): OpeningHourInput => ({
  dayOfWeek: values.dayOfWeek,
  dayName: {
    en: values.nameEn,
    fi: values.nameFi || undefined,
    am: values.nameAm || undefined,
  },
  isClosed: values.isClosed,
  openTime: values.isClosed ? "" : values.openTime,
  closeTime: values.isClosed ? "" : values.closeTime,
});

interface HoursFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hour?: OpeningHour;
}

const HoursForm = ({ open, onOpenChange, hour }: HoursFormProps) => {
  const isEdit = Boolean(hour);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaults(hour),
  });

  useEffect(() => {
    if (open) reset(buildDefaults(hour));
  }, [open, hour, reset]);

  const isClosed = watch("isClosed");

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const input = toInput(values);
      return isEdit && hour
        ? updateOpeningHour(hour.dayOfWeek, input)
        : createOpeningHour(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["openingHours"] });
      toast.success(isEdit ? "Opening hours updated" : "Opening hours created");
      onOpenChange(false);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`${isEdit ? "Update" : "Create"} failed: ${msg}`);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit opening hours" : "New day"}
          </DialogTitle>
          <DialogDescription>
            English day name is required. Finnish and Amharic are optional.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="dayOfWeek">Day</Label>
            <Controller
              control={control}
              name="dayOfWeek"
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => field.onChange(Number(v))}
                  disabled={isEdit}
                >
                  <SelectTrigger id="dayOfWeek">
                    <SelectValue placeholder="Pick a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAY_LABELS.map((label, idx) => (
                      <SelectItem key={idx} value={String(idx)}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.dayOfWeek && (
              <p className="text-sm text-destructive mt-1">
                {errors.dayOfWeek.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <Label htmlFor="isClosed" className="font-medium">
                Closed all day
              </Label>
              <p className="text-xs text-muted-foreground">
                When on, the time fields below are ignored.
              </p>
            </div>
            <Controller
              control={control}
              name="isClosed"
              render={({ field }) => (
                <Switch
                  id="isClosed"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="openTime">Opens</Label>
              <Input
                id="openTime"
                type="time"
                disabled={isClosed}
                {...register("openTime")}
              />
              {errors.openTime && (
                <p className="text-sm text-destructive mt-1">
                  {errors.openTime.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="closeTime">Closes</Label>
              <Input
                id="closeTime"
                type="time"
                disabled={isClosed}
                {...register("closeTime")}
              />
              {errors.closeTime && (
                <p className="text-sm text-destructive mt-1">
                  {errors.closeTime.message}
                </p>
              )}
            </div>
          </div>

          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="fi">Finnish</TabsTrigger>
              <TabsTrigger value="am">Amharic</TabsTrigger>
            </TabsList>

            <TabsContent value="en" className="space-y-3">
              <div>
                <Label htmlFor="nameEn">Day name *</Label>
                <Input id="nameEn" {...register("nameEn")} />
                {errors.nameEn && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.nameEn.message}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="fi" className="space-y-3">
              <div>
                <Label htmlFor="nameFi">Day name</Label>
                <Input id="nameFi" {...register("nameFi")} />
              </div>
            </TabsContent>

            <TabsContent value="am" className="space-y-3">
              <div>
                <Label htmlFor="nameAm">Day name</Label>
                <Input id="nameAm" {...register("nameAm")} />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? "Saving…"
                : isEdit
                ? "Save changes"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HoursForm;
