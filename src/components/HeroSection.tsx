import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[500px] bg-gradient-hero overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-black/10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
        <div className="absolute top-32 right-1/3 text-6xl text-black/5 font-bold">×</div>
        <div className="absolute bottom-32 right-10 text-4xl text-white/20 font-bold">×</div>
        <div className="absolute top-60 left-1/3 text-8xl text-black/5 font-bold">×</div>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
              Premium
              <br />
              <span className="text-brand-brown">Fashion</span>
              <br />
              Collection
            </h2>
            <p className="text-lg md:text-xl text-primary/80 mb-8 max-w-md">
              Discover our exclusive range of premium clothing designed for comfort and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-background text-primary hover:bg-background/90 font-semibold border border-primary/20">
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-primary"
              >
                View Catalog
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-background/20 rounded-full backdrop-blur-sm border border-background/30 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-background/10 rounded-full flex items-center justify-center">
                  <div className="text-primary/80 text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-background/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">👔</span>
                    </div>
                    <p className="text-lg font-semibold">Premium Quality</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-amber rounded-full flex items-center justify-center shadow-glow">
                <span className="text-xl">😊</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-background/20 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;