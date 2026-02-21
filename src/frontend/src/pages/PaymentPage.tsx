import { ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentConfirmationForm from '@/components/PaymentConfirmationForm';

export default function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/' })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Complete Your Payment
          </h1>
          <p className="text-muted-foreground">
            Scan the QR code below and submit your payment confirmation
          </p>
        </div>

        {/* Payment QR Card */}
        <Card className="mb-8 shadow-warm border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display flex items-center justify-center gap-2">
              <span className="text-3xl">💜</span> Pay Using PhonePe
            </CardTitle>
            <CardDescription className="text-base">
              Scan the QR code with any UPI app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <img
                  src="/assets/generated/phonepe-qr.dim_400x400.png"
                  alt="PhonePe Payment QR Code"
                  className="w-64 h-64 md:w-80 md:h-80"
                />
              </div>
            </div>

            {/* UPI Details */}
            <div className="bg-secondary/50 rounded-xl p-6 space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">UPI ID</p>
                <p className="text-xl md:text-2xl font-bold text-primary font-mono">
                  9392673014@axl
                </p>
              </div>
              <div className="text-center pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p className="text-lg font-semibold text-foreground">
                  Kairamkonda Upendra Devi
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Instructions */}
        <Card className="mb-8 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-display">How to Pay</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                'Open PhonePe / Google Pay / Paytm',
                'Scan the QR code above',
                'Enter the total amount',
                'Complete the payment',
                'Take a screenshot of the payment confirmation',
                'Fill the form below with your details',
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Payment Confirmation Form */}
        <Card className="shadow-warm border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-display">Submit Payment Confirmation</CardTitle>
            <CardDescription>
              Fill in your details and upload the payment screenshot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentConfirmationForm />
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/60 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} WITH PRINT. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'with-print'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

