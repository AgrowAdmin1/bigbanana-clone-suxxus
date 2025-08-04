import { Search, ShoppingCart, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onCategorySelect?: (category: string) => void;
}

const Header = ({ onCategorySelect }: HeaderProps) => {
  const mainNavItems = [
    "Home", "New Launches", "Shirts", "Polo Neck T-Shirts", "Round Neck T-Shirts", "Joggers", 
    "Jeans", "Trousers", "Shorts"
  ];
  
  const menuItems = ["Blogs", "Business Inquiry", "Support", "Return & Exchange"];
  
  const categories = [
    "All Categories", "New Launches", "Shirts", "Polo Neck T-Shirts", "Round Neck T-Shirts", "Joggers", 
    "Jeans", "Trousers", "Shorts"
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <div className="text-lg font-semibold mb-4">Menu</div>
                {mainNavItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => onCategorySelect?.(item)}
                    className="text-left py-2 text-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <div className="border-t pt-4 mt-4">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors block w-full"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

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

          {/* Search bar with category dropdown - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-1">
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
            {mainNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onCategorySelect?.(item)}
                className="text-foreground hover:text-accent transition-colors duration-smooth font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;