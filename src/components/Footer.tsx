import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-1">SUXXUS</h3>
              <p className="text-sm opacity-80 uppercase tracking-wider">international</p>
            </div>
            <p className="text-sm opacity-90 mb-6 leading-relaxed">
              Premium fashion brand dedicated to providing high-quality, comfortable, and stylish clothing for the modern individual.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Size Guide</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Shipping Info</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Returns</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Shirts</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">T-Shirts</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Joggers</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Shorts</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Jackets</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm opacity-90 mb-4">
              Subscribe to get special offers, free giveaways, and updates on new arrivals.
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/60"
              />
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2024 SUXXUS International. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;