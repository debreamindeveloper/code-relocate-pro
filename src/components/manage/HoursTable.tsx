import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";

import { fetchOpeningHours } from "@/integrations/azure";
import type {
  MultilingualText,
  OpeningHour,
} from "@/integrations/azure/storageService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HoursForm from "./HoursForm";
import DeleteHourDialog from "./DeleteHourDialog";

const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const pickText = (value: MultilingualText | undefined): string =>
  value?.en ?? value?.fi ?? value?.am ?? "";

const HoursTable = () => {
  const [editing, setEditing] = useState<OpeningHour | undefined>(undefined);
  const [deleting, setDeleting] = useState<OpeningHour | undefined>(undefined);

  const { data, isLoading, isError, error } = useQuery<OpeningHour[]>({
    queryKey: ["openingHours"],
    queryFn: fetchOpeningHours,
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
        Failed to load opening hours:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border p-6 text-center text-muted-foreground">
        No opening hours configured yet.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((hour) => {
              const dayLabel =
                pickText(hour.dayName) || DAY_LABELS[hour.dayOfWeek] || "—";
              return (
                <TableRow key={hour.dayOfWeek}>
                  <TableCell className="font-medium">{dayLabel}</TableCell>
                  <TableCell>
                    {hour.isClosed ? (
                      <span className="text-muted-foreground">Closed</span>
                    ) : (
                      <span className="text-green-600">Open</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {hour.isClosed
                      ? "—"
                      : `${hour.openTime?.slice(0, 5)} – ${hour.closeTime?.slice(0, 5)}`}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => setEditing(hour)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => setDeleting(hour)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <HoursForm
        open={Boolean(editing)}
        onOpenChange={(open) => !open && setEditing(undefined)}
        hour={editing}
      />

      <DeleteHourDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(undefined)}
        hour={deleting}
      />
    </>
  );
};

export default HoursTable;
