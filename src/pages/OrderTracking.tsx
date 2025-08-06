import { useState } from "react";
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderData, setOrderData] = useState(null);

  // Mock order tracking data
  const mockOrderData = {
    orderNumber: "SUXX001234",
    trackingNumber: "TRK123456789",
    status: "In Transit",
    estimatedDelivery: "2024-01-20",
    items: [
      {
        id: "1",
        name: "Premium Cotton Polo T-Shirt",
        size: "L",
        color: "Navy Blue",
        quantity: 1,
        price: 1999,
        image: "/placeholder.svg"
      },
      {
        id: "2", 
        name: "Classic Denim Jeans",
        size: "32",
        color: "Dark Blue",
        quantity: 1,
        price: 2499,
        image: "/placeholder.svg"
      }
    ],
    shippingAddress: {
      name: "Rajesh Kumar",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 98765 43210"
    },
    timeline: [
      {
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being prepared",
        timestamp: "2024-01-15 10:30 AM",
        completed: true,
        icon: CheckCircle
      },
      {
        status: "Order Packed",
        description: "Your order has been packed and is ready for shipment",
        timestamp: "2024-01-16 02:15 PM",
        completed: true,
        icon: Package
      },
      {
        status: "Shipped",
        description: "Your order has been shipped and is on the way",
        timestamp: "2024-01-17 09:45 AM",
        completed: true,
        icon: Truck
      },
      {
        status: "In Transit",
        description: "Your package is in transit to the delivery location",
        timestamp: "2024-01-18 11:20 AM",
        completed: true,
        current: true,
        icon: MapPin
      },
      {
        status: "Out for Delivery",
        description: "Your package is out for delivery",
        timestamp: "Expected: 2024-01-20 10:00 AM",
        completed: false,
        icon: Truck
      },
      {
        status: "Delivered",
        description: "Your package has been delivered",
        timestamp: "Expected: 2024-01-20 06:00 PM",
        completed: false,
        icon: CheckCircle
      }
    ]
  };

  const handleTrackOrder = () => {
    if (trackingNumber.trim()) {
      // In real app, this would make an API call to Shopify
      setOrderData(mockOrderData);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number or tracking number to see the latest updates
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter order number or tracking number (e.g., SUXX001234 or TRK123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
              </div>
              <Button onClick={handleTrackOrder}>
                <Search className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Results */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order #{orderData.orderNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tracking: {orderData.trackingNumber}
                    </p>
                  </div>
                  <Badge className={getStatusColor(orderData.status)}>
                    {orderData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Estimated Delivery</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(orderData.estimatedDelivery).toDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>{orderData.shippingAddress.name}</p>
                      <p>{orderData.shippingAddress.street}</p>
                      <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state}</p>
                      <p>{orderData.shippingAddress.pincode}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={item.id}>
                      {index > 0 && <Separator />}
                      <div className="flex gap-4 py-3">
                        <div className="w-16 h-16 bg-muted rounded overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size} • Color: {item.color}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm">Qty: {item.quantity}</span>
                            <span className="font-medium">₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Tracking Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.timeline.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            event.completed 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'
                          } ${event.current ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {index < orderData.timeline.length - 1 && (
                            <div className={`w-0.5 h-12 mt-2 ${
                              event.completed ? 'bg-primary' : 'bg-muted'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              event.current ? 'text-primary' : ''
                            }`}>
                              {event.status}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              {event.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Can't find your order or having issues with tracking?
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Contact Support</Button>
              <Button variant="outline" size="sm">FAQ</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;