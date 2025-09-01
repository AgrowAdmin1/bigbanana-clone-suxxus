import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "New Launches",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      description: "Latest arrivals and trending styles"
    },
    {
      name: "Shirts",
      image: "https://images.unsplash.com/photo-1585580533049-a9922c653531?w=800&h=600&fit=crop",
      description: "Classic and modern shirts for every occasion"
    },
    {
      name: "Polo Neck T-Shirts",
      image: "https://images.unsplash.com/photo-1618354691373-499fca8afa9f?w=800&h=600&fit=crop",
      description: "Stylish polo neck t-shirts for a smart casual look"
    },
    {
      name: "Round Neck T-Shirts",
      image: "https://images.unsplash.com/photo-1516253084785-a277a51480c3?w=800&h=600&fit=crop",
      description: "Comfortable round neck t-shirts for everyday wear"
    },
    {
      name: "Hoodies & Sweatshirts",
      image: "https://images.unsplash.com/photo-1533960459849-78a8e975339c?w=800&h=600&fit=crop",
      description: "Cozy hoodies and sweatshirts for ultimate comfort"
    },
    {
      name: "Jackets",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb63a820?w=800&h=600&fit=crop",
      description: "Stylish jackets to keep you warm and protected"
    },
    {
      name: "Track Pants",
      image: "https://images.unsplash.com/photo-1618354715186-64c4725a2d0f?w=800&h=600&fit=crop",
      description: "Comfortable and stylish track pants for workouts and casual wear"
    },
    {
      name: "Joggers",
      image: "https://images.unsplash.com/photo-1575428698297-5c0490c57873?w=800&h=600&fit=crop",
      description: "Trendy joggers for a relaxed and sporty look"
    },
    {
      name: "Jeans",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6ca9d?w=800&h=600&fit=crop",
      description: "Classic and modern jeans for every style"
    },
    {
      name: "Trousers",
      image: "https://images.unsplash.com/photo-1618354187500-203efd2a9439?w=800&h=600&fit=crop",
      description: "Formal and casual trousers for a sophisticated look"
    },
    {
      name: "Shorts",
      image: "https://images.unsplash.com/photo-1560243573-30ca208f932c?w=800&h=600&fit=crop",
      description: "Comfortable and stylish shorts for warm weather"
    },
    {
      name: "Boxers",
      image: "https://images.unsplash.com/photo-1624555723945-08f92a8223a0?w=800&h=600&fit=crop",
      description: "Comfortable and breathable boxers for everyday wear"
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/collection/${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collections designed for every occasion and style preference
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="aspect-w-3 aspect-h-2 overflow-hidden bg-muted">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold leading-tight line-clamp-1">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
