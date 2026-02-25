import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use Vite env var for Google Maps API key to avoid committing secrets
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const mapsQuery = encodeURIComponent(
    "Swayog Consultancy Services/Swayog Energy pvt limited, 205, Katol Rd, KT Nagar, Nagpur, Maharashtra 440013"
  );
  const mapsSrc = mapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${mapsQuery}&zoom=14`
    : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = {
      firstName: (form.querySelector('#firstName') as HTMLInputElement)?.value || '',
      lastName: (form.querySelector('#lastName') as HTMLInputElement)?.value || '',
      email: (form.querySelector('#email') as HTMLInputElement)?.value || '',
      subject: (form.querySelector('#subject') as HTMLInputElement)?.value || '',
      message: (form.querySelector('#message') as HTMLTextAreaElement)?.value || '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response received:', text.substring(0, 200));
        throw new Error('Server returned an invalid response. Please check the API configuration.');
      }

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We will reply to your email soon.",
        });
        form.reset();
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Better error message handling
      let errorMessage = "Failed to send message. Please try again later.";
      if (error instanceof SyntaxError && error.message.includes('JSON')) {
        errorMessage = "Server configuration error. The API endpoint may not be properly configured.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="bg-secondary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions? We're here to help you switch to solar.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">
                Get in Touch
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary-dark">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Office</h3>
                    <p className="text-gray-600 leading-relaxed">
                      205, Gauri Ganesh Appartment Utkarsh Nagar,
                      <br />
                      Kt Nagar Garden,behind Cake Link,
                      <br />
                      Katol Road, Nagpur, Maharashtra 440013
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary-dark">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">+91 8484030070</p>
                    <p className="text-sm text-gray-500">Mon-Sat 10am-7pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary-dark">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-gray-600">info@swayogurja.com</p>
                    <p className="text-gray-600">support@swayogurja.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary-dark">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday</p>
                    <p className="text-gray-600">10:00am - 06:30pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-bold mb-2">
                  Looking for a quick quote?
                </h3>
                <p className="text-gray-600 mb-4">
                  Get an instant estimate for your rooftop solar system.
                </p>
                <FreeQuoteModal>
                  <Button className="w-full btn-primary">Get Free Quote</Button>
                </FreeQuoteModal>
              </div>
            </div>

            {/* General Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required placeholder="Harshal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required placeholder="Last Name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="harshal@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required placeholder="General Enquiry" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    className="min-h-[150px]"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 sm:h-14 text-base sm:text-lg bg-orange-600 hover:bg-orange-700"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16 h-[400px] rounded-3xl overflow-hidden bg-gray-100 shadow-md">
            {mapsApiKey ? (
              <iframe
                src={mapsSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              // Fallback: use standard Google Maps embed (no API key) for public place search
              <iframe
                src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Swayog Energy location"
              ></iframe>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
