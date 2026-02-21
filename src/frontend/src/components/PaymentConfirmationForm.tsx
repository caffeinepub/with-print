import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSubmitPayment } from '@/hooks/useQueries';

export default function PaymentConfirmationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    utr: '',
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitPaymentMutation = useSubmitPayment();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!screenshot) {
      alert('Please upload a payment screenshot');
      return;
    }

    try {
      // Convert file to Uint8Array
      const arrayBuffer = await screenshot.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Create ExternalBlob with upload progress tracking
      const { ExternalBlob } = await import('@/backend');
      const screenshotBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
        (percentage) => {
          setUploadProgress(percentage);
        }
      );

      // Submit payment
      await submitPaymentMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        utr: formData.utr,
        screenshot: screenshotBlob,
      });

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({ name: '', email: '', phone: '', utr: '' });
      setScreenshot(null);
      setUploadProgress(0);

      // Redirect to home after 5 seconds
      setTimeout(() => {
        navigate({ to: '/' });
      }, 5000);
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Failed to submit payment confirmation. Please try again.');
    }
  };

  if (showSuccess) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="flex justify-center">
          <div className="bg-primary/10 rounded-full p-6">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            ✅ Payment received successfully
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We will verify and start printing. You will get delivery tomorrow morning.
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: '/' })}
          variant="outline"
          className="mt-4"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base">
          Your Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="h-11"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base">
          Your Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="h-11"
        />
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="h-11"
        />
      </div>

      {/* UTR Field */}
      <div className="space-y-2">
        <Label htmlFor="utr" className="text-base">
          UTR / Transaction ID <span className="text-destructive">*</span>
        </Label>
        <Input
          id="utr"
          name="utr"
          type="text"
          placeholder="Enter 12-digit UTR number"
          value={formData.utr}
          onChange={handleInputChange}
          required
          className="h-11"
        />
      </div>

      {/* Screenshot Upload */}
      <div className="space-y-2">
        <Label htmlFor="screenshot" className="text-base">
          Upload Payment Screenshot <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="screenshot"
            name="screenshot"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="h-11 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          {screenshot && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>{screenshot.name}</span>
            </div>
          )}
        </div>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Uploading: {uploadProgress}%
            </p>
          </div>
        )}
      </div>

      {/* Submit Button - Blue as requested */}
      <Button
        type="submit"
        disabled={submitPaymentMutation.isPending}
        className="w-full h-12 text-base font-semibold"
        style={{
          backgroundColor: 'oklch(0.55 0.22 250)',
          color: 'oklch(0.99 0 0)',
        }}
      >
        {submitPaymentMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Confirmation'
        )}
      </Button>
    </form>
  );
}

