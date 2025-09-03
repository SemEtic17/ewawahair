import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Heart, Shield, Star, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest 100% human hair from ethical suppliers worldwide.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We stand behind every product we sell.',
    },
    {
      icon: Shield,
      title: 'Ethical Sourcing',
      description: 'All our hair is ethically sourced with full transparency and fair compensation.',
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We never compromise on quality. Every product meets our strict standards.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '5+', label: 'Years Experience' },
    { number: '25+', label: 'Countries Served' },
    { number: '4.9', label: 'Average Rating' },
  ];

  const team = [
    {
      name: 'Maria Johnson',
      role: 'Founder & CEO',
      image: '/placeholder.svg',
      description: 'Hair industry veteran with 15+ years of experience.',
    },
    {
      name: 'Sarah Williams',
      role: 'Head of Quality',
      image: '/placeholder.svg',
      description: 'Ensures every product meets our premium standards.',
    },
    {
      name: 'Jessica Brown',
      role: 'Customer Experience',
      image: '/placeholder.svg',
      description: 'Dedicated to providing exceptional customer service.',
    },
  ];

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
              About <span className="text-luxury-gold">Ewawa Hair</span>
            </h1>
            <p className="text-luxury max-w-3xl mx-auto">
              We're passionate about providing women with the highest quality human hair 
              products that empower confidence and celebrate natural beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="heading-section text-luxury-black">
                Our <span className="text-luxury-gold">Story</span>
              </h2>
              <div className="space-y-4 text-luxury-black/80">
                <p className="text-premium">
                  Ewawa Hair was founded with a simple mission: to provide women with access to 
                  premium quality human hair that looks and feels completely natural. Our journey 
                  began when our founder, Maria, struggled to find high-quality hair extensions 
                  that matched her standards.
                </p>
                <p className="text-premium">
                  After years of research and building relationships with ethical suppliers 
                  worldwide, we established Ewawa Hair as a trusted source for luxury human hair 
                  products. Today, we're proud to serve thousands of women globally, helping 
                  them achieve their dream hair.
                </p>
                <p className="text-premium">
                  Every product in our collection is carefully selected and tested to ensure 
                  it meets our rigorous quality standards. We believe that every woman deserves 
                  to feel confident and beautiful, and that's what drives us every day.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="/placeholder.svg"
                alt="Our Story"
                className="w-full rounded-lg shadow-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/20 to-transparent rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-luxury-white-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-luxury-black mb-4">
              Our <span className="text-luxury-gold">Values</span>
            </h2>
            <p className="text-luxury text-luxury-black/70 max-w-2xl mx-auto">
              These core values guide everything we do, from sourcing to customer service.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift transition-luxury">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-luxury-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-luxury-black mb-3">
                      {value.title}
                    </h3>
                    <p className="text-luxury-black/70">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-luxury-black/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-luxury-white-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-luxury-black mb-4">
              Meet Our <span className="text-luxury-gold">Team</span>
            </h2>
            <p className="text-luxury text-luxury-black/70 max-w-2xl mx-auto">
              The passionate people behind Ewawa Hair who make excellence possible.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover-lift transition-luxury">
                  <CardContent className="p-6 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-playfair text-xl font-semibold text-luxury-black mb-1">
                      {member.name}
                    </h3>
                    <Badge className="mb-3 bg-luxury-gold text-luxury-black hover:bg-luxury-gold">
                      {member.role}
                    </Badge>
                    <p className="text-luxury-black/70 text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-luxury text-luxury-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="heading-section">
              Ready to Experience <span className="text-luxury-gold">Premium Quality</span>?
            </h2>
            <p className="text-luxury max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Ewawa Hair for their hair needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
              <Button className="btn-gold">
                Shop Now
              </Button>
              </Link>
              <Link to="/contact">
              <Button variant="outline" className="border-luxury-white text-luxury-black hover:bg-luxury-gold hover:text-luxury-white hover:border-luxury-gold">
                Contact Us
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;