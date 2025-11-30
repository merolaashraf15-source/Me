import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getOrders, deleteOrder } from "@/lib/storage";
import type { Order } from "@/lib/types";
import { 
  ClipboardList, 
  User, 
  Phone, 
  Pill, 
  Calendar, 
  Trash2, 
  ShoppingCart,
  Package
} from "lucide-react";

export default function OrdersList() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleDelete = (id: string, medicineName: string) => {
    deleteOrder(id);
    setOrders(getOrders());
    toast({
      title: "Order Deleted",
      description: `Order for ${medicineName} has been removed.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold" data-testid="text-orders-title">
                All Orders
              </h1>
              <p className="text-muted-foreground text-sm">
                {orders.length} {orders.length === 1 ? "order" : "orders"} found
              </p>
            </div>
          </div>
          
          <Link href="/order">
            <Button data-testid="button-new-order">
              <ShoppingCart className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <Card className="py-16" data-testid="card-empty-state">
            <CardContent className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2" data-testid="text-empty-title">
                No Orders Yet
              </h2>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto" data-testid="text-empty-description">
                You haven't placed any medicine orders yet. Start by creating your first order.
              </p>
              <Link href="/order">
                <Button data-testid="button-empty-order">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Place Your First Order
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <Card 
                key={order.id} 
                className="hover-elevate"
                data-testid={`card-order-${index}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" data-testid={`badge-medicine-${index}`}>
                          <Pill className="w-3 h-3 mr-1" />
                          {order.medicine}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span data-testid={`text-customer-${index}`}>{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span data-testid={`text-phone-${index}`}>{order.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span data-testid={`text-date-${index}`}>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(order.id, order.medicine)}
                      className="text-muted-foreground hover:text-destructive"
                      data-testid={`button-delete-${index}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
