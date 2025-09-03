import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter,
  MessageCircle,
  Headphones,
  Package
} from 'lucide-react';
import { toast } from 'sonner';
import { sendContactEmail, type ContactFormData } from '@/services/emailService';
import { isEmailjsConfigured } from '@/config/emailjs';

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+251 926444499',
      description: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'ewawa_hair@gmail.com',
      description: 'We reply within 24 hours',
      action: 'Send Email',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Instant support',
      action: 'Start Chat',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      details: '@ewawahair',
      description: 'Follow for updates',
      action: 'Follow Us',
    },
  ];

  const faqs = [
    {
      icon: Package,
      question: 'What is your return policy?',
      answer: '30-day return policy for unopened products in original packaging.',
    },
    {
      icon: Headphones,
      question: 'How do I care for my hair?',
      answer: 'Use sulfate-free shampoos, deep condition weekly, and avoid excessive heat.',
    },
    {
      icon: MapPin,
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide with tracking and insurance included.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check if EmailJS is configured
    if (!isEmailjsConfigured()) {
      toast.error('Email service is not configured. Please contact us directly at hello@mahair.com');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-luxury-white"
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-luxury text-luxury-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="heading-luxury">
              Contact <span className="text-luxury-gold">Us</span>
            </h1>
            <p className="text-luxury max-w-2xl mx-auto">
              Have questions about our products or need personalized recommendations? 
              We're here to help you find your perfect hair solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift transition-luxury cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-8 w-8 text-luxury-gold" />
                    </div>
                    <h3 className="font-playfair text-lg font-semibold text-luxury-black mb-2">
                      {method.title}
                    </h3>
                    <p className="text-luxury-black font-medium mb-1">
                      {method.details}
                    </p>
                    <p className="text-luxury-black/60 text-sm mb-4">
                      {method.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-luxury-white-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-luxury-black">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-luxury" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-luxury-black">
                      Business Hours
                    </h3>
                  </div>
                  <div className="space-y-2 text-luxury-black/70">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-luxury-black">
                      Our Location
                    </h3>
                  </div>
                  <p className="text-luxury-black/70 mb-4">
                    Bole infront of Selam Citymall<br />
                    La Amir Building<br />
                    2nd Floor
                  </p>
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-luxury-black mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <Button size="icon" variant="outline">
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-luxury-black mb-4">
              Frequently Asked <span className="text-luxury-gold">Questions</span>
            </h2>
            <p className="text-luxury text-luxury-black/70 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-4">
                      <faq.icon className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <h3 className="font-playfair text-lg font-semibold text-luxury-black mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-luxury-black/70">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;