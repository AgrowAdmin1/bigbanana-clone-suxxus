import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import UserAccount from "./pages/UserAccount";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import { QueryClient } from "@tanstack/react-query";
import { ShopifyProvider } from "./contexts/ShopifyContext";
import Collection from "./pages/Collection";

function App() {
  return (
    <QueryClient>
      <ShopifyProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collection/:category" element={<Collection />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<UserAccount />} />
              <Route path="/orders/:orderId" element={<OrderTracking />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ShopifyProvider>
    </QueryClient>
  );
}

export default App;
