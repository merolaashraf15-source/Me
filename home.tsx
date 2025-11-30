import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { ShoppingCart, ClipboardList, Zap, Shield, Clock } from "lucide-react";
import heroImage from "@assets/stock_images/pharmacy_medicine_pi_8bdc2fa5.jpg";

export default function Home() {
  return (
    <Layout>
      <section 
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            data-testid="text-hero-title"
          >
            Your Trusted Online Medicine Partner
          </h1>
          <p 
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            Order your medicines easily and safely. Fast, reliable, and convenient healthcare delivery right to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base px-8"
                data-testid="button-hero-order"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Medicine
              </Button>
            </Link>
            <Link href="/orders">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-base px-8 bg-white/10 backdrop-blur-md border-white/30 text-white"
                data-testid="button-hero-view-orders"
              >
                <ClipboardList className="w-5 h-5 mr-2" />
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className="text-2xl md:text-3xl font-semibold text-center mb-12"
            data-testid="text-features-title"
          >
            Why Choose MediOrder?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate" data-testid="card-feature-easy">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
                <p className="text-muted-foreground">
                  Simple and intuitive ordering process. Just fill in your details and medicine name to place an order in seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-fast">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
                <p className="text-muted-foreground">
                  Quick processing of all orders. Track your order history anytime and manage your medicine needs efficiently.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-secure">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Your order data is securely stored in your browser. Privacy-focused with no server-side data collection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-4" data-testid="text-cta-title">
            Ready to Order Your Medicine?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start by filling out a simple form with your contact details and the medicine you need.
          </p>
          <Link href="/order">
            <Button size="lg" data-testid="button-cta-order">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Place Your Order Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
