import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/Dialog";
import ClendarForm from "@/app/components/ClendarForm";
import { useSchedule } from "@/context/EventContext";

type AddEventDialogProps = {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddEventDialog({
  onSuccess,
  onError,
  open,
  onOpenChange,
}: AddEventDialogProps) {
  const { selectedEvent } = useSchedule();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>予定を{selectedEvent ? "編集" : "追加"}する</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <TodoForm
            onSuccess={onSuccess}
            onError={onError}
            onOpenChange={onOpenChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
