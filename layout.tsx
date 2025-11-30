import { Link, useLocation } from "wouter";
import { Pill, Home, ClipboardList, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer" data-testid="link-home-logo">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg hidden sm:inline">MediOrder</span>
            </div>
          </Link>
          
          <nav className="flex items-center gap-2">
            <Link href="/">
              <Button 
                variant={location === "/" ? "secondary" : "ghost"} 
                size="sm"
                data-testid="link-nav-home"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link href="/order">
              <Button 
                variant={location === "/order" ? "secondary" : "ghost"} 
                size="sm"
                data-testid="link-nav-order"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Order Medicine</span>
              </Button>
            </Link>
            <Link href="/orders">
              <Button 
                variant={location === "/orders" ? "secondary" : "ghost"} 
                size="sm"
                data-testid="link-nav-orders"
              >
                <ClipboardList className="w-4 h-4" />
                <span className="hidden sm:inline">View Orders</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-6 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Online Medicine Order System - Demo Application
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            All orders are stored locally in your browser using LocalStorage
          </p>
        </div>
      </footer>
    </div>
  );
}
