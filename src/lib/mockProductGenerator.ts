// Additional mock products to ensure each category has 25+ products
export const generateAdditionalProducts = () => {
  const categories = [
    'New Launches', 'Shirts', 'Polo Neck T-Shirts', 'Round Neck T-Shirts',
    'Joggers', 'Jeans', 'Trousers', 'Shorts'
  ];

  const baseImages = {
    'New Launches': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    'Shirts': 'https://images.unsplash.com/photo-1585598867276-684b8f5ed29e?w=800&h=600&fit=crop',
    'Polo Neck T-Shirts': 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=800&h=600&fit=crop',
    'Round Neck T-Shirts': 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=600&fit=crop',
    'Joggers': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop',
    'Jeans': 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&h=600&fit=crop',
    'Trousers': 'https://images.unsplash.com/photo-1506629905057-f4e7604cad72?w=800&h=600&fit=crop',
    'Shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=600&fit=crop'
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const colors = ['Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Green', 'Purple'];

  const additionalProducts: any[] = [];
  let productIdCounter = 100;

  categories.forEach((category, categoryIndex) => {
    // Generate 25 products per category
    for (let i = 1; i <= 25; i++) {
      const productId = productIdCounter++;
      const basePrice = 29 + (categoryIndex * 10) + (i * 2);
      const selectedSize = sizes[i % sizes.length];
      const selectedColor = colors[i % colors.length];

      additionalProducts.push({
        node: {
          id: `gid://shopify/Product/${productId}`,
          title: `${category} Style ${i}`,
          handle: `${category.toLowerCase().replace(/\s+/g, '-')}-style-${i}`,
          description: `Premium ${category.toLowerCase()} style ${i} with modern design and comfort fit. Perfect for any occasion.`,
          images: {
            edges: [
              {
                node: {
                  url: `${baseImages[category]}${i > 10 ? `&sig=${i}` : ''}`,
                  altText: `${category} Style ${i}`
                }
              }
            ]
          },
          variants: {
            edges: [
              {
                node: {
                  id: `gid://shopify/ProductVariant/${productId}`,
                  title: `${selectedColor} / ${selectedSize}`,
                  price: { amount: `${basePrice}.99`, currencyCode: 'USD' },
                  compareAtPrice: { amount: `${basePrice + 20}.99`, currencyCode: 'USD' },
                  availableForSale: true,
                  selectedOptions: [
                    { name: 'Color', value: selectedColor },
                    { name: 'Size', value: selectedSize }
                  ],
                  image: {
                    url: `${baseImages[category]}${i > 10 ? `&sig=${i}` : ''}`,
                    altText: `${category} Style ${i}`
                  }
                }
              }
            ]
          },
          options: [
            { name: 'Color', values: colors },
            { name: 'Size', values: sizes }
          ],
          priceRange: {
            minVariantPrice: { amount: `${basePrice}.99`, currencyCode: 'USD' },
            maxVariantPrice: { amount: `${basePrice}.99`, currencyCode: 'USD' }
          },
          tags: [category.toLowerCase().replace(/\s+/g, '-'), selectedSize, selectedColor.toLowerCase(), 'premium'],
          productType: category,
          vendor: 'SUXXUS',
          createdAt: `2024-01-${String(i).padStart(2, '0')}T00:00:00Z`,
          updatedAt: `2024-01-${String(i).padStart(2, '0')}T00:00:00Z`
        }
      });
    }
  });

  return additionalProducts;
};