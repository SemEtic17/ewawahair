import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GalleryItem } from "@/pages/admin/GalleryManagement";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const gallerySchema = z.object({
  src: z.string().min(1, "Source URL is required").url("Must be a valid URL"),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  isVideo: z.boolean().default(false),
  likes: z.number().default(0),
});

type GalleryFormData = z.infer<typeof gallerySchema>;

interface EditGalleryDialogProps {
  item: GalleryItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateItem: (item: GalleryItem) => void;
  categories: { id: string; name: string }[];
}

export function EditGalleryDialog({
  item,
  open,
  onOpenChange,
  onUpdateItem,
  categories
}: EditGalleryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      src: item.src,
      title: item.title,
      category: item.category,
      description: item.description,
      isVideo: item.isVideo,
      likes: item.likes,
    },
  });

  const isVideo = form.watch("isVideo");

  useEffect(() => {
    if (item) {
      form.reset({
        src: item.src,
        title: item.title,
        category: item.category,
        description: item.description,
        isVideo: item.isVideo,
        likes: item.likes,
      });
    }
  }, [item, form]);

  const onSubmit = async (data: GalleryFormData) => {
    setIsSubmitting(true);
    try {
      const updatedItem: GalleryItem = {
        ...item,
        ...data,
        type: data.isVideo ? 'video' : 'image'
      };
      
      onUpdateItem(updatedItem);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating gallery item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Gallery Item</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="isVideo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Is Video</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Check if this is a video item
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="src"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isVideo ? "Video URL" : "Image URL"}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={isVideo 
                        ? "https://example.com/video.mp4" 
                        : "https://example.com/image.jpg"} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Updating..." : "Update Item"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}