import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";

import {
  createEvent,
  updateEvent,
  type Event,
  type EventInput,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  titleEn: z.string().min(1, "Required"),
  titleFi: z.string().optional(),
  titleAm: z.string().optional(),
  descriptionEn: z.string().min(1, "Required"),
  descriptionFi: z.string().optional(),
  descriptionAm: z.string().optional(),
  locationEn: z.string().optional(),
  locationFi: z.string().optional(),
  locationAm: z.string().optional(),
  eventDate: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

const toApiDate = (local: string): string => {
  // <input type="datetime-local"> returns "YYYY-MM-DDTHH:MM"; API expects seconds and UTC (.NET rejects Kind=Unspecified).
  const withSeconds = local.length === 16 ? `${local}:00` : local;
  return withSeconds.endsWith("Z") ? withSeconds : `${withSeconds}Z`;
};

const toLocalInput = (iso: string): string => {
  // API stores "2026-04-05T10:00:00"; datetime-local wants "2026-04-05T10:00".
  if (!iso) return "";
  return iso.length >= 16 ? iso.slice(0, 16) : iso;
};

const buildDefaults = (event?: Event): FormValues => ({
  titleEn: event?.title?.en ?? "",
  titleFi: event?.title?.fi ?? "",
  titleAm: event?.title?.am ?? "",
  descriptionEn: event?.description?.en ?? "",
  descriptionFi: event?.description?.fi ?? "",
  descriptionAm: event?.description?.am ?? "",
  locationEn: event?.location?.en ?? "",
  locationFi: event?.location?.fi ?? "",
  locationAm: event?.location?.am ?? "",
  eventDate: toLocalInput(event?.eventDate ?? ""),
});

const toInput = (values: FormValues): EventInput => ({
  title: {
    en: values.titleEn,
    fi: values.titleFi || undefined,
    am: values.titleAm || undefined,
  },
  description: {
    en: values.descriptionEn,
    fi: values.descriptionFi || undefined,
    am: values.descriptionAm || undefined,
  },
  location: {
    en: values.locationEn || undefined,
    fi: values.locationFi || undefined,
    am: values.locationAm || undefined,
  },
  eventDate: toApiDate(values.eventDate),
});

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event;
}

const EventForm = ({ open, onOpenChange, event }: EventFormProps) => {
  const isEdit = Boolean(event);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaults(event),
  });

  useEffect(() => {
    if (open) reset(buildDefaults(event));
  }, [open, event, reset]);

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const input = toInput(values);
      return isEdit && event
        ? updateEvent(event.rowKey, input)
        : createEvent(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(isEdit ? "Event updated" : "Event created");
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
          <DialogTitle>{isEdit ? "Edit event" : "New event"}</DialogTitle>
          <DialogDescription>
            Fill in English (required). Finnish and Amharic translations are
            optional.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="eventDate">Date & time (UTC)</Label>
            <Input
              id="eventDate"
              type="datetime-local"
              {...register("eventDate")}
            />
            {errors.eventDate && (
              <p className="text-sm text-destructive mt-1">
                {errors.eventDate.message}
              </p>
            )}
          </div>

          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="fi">Finnish</TabsTrigger>
              <TabsTrigger value="am">Amharic</TabsTrigger>
            </TabsList>

            <TabsContent value="en" className="space-y-3">
              <div>
                <Label htmlFor="titleEn">Title *</Label>
                <Input id="titleEn" {...register("titleEn")} />
                {errors.titleEn && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.titleEn.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="descriptionEn">Description *</Label>
                <Textarea
                  id="descriptionEn"
                  rows={4}
                  {...register("descriptionEn")}
                />
                {errors.descriptionEn && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.descriptionEn.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="locationEn">Location</Label>
                <Input id="locationEn" {...register("locationEn")} />
              </div>
            </TabsContent>

            <TabsContent value="fi" className="space-y-3">
              <div>
                <Label htmlFor="titleFi">Title</Label>
                <Input id="titleFi" {...register("titleFi")} />
              </div>
              <div>
                <Label htmlFor="descriptionFi">Description</Label>
                <Textarea
                  id="descriptionFi"
                  rows={4}
                  {...register("descriptionFi")}
                />
              </div>
              <div>
                <Label htmlFor="locationFi">Location</Label>
                <Input id="locationFi" {...register("locationFi")} />
              </div>
            </TabsContent>

            <TabsContent value="am" className="space-y-3">
              <div>
                <Label htmlFor="titleAm">Title</Label>
                <Input id="titleAm" {...register("titleAm")} />
              </div>
              <div>
                <Label htmlFor="descriptionAm">Description</Label>
                <Textarea
                  id="descriptionAm"
                  rows={4}
                  {...register("descriptionAm")}
                />
              </div>
              <div>
                <Label htmlFor="locationAm">Location</Label>
                <Input id="locationAm" {...register("locationAm")} />
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
                : "Create event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
