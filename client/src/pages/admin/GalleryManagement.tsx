import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddGalleryDialog } from "@/components/admin/AddGalleryDialog";
import { EditGalleryDialog } from "@/components/admin/EditGalleryDialog";
import { DeleteGalleryDialog } from "@/components/admin/DeleteGalleryDialog";
import { useToast } from "@/hooks/use-toast";
import API from "../../utils/api";
import { Badge } from "@/components/ui/badge";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  isVideo: boolean;
  type: string;
  likes: number;
  createdAt: Date;
}

interface BackendGalleryItem {
  _id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  isVideo: boolean;
  type: string;
  likes: number;
  createdAt: string;
}

interface ApiResponse {
  items: BackendGalleryItem[];
  total: number;
  page: number;
  totalPages: number;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'installations', name: 'Installations' },
  { id: 'styles', name: 'Styles' },
  { id: 'transformations', name: 'Transformations' },
  { id: 'reviews', name: 'Customer Reviews' },
];

export default function GalleryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const { toast } = useToast();

  // Fetch gallery items from backend
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setIsLoading(true);
        const response = await API.get<ApiResponse>("/gallery/getgallerys", {
          params: {
            category: selectedCategory,
            page: pagination.page,
            limit: 8
          }
        });
        
        const backendItems = response.data.items || [];
        
        const formattedItems: GalleryItem[] = backendItems.map(item => ({
          id: item._id,
          src: item.src,
          title: item.title,
          category: item.category,
          description: item.description,
          isVideo: item.isVideo,
          type: item.type,
          likes: item.likes,
          createdAt: new Date(item.createdAt)
        }));
        
        setGalleryItems(formattedItems);
        setPagination(prev => ({ ...prev, totalPages: response.data.totalPages }));
      } catch (error) {
        console.error("Failed to fetch gallery items:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load gallery items",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, [selectedCategory, pagination.page]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPagination({ page: 1, totalPages: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const filteredItems = galleryItems.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  );

  const handleAddItem = async (newItem: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    try {
      // Generate temporary ID and set type based on isVideo
      const backendItem = {
        id: `gallery-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        type: newItem.isVideo ? 'video' : 'image',
        src: newItem.src,
        title: newItem.title,
        category: newItem.category,
        description: newItem.description,
        isVideo: newItem.isVideo,
        likes: newItem.likes
      };

      const response = await API.post<BackendGalleryItem>("/gallery", backendItem);
      const createdItem = response.data;
      
      const frontendItem: GalleryItem = {
        id: createdItem._id,
        src: createdItem.src,
        title: createdItem.title,
        category: createdItem.category,
        description: createdItem.description,
        isVideo: createdItem.isVideo,
        type: createdItem.type,
        likes: createdItem.likes,
        createdAt: new Date(createdItem.createdAt)
      };
      
      setGalleryItems(prev => [frontendItem, ...prev]);
      setAddDialogOpen(false);
      toast({
        title: "Gallery Item Added",
        description: "New gallery item has been successfully added.",
      });
    } catch (error) {
      console.error("Error adding gallery item:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add gallery item",
      });
    }
  };

  const handleEditItem = async (updatedItem: GalleryItem) => {
    try {
      const backendUpdate = {
        id: updatedItem.id,
        type: updatedItem.isVideo ? 'video' : 'image',
        src: updatedItem.src,
        title: updatedItem.title,
        category: updatedItem.category,
        description: updatedItem.description,
        isVideo: updatedItem.isVideo
      };

      await API.put(`/gallery/${updatedItem.id}`, backendUpdate);
      
      setGalleryItems(prev => 
        prev.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setEditingItem(null);
      toast({
        title: "Gallery Item Updated",
        description: "Gallery item has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating gallery item:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update gallery item",
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await API.delete(`/gallery/${itemId}`);
      
      setGalleryItems(prev => prev.filter(item => item.id !== itemId));
      setDeletingItem(null);
      toast({
        title: "Gallery Item Deleted",
        description: "Gallery item has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete gallery item",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading gallery items...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">Manage your hair style gallery</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Gallery Item
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search gallery items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className="text-xs sm:text-sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Items */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gallery Items ({filteredItems.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No gallery items found.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative rounded-lg border overflow-hidden">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    {item.isVideo ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => setEditingItem(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setDeletingItem(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-background">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                      <Badge className="ml-2 flex-shrink-0 capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    {item.isVideo ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{item.title}</p>
                      <Badge className="capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Added on {item.createdAt.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditingItem(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeletingItem(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                variant="outline"
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddGalleryDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddItem={handleAddItem}
        categories={categories}
      />

      {editingItem && (
        <EditGalleryDialog
          item={editingItem}
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
          onUpdateItem={handleEditItem}
          categories={categories}
        />
      )}

      {deletingItem && (
        <DeleteGalleryDialog
          item={deletingItem}
          open={!!deletingItem}
          onOpenChange={(open) => !open && setDeletingItem(null)}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </div>
  );
}