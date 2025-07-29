import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const navItems = [
    "Home", "New Launches", "Shirts", "T-Shirts", "Joggers", 
    "Jeans", "Trousers", "Sweater", "Sweatshirts", "Kurtas", 
    "Vest", "Jackets", "Shorts", "Blogs", "Business Inquiry"
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      {/* Top promotional banner */}
      <div className="bg-gradient-hero text-primary px-4 py-2 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-4">
          <span>🔥 Get 15% OFF Sitewide – No Code Needed!</span>
          <code className="bg-primary/20 px-2 py-1 rounded text-xs">SUXXUS15</code>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - Center aligned */}
          <div className="flex-1 flex justify-center md:justify-start">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                SUXXUS
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                international
              </p>
            </div>
          </div>

          {/* Search bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search for products..." 
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Navigation menu - Hidden on mobile */}
        <nav className="hidden md:flex mt-4 border-t pt-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-foreground hover:text-accent transition-colors duration-smooth font-medium"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;