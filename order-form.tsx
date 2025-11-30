import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { saveOrder } from "@/lib/storage";
import { ShoppingCart, User, Phone, Pill, CheckCircle, Loader2 } from "lucide-react";

export default function OrderForm() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    medicine: "",
  });
  const [errors, setErrors] = useState({
    customerName: "",
    phone: "",
    medicine: "",
  });

  const validateForm = (): boolean => {
    const newErrors = {
      customerName: "",
      phone: "",
      medicine: "",
    };
    let isValid = true;

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
      isValid = false;
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[\d\s\-+()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.medicine.trim()) {
      newErrors.medicine = "Medicine name is required";
      isValid = false;
    } else if (formData.medicine.trim().length < 2) {
      newErrors.medicine = "Medicine name must be at least 2 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      saveOrder({
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        medicine: formData.medicine.trim(),
      });

      toast({
        title: "Order Placed Successfully!",
        description: `Your order for ${formData.medicine} has been submitted.`,
      });

      setFormData({ customerName: "", phone: "", medicine: "" });
      setErrors({ customerName: "", phone: "", medicine: "" });
      
      setTimeout(() => navigate("/orders"), 1500);
    } catch {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-lg" data-testid="card-order-form">
          <CardHeader className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl" data-testid="text-form-title">
              Order Medicine
            </CardTitle>
            <CardDescription data-testid="text-form-description">
              Fill in your details below to place a medicine order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Customer Name
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  className={errors.customerName ? "border-destructive" : ""}
                  disabled={isSubmitting}
                  data-testid="input-customer-name"
                />
                {errors.customerName && (
                  <p className="text-sm text-destructive" data-testid="error-customer-name">
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                  disabled={isSubmitting}
                  data-testid="input-phone"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive" data-testid="error-phone">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicine" className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-muted-foreground" />
                  Medicine Name
                </Label>
                <Input
                  id="medicine"
                  type="text"
                  placeholder="Enter the medicine you need"
                  value={formData.medicine}
                  onChange={(e) => handleInputChange("medicine", e.target.value)}
                  className={errors.medicine ? "border-destructive" : ""}
                  disabled={isSubmitting}
                  data-testid="input-medicine"
                />
                {errors.medicine && (
                  <p className="text-sm text-destructive" data-testid="error-medicine">
                    {errors.medicine}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
                data-testid="button-submit-order"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
