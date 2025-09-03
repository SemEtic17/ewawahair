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
import { GalleryItem } from "@/pages/admin/GalleryManagement";

interface DeleteGalleryDialogProps {
  item: GalleryItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteItem: (itemId: string) => void;
}

export function DeleteGalleryDialog({
  item,
  open,
  onOpenChange,
  onDeleteItem,
}: DeleteGalleryDialogProps) {
  const handleDelete = () => {
    onDeleteItem(item.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this gallery item? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}