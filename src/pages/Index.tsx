
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Play, 
  MessageCircle, 
  Twitter,
  Clock,
  Headphones,
  Shield,
  Star,
  Users,
  Eye
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Heart,
      title: "Instagram Likes",
      description: "Increase your likes on Instagram posts",
      price: "From $1",
      unit: "per 100 likes",
      color: "text-pink-600"
    },
    {
      icon: Play,
      title: "YouTube Views", 
      description: "Boost your YouTube video view count",
      price: "From $2",
      unit: "per 1000 views",
      color: "text-red-600"
    },
    {
      icon: MessageCircle,
      title: "Telegram Members",
      description: "Get more members for your Telegram",
      price: "From $3", 
      unit: "per 100 members",
      color: "text-blue-600"
    },
    {
      icon: Twitter,
      title: "Twitter Retweets",
      description: "Gain retweets for your Twitter posts",
      price: "From $1",
      unit: "per 50 retweets", 
      color: "text-sky-600"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're here to help you anytime"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Safe and secure payment methods"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-1 bg-orange-500 rounded"></div>
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">SMM Kings</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#services" className="text-gray-600 hover:text-gray-900">Services</a>
              <Button variant="ghost" onClick={() => navigate('/auth')}>Login</Button>
              <Button onClick={() => navigate('/auth')}>Register</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Grow Your Social Media Faster
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Affordable. Reliable. Instant Delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <service.icon className={`w-12 h-12 mx-auto ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">{service.price}</p>
                    <p className="text-sm text-gray-500">{service.unit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <feature.icon className="w-16 h-16 mx-auto text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-4 h-1 bg-orange-500 rounded"></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold">SMM Kings</h3>
              </div>
              <p className="text-gray-600 text-sm">
                The best SMM panel for growing your social media presence quickly and affordably.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-900">YouTube</a></li>
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">Telegram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                <div className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 SMM Kings. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
