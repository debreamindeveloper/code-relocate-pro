import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteOpeningHour, type OpeningHour } from "@/integrations/azure";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteHourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hour?: OpeningHour;
}

const DeleteHourDialog = ({
  open,
  onOpenChange,
  hour,
}: DeleteHourDialogProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (dayOfWeek: number) => deleteOpeningHour(dayOfWeek),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["openingHours"] });
      toast.success("Opening hours deleted");
      onOpenChange(false);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Delete failed: ${msg}`);
    },
  });

  const label =
    hour?.dayName?.en ??
    hour?.dayName?.fi ??
    hour?.dayName?.am ??
    "this day";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete opening hours?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the opening hours entry for <strong>{label}</strong>.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={mutation.isPending || !hour}
            onClick={(e) => {
              e.preventDefault();
              if (hour) mutation.mutate(hour.dayOfWeek);
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {mutation.isPending ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteHourDialog;
