import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Eye, 
  Heart,
  Package,
  Calendar,
  Download
} from 'lucide-react';
import { useShopify } from '@/contexts/ShopifyContext';

interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
    image: string;
  }>;
  salesTrend: Array<{
    date: string;
    sales: number;
    orders: number;
  }>;
  customerInsights: {
    newCustomers: number;
    returningCustomers: number;
    topLocations: Array<{
      location: string;
      customers: number;
    }>;
  };
  productMetrics: {
    totalViews: number;
    wishlistAdds: number;
    cartAdds: number;
    checkoutStarts: number;
  };
}

const ShopifyAnalytics = () => {
  const { customer } = useShopify();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);

  // Mock analytics data - in real app this would come from Shopify Admin API
  const mockAnalyticsData: AnalyticsData = {
    totalSales: 125000,
    totalOrders: 486,
    totalCustomers: 1240,
    conversionRate: 3.2,
    averageOrderValue: 2570,
    topProducts: [
      {
        id: '1',
        name: 'Premium Cotton Polo',
        sales: 124,
        revenue: 24800,
        image: '/placeholder.svg',
      },
      {
        id: '2',
        name: 'Classic Denim Jeans',
        sales: 98,
        revenue: 24500,
        image: '/placeholder.svg',
      },
      {
        id: '3',
        name: 'Casual Sneakers',
        sales: 76,
        revenue: 22800,
        image: '/placeholder.svg',
      },
    ],
    salesTrend: [
      { date: '2024-01-01', sales: 15000, orders: 45 },
      { date: '2024-01-02', sales: 18000, orders: 52 },
      { date: '2024-01-03', sales: 22000, orders: 68 },
      { date: '2024-01-04', sales: 19000, orders: 58 },
      { date: '2024-01-05', sales: 25000, orders: 72 },
      { date: '2024-01-06', sales: 21000, orders: 61 },
      { date: '2024-01-07', sales: 28000, orders: 85 },
    ],
    customerInsights: {
      newCustomers: 186,
      returningCustomers: 1054,
      topLocations: [
        { location: 'Mumbai', customers: 245 },
        { location: 'Delhi', customers: 198 },
        { location: 'Bangalore', customers: 167 },
        { location: 'Chennai', customers: 134 },
        { location: 'Hyderabad', customers: 112 },
      ],
    },
    productMetrics: {
      totalViews: 15600,
      wishlistAdds: 892,
      cartAdds: 1456,
      checkoutStarts: 724,
    },
  };

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      setLoading(true);
      // In real app, this would be:
      // const data = await shopifyAdminAPI.getAnalytics(selectedPeriod);
      setTimeout(() => {
        setAnalyticsData(mockAnalyticsData);
        setLoading(false);
      }, 1000);
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (!customer || loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <Package className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              {loading ? 'Loading analytics...' : 'Please sign in to view analytics'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Track your store performance and customer insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {['7d', '30d', '90d'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.totalSales)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalOrders}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalCustomers}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(analyticsData.conversionRate)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.salesTrend.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="text-sm">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">
                          {formatCurrency(item.sales)}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {item.orders} orders
                        </Badge>
                      </div>
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
                  {analyticsData.topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.sales} sold • {formatCurrency(product.revenue)}
                        </p>
                      </div>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Product Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.productMetrics.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total page views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wishlist Adds</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.productMetrics.wishlistAdds}</div>
                <p className="text-xs text-muted-foreground">Items saved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cart Adds</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.productMetrics.cartAdds}</div>
                <p className="text-xs text-muted-foreground">Added to cart</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Checkout Starts</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.productMetrics.checkoutStarts}</div>
                <p className="text-xs text-muted-foreground">Checkout initiated</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Customers</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{analyticsData.customerInsights.newCustomers}</span>
                      <Badge variant="secondary">15%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Returning Customers</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{analyticsData.customerInsights.returningCustomers}</span>
                      <Badge variant="secondary">85%</Badge>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Average Order Value: {formatCurrency(analyticsData.averageOrderValue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.customerInsights.topLocations.map((location, index) => (
                    <div key={location.location} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="text-sm">{location.location}</span>
                      </div>
                      <span className="font-medium">{location.customers}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <p className="text-sm text-muted-foreground">
                Key performance indicators for your store
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Conversion Funnel</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Product Views</span>
                      <span>{analyticsData.productMetrics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cart Adds</span>
                      <span>{analyticsData.productMetrics.cartAdds} ({((analyticsData.productMetrics.cartAdds / analyticsData.productMetrics.totalViews) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Checkout Starts</span>
                      <span>{analyticsData.productMetrics.checkoutStarts} ({((analyticsData.productMetrics.checkoutStarts / analyticsData.productMetrics.cartAdds) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Orders</span>
                      <span>{analyticsData.totalOrders} ({((analyticsData.totalOrders / analyticsData.productMetrics.checkoutStarts) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Key Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Conversion Rate</span>
                      <span className="font-medium text-green-600">{formatPercentage(analyticsData.conversionRate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Order Value</span>
                      <span className="font-medium">{formatCurrency(analyticsData.averageOrderValue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Customer Lifetime Value</span>
                      <span className="font-medium">{formatCurrency(analyticsData.averageOrderValue * 3.2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Return Customer Rate</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopifyAnalytics;