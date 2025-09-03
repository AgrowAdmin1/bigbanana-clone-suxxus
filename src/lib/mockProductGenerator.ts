// Generate multiple products for each category to ensure 25+ products per category

const productImages = {
  shirts: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585598867276-684b8f5ed29e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-499fca8afa9f?w=800&h=600&fit=crop'
  ],
  tshirts: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618354187500-203efd2a9439?w=800&h=600&fit=crop'
  ],
  pants: [
    'https://images.unsplash.com/photo-1575428698297-5c0490c57873?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6ca9d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop'
  ],
  shorts: [
    'https://images.unsplash.com/photo-1560243573-30ca208f932c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591213962084-59a20c23d0dd?w=800&h=600&fit=crop'
  ]
};

const colors = ['Black', 'White', 'Navy', 'Gray', 'Blue', 'Light Blue', 'Dark Blue', 'Khaki', 'Olive', 'Charcoal'];
const clothingSizes = ['S', 'M', 'L', 'XL', '2XL'];
const pantsSizes = ['28', '30', '32', '34', '36', '38'];

const generateVariants = (productId: string, colors: string[], sizes: string[]) => {
  const variants = [];
  let variantId = 1;
  
  colors.forEach(color => {
    sizes.forEach(size => {
      const basePrice = Math.floor(Math.random() * 150) + 20; // $20-$170
      const hasComparePrice = Math.random() > 0.6;
      const comparePrice = hasComparePrice ? basePrice + Math.floor(Math.random() * 50) + 10 : null;
      
      variants.push({
        node: {
          id: `gid://shopify/ProductVariant/${productId}_${variantId++}`,
          title: `${color} / ${size}`,
          price: { amount: basePrice.toFixed(2), currencyCode: 'USD' },
          compareAtPrice: comparePrice ? { amount: comparePrice.toFixed(2), currencyCode: 'USD' } : null,
          availableForSale: Math.random() > 0.1, // 90% availability
          selectedOptions: [
            { name: 'Color', value: color },
            { name: 'Size', value: size }
          ]
        }
      });
    });
  });
  
  return variants.slice(0, Math.min(variants.length, 15)); // Limit variants per product
};

const productNames = {
  'New Launches': [
    'Premium Cotton Blend Shirt', 'Limited Edition Hoodie', 'Signature Collection Polo',
    'Exclusive Designer T-Shirt', 'New Season Denim Jacket', 'Contemporary Formal Shirt',
    'Modern Fit Chinos', 'Luxury Knit Sweater', 'Trendy Graphic Tee', 'Classic Oxford Shirt',
    'Urban Style Hoodie', 'Premium Polo Collection', 'Designer Casual Shirt', 'Elite Cotton Tee',
    'Signature Blend Polo', 'Contemporary Fit Shirt', 'Exclusive Urban Wear', 'Modern Classic Tee',
    'Premium Designer Polo', 'Luxury Cotton Shirt', 'Elite Collection Hoodie', 'Signature Style Tee',
    'Contemporary Urban Polo', 'Premium Modern Shirt', 'Designer Elite Tee', 'Luxury Urban Polo',
    'Signature Collection Shirt', 'Premium Style Hoodie'
  ],
  'Shirts': [
    'Classic Formal Shirt', 'Business Professional Shirt', 'Oxford Cotton Shirt', 'Slim Fit Dress Shirt',
    'Casual Cotton Shirt', 'Linen Blend Shirt', 'Check Pattern Shirt', 'Striped Office Shirt',
    'Premium Dress Shirt', 'Regular Fit Shirt', 'French Cuff Shirt', 'Wrinkle-Free Shirt',
    'Long Sleeve Casual Shirt', 'Short Sleeve Summer Shirt', 'Poplin Dress Shirt', 'Chambray Casual Shirt',
    'Flannel Comfort Shirt', 'Twill Weave Shirt', 'Dobby Texture Shirt', 'Herringbone Dress Shirt',
    'Solid Color Shirt', 'Micro Print Shirt', 'Textured Weave Shirt', 'Classic Fit Shirt',
    'Modern Fit Shirt', 'Tailored Fit Shirt', 'Executive Dress Shirt', 'Weekend Casual Shirt'
  ],
  'Polo Neck T-Shirts': [
    'Premium Polo Neck T-Shirt', 'Classic Pique Polo', 'Performance Polo Shirt', 'Cotton Blend Polo',
    'Moisture-Wicking Polo', 'Casual Polo Tee', 'Sports Polo Shirt', 'Golf Performance Polo',
    'Stretch Polo Shirt', 'Regular Fit Polo', 'Slim Fit Polo', 'Vintage Polo Tee',
    'Athletic Polo Shirt', 'Weekend Polo', 'Business Casual Polo', 'Textured Polo Shirt',
    'Solid Polo Tee', 'Striped Polo Shirt', 'Contrast Collar Polo', 'Long Sleeve Polo',
    'Short Sleeve Polo', 'Ribbed Polo Shirt', 'Knit Polo Tee', 'Lightweight Polo',
    'Heavy Cotton Polo', 'Breathable Polo Shirt', 'Classic Collar Polo', 'Modern Polo Tee'
  ],
  'Round Neck T-Shirts': [
    'Essential Round Neck T-Shirt', 'Basic Cotton Tee', 'Crew Neck T-Shirt', 'Organic Cotton Tee',
    'Vintage Wash T-Shirt', 'Soft Cotton Tee', 'Classic Fit T-Shirt', 'Slim Fit Tee',
    'Regular Fit T-Shirt', 'Oversized Tee', 'Fitted T-Shirt', 'Relaxed Fit Tee',
    'Premium Cotton T-Shirt', 'Breathable Tee', 'Lightweight T-Shirt', 'Heavy Cotton Tee',
    'Ring Spun T-Shirt', 'Combed Cotton Tee', 'Solid Color T-Shirt', 'Heather Tee',
    'Long Sleeve Tee', 'Short Sleeve T-Shirt', 'V-Neck Alternative', 'Henley Style Tee',
    'Pocket T-Shirt', 'Graphic Print Tee', 'Plain Basic Tee', 'Premium Quality T-Shirt'
  ],
  'Joggers': [
    'Athletic Performance Joggers', 'Casual Comfort Joggers', 'Fleece Lined Joggers', 'Cotton Blend Joggers',
    'Slim Fit Joggers', 'Regular Fit Joggers', 'Tapered Joggers', 'Straight Leg Joggers',
    'Drawstring Joggers', 'Elastic Waist Joggers', 'Side Stripe Joggers', 'Cargo Pocket Joggers',
    'Lightweight Joggers', 'Heavy Cotton Joggers', 'Tech Fabric Joggers', 'Moisture-Wicking Joggers',
    'Gym Training Joggers', 'Running Joggers', 'Lounge Joggers', 'Street Style Joggers',
    'Zipper Pocket Joggers', 'Cuffed Ankle Joggers', 'Open Hem Joggers', 'Vintage Joggers',
    'Modern Fit Joggers', 'Relaxed Joggers', 'Performance Fit Joggers', 'Comfort Stretch Joggers'
  ],
  'Jeans': [
    'Classic Slim Fit Jeans', 'Straight Leg Jeans', 'Skinny Fit Jeans', 'Regular Fit Jeans',
    'Bootcut Jeans', 'Relaxed Fit Jeans', 'Tapered Jeans', 'Stretch Denim Jeans',
    'Raw Denim Jeans', 'Washed Denim Jeans', 'Distressed Jeans', 'Clean Look Jeans',
    'Dark Wash Jeans', 'Light Wash Jeans', 'Medium Wash Jeans', 'Black Denim Jeans',
    'Blue Denim Jeans', 'Indigo Jeans', 'Stone Wash Jeans', 'Acid Wash Jeans',
    'Vintage Style Jeans', 'Modern Fit Jeans', 'Classic Cut Jeans', 'Designer Jeans',
    'Premium Denim Jeans', 'Comfort Stretch Jeans', 'High-Quality Jeans', 'Durable Denim Jeans'
  ],
  'Trousers': [
    'Formal Dress Trousers', 'Business Suit Trousers', 'Chino Trousers', 'Dress Pants',
    'Casual Trousers', 'Flat Front Trousers', 'Pleated Trousers', 'Slim Fit Trousers',
    'Regular Fit Trousers', 'Straight Leg Trousers', 'Tapered Trousers', 'Office Trousers',
    'Wool Blend Trousers', 'Cotton Trousers', 'Linen Trousers', 'Polyester Blend Trousers',
    'Wrinkle-Free Trousers', 'Stretch Trousers', 'Comfort Fit Trousers', 'Classic Trousers',
    'Modern Fit Trousers', 'Executive Trousers', 'Professional Trousers', 'Formal Pants',
    'Dress Casual Trousers', 'Smart Casual Trousers', 'Weekend Trousers', 'Versatile Trousers'
  ],
  'Shorts': [
    'Summer Casual Shorts', 'Chino Shorts', 'Cargo Shorts', 'Denim Shorts',
    'Athletic Shorts', 'Board Shorts', 'Swim Shorts', 'Cotton Shorts',
    'Linen Shorts', 'Khaki Shorts', 'Flat Front Shorts', 'Elastic Waist Shorts',
    'Drawstring Shorts', 'Zip Pocket Shorts', 'Side Pocket Shorts', 'Cargo Pocket Shorts',
    'Slim Fit Shorts', 'Regular Fit Shorts', 'Relaxed Fit Shorts', 'Tailored Shorts',
    'Bermuda Shorts', 'Walk Shorts', 'Golf Shorts', 'Tennis Shorts',
    'Beach Shorts', 'Vacation Shorts', 'Weekend Shorts', 'Casual Wear Shorts'
  ]
};

export const generateProducts = () => {
  const allProducts = [];
  let productId = 1000; // Start from 1000 to avoid conflicts

  Object.entries(productNames).forEach(([category, names]) => {
    names.forEach((name, index) => {
      const isClothing = ['New Launches', 'Shirts', 'Polo Neck T-Shirts', 'Round Neck T-Shirts'].includes(category);
      const sizes = isClothing ? clothingSizes : pantsSizes;
      const categoryColors = colors.slice(0, Math.floor(Math.random() * 5) + 3); // 3-7 colors per product
      
      // Select appropriate images based on category
      let imageSet;
      if (category.includes('Shirt') || category === 'New Launches') imageSet = productImages.shirts;
      else if (category.includes('T-Shirt') || category.includes('Polo')) imageSet = productImages.tshirts;
      else if (['Joggers', 'Jeans', 'Trousers'].includes(category)) imageSet = productImages.pants;
      else imageSet = productImages.shorts;
      
      const selectedImages = imageSet.slice(0, 2); // 2 images per product
      const basePrice = Math.floor(Math.random() * 120) + 25; // $25-$145
      
      const product = {
        node: {
          id: `gid://shopify/Product/${productId}`,
          title: name,
          handle: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          description: `Premium quality ${name.toLowerCase()} crafted with attention to detail and comfort. Perfect for modern lifestyle and versatile wear.`,
          images: {
            edges: selectedImages.map((url, imgIndex) => ({
              node: {
                url,
                altText: `${name} - ${imgIndex === 0 ? 'Front View' : 'Detail View'}`
              }
            }))
          },
          variants: {
            edges: generateVariants(productId.toString(), categoryColors, sizes)
          },
          options: [
            { name: 'Color', values: categoryColors },
            { name: 'Size', values: sizes }
          ],
          priceRange: {
            minVariantPrice: { amount: basePrice.toFixed(2), currencyCode: 'USD' },
            maxVariantPrice: { amount: basePrice.toFixed(2), currencyCode: 'USD' }
          },
          tags: [
            category.toLowerCase().replace(/\s+/g, '-'),
            'premium',
            'cotton',
            isClothing ? 'apparel' : 'bottomwear'
          ],
          productType: category,
          vendor: 'SUXXUS',
          createdAt: new Date(2024, 0, index + 1).toISOString(),
          updatedAt: new Date(2024, 0, index + 1).toISOString()
        }
      };
      
      allProducts.push(product);
      productId++;
    });
  });
  
  return { edges: allProducts };
};