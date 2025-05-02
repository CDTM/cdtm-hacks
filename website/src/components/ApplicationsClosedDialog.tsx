import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ApplicationsClosedDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationsClosedDialog = ({
  isOpen,
  onOpenChange,
}: ApplicationsClosedDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Applications are closed</DialogTitle>
          <DialogDescription>
            The application period for CDTM Hacks 2025 has ended. Thank you for your interest!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationsClosedDialog; 