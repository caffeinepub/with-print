import { useNavigate } from '@tanstack/react-router';
import { Phone, Clock, Truck, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-xl p-2.5 shadow-warm">
                <Printer className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                WITH PRINT
              </h1>
            </div>
            <Button
              onClick={() => navigate({ to: '/payment' })}
              size="lg"
              className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Fast & Affordable Printing for Students
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Quality printing services with next-morning delivery. Perfect for assignments, notes, and projects.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="mb-16">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
            Simple & Transparent Pricing
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* B&W Printing Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-warm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-secondary rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <Printer className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl font-display">Black & White</CardTitle>
                <CardDescription className="text-base">Standard printing</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-primary">₹1</span>
                  <span className="text-xl text-muted-foreground ml-2">/ page</span>
                </div>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> High-quality prints
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> A4 size paper
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Single or double-sided
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Color Printing Card */}
            <Card className="border-2 border-primary/30 hover:border-primary transition-all shadow-warm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <Printer className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-display">Color Printing</CardTitle>
                <CardDescription className="text-base">Vibrant colors</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-primary">₹10</span>
                  <span className="text-xl text-muted-foreground ml-2">/ page</span>
                </div>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Vivid color output
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Premium quality paper
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Perfect for presentations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Info Cards */}
        <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Delivery Info */}
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-accent rounded-lg p-2">
                  <Truck className="h-5 w-5 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Fast Delivery</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Order today and receive your prints <strong className="text-foreground">tomorrow morning</strong>. 
                We ensure timely delivery right to your doorstep on campus.
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-accent rounded-lg p-2">
                  <Phone className="h-5 w-5 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Contact Us</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:9392673014" className="text-primary font-semibold hover:underline">
                  +91 93926 73014
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Call Timings:</p>
                  <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate({ to: '/payment' })}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-6 h-auto shadow-warm font-semibold"
          >
            Proceed to Payment
          </Button>
        </div>
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

