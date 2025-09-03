import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Users, ShoppingCart, TrendingUp, Eye, Heart } from "lucide-react";
import { fetchProducts } from "@/data/products";

export default function AdminOverview() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // If paginated response, use data.products, else use data
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    };
    loadProducts();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: (products?.length ?? 0).toString(),
      icon: Package,
      change: "+2 this week",
      changeType: "positive" as const,
    },
    {
      title: "Active Orders",
      value: "23",
      icon: ShoppingCart,
      change: "+5 today",
      changeType: "positive" as const,
    },
    {
      title: "Total Customers",
      value: "1,234",
      icon: Users,
      change: "+12 this month",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: "$12,456",
      icon: TrendingUp,
      change: "+8.2% vs last month",
      changeType: "positive" as const,
    },
  ];

  const recentActivity = [
    { action: "New order received", time: "2 minutes ago", type: "order" },
    { action: "Product updated", time: "15 minutes ago", type: "product" },
    { action: "New customer registered", time: "1 hour ago", type: "customer" },
    { action: "Review submitted", time: "2 hours ago", type: "review" },
  ];

  const topProducts = products
    .filter(product => product.isBestSeller || product.isNew)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'order' ? 'bg-green-500' :
                      item.type === 'product' ? 'bg-blue-500' :
                      item.type === 'customer' ? 'bg-purple-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-sm">{item.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">${product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.isBestSeller && (
                      <Badge variant="default" className="text-xs">Best Seller</Badge>
                    )}
                    {product.isNew && (
                      <Badge variant="secondary" className="text-xs">New</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}