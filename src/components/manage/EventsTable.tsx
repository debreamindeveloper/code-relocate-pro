import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleDot, Pencil, Trash2 } from "lucide-react";

import { fetchAllEvents } from "@/integrations/azure";
import type { Event, MultilingualText } from "@/integrations/azure/storageService";
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
import EventForm from "./EventForm";
import DeleteEventDialog from "./DeleteEventDialog";

const pickText = (value: MultilingualText | undefined): string =>
  value?.en ?? value?.fi ?? value?.am ?? "";

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
};

const isPast = (iso: string): boolean => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return false;
  return date.getTime() < Date.now();
};

const EventsTable = () => {
  const [editing, setEditing] = useState<Event | undefined>(undefined);
  const [deleting, setDeleting] = useState<Event | undefined>(undefined);

  const { data, isLoading, isError, error } = useQuery<Event[]>({
    queryKey: ["events", "admin"],
    queryFn: fetchAllEvents,
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
        Failed to load events: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border p-6 text-center text-muted-foreground">
        No events yet.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((event) => {
              const upcoming = !isPast(event.eventDate);
              return (
              <TableRow
                key={`${event.partitionKey}/${event.rowKey}`}
                className={upcoming ? "" : "opacity-60"}
              >
                <TableCell>
                  {upcoming ? (
                    <CircleDot
                      className="h-4 w-4 text-green-600"
                      aria-label="Upcoming"
                    />
                  ) : null}
                </TableCell>
                <TableCell className="font-medium">{pickText(event.title)}</TableCell>
                <TableCell>{formatDate(event.eventDate)}</TableCell>
                <TableCell>{pickText(event.location)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit"
                      onClick={() => setEditing(event)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => setDeleting(event)}
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

      <EventForm
        open={Boolean(editing)}
        onOpenChange={(open) => !open && setEditing(undefined)}
        event={editing}
      />

      <DeleteEventDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(undefined)}
        event={deleting}
      />
    </>
  );
};

export default EventsTable;
