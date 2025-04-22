
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { CartProvider } from "./hooks/useCart";
import { AuthProvider } from "./hooks/useAuth";
import { useState, useEffect } from "react";

// Pages
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

// Initialize the QueryClient with safer defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Get the base URL from the environment or default to '/'
const basename = '/';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Simulate checking if everything is ready
    console.log("App initializing...");
    try {
      // Any initialization logic here
      console.log("App initialized successfully");
      setIsLoading(false);
    } catch (err) {
      console.error("App initialization failed:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsLoading(false);
    }
  }, []);
  
  console.log("App render state:", { isLoading, error });
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 max-w-md bg-white rounded-xl shadow-md">
          <h1 className="text-xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={basename}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books/:slug" element={<BookDetail />} />
                  <Route path="/categories" element={<CategoryPage />} />
                  <Route path="/categories/:slug" element={<CategoryPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/account/orders" element={<Account />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
