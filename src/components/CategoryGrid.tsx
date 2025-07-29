import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Shirts",
      description: "Premium casual shirts",
      icon: "👔",
      gradient: "from-brand-cyan to-brand-green"
    },
    {
      id: 2,
      name: "Shorts",
      description: "Comfortable summer shorts",
      icon: "🩳",
      gradient: "from-brand-green to-brand-yellow"
    },
    {
      id: 3,
      name: "Polo",
      description: "Classic polo collection",
      icon: "👕",
      gradient: "from-brand-yellow to-brand-purple"
    },
    {
      id: 4,
      name: "Henley",
      description: "Stylish henley tees",
      icon: "👔",
      gradient: "from-brand-purple to-brand-cyan"
    },
    {
      id: 5,
      name: "Trackpant",
      description: "Athletic trackpants",
      icon: "👖",
      gradient: "from-brand-cyan to-brand-yellow"
    },
    {
      id: 6,
      name: "Jackets",
      description: "Premium outerwear",
      icon: "🧥",
      gradient: "from-brand-green to-brand-purple"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of premium clothing designed for modern lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group relative overflow-hidden border-0 shadow-card hover:shadow-glow transition-all duration-smooth cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div>
              
              <div className="relative p-6 text-center text-white min-h-[200px] flex flex-col justify-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-bounce">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:scale-105 transition-transform duration-smooth">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {category.description}
                </p>
                
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="mt-auto bg-white/20 text-white border-white/30 hover:bg-white hover:text-primary backdrop-blur-sm"
                >
                  Shop Now
                </Button>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-smooth"></div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-hero text-white hover:opacity-90">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;