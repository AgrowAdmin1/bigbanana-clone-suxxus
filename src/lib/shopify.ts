// Shopify Storefront API configuration and utilities
export const SHOPIFY_CONFIG = {
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'demo-store.myshopify.com',
  storefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'demo-token',
  apiVersion: '2024-01',
  useMockData: true // Enable mock data for demo
};

// Mock products for demo
const MOCK_PRODUCTS = {
  edges: [
    // New Launches
    {
      node: {
        id: 'gid://shopify/Product/1',
        title: 'Premium Cotton Blend Shirt',
        handle: 'premium-cotton-blend-shirt',
        description: 'Latest premium cotton blend shirt with modern fit and breathable fabric.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop',
                altText: 'Premium Cotton Blend Shirt - Blue'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
                altText: 'Premium Cotton Blend Shirt - White'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/1',
                title: 'Blue / M',
                price: { amount: '79.99', currencyCode: 'USD' },
                compareAtPrice: { amount: '99.99', currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Blue' },
                  { name: 'Size', value: 'M' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Blue', 'White', 'Black'] },
          { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '79.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '79.99', currencyCode: 'USD' }
        },
        tags: ['new', 'premium', 'cotton'],
        productType: 'New Launches',
        vendor: 'SUXXUS',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    },
    
    // Shirts
    {
      node: {
        id: 'gid://shopify/Product/2',
        title: 'Classic Formal Shirt',
        handle: 'classic-formal-shirt',
        description: 'Elegant formal shirt perfect for office wear and special occasions.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1585598867276-684b8f5ed29e?w=800&h=600&fit=crop',
                altText: 'Classic Formal Shirt'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=600&fit=crop',
                altText: 'Classic Formal Shirt - Detail'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/2',
                title: 'White / L',
                price: { amount: '59.99', currencyCode: 'USD' },
                compareAtPrice: null,
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'White' },
                  { name: 'Size', value: 'L' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['White', 'Light Blue', 'Navy'] },
          { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '59.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '59.99', currencyCode: 'USD' }
        },
        tags: ['formal', 'office'],
        productType: 'Shirts',
        vendor: 'SUXXUS',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
      }
    },
    
    // Polo Neck T-Shirts
    {
      node: {
        id: 'gid://shopify/Product/3',
        title: 'Premium Polo Neck T-Shirt',
        handle: 'premium-polo-neck-tshirt',
        description: 'Comfortable polo neck t-shirt with premium cotton blend fabric.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1618354691373-499fca8afa9f?w=800&h=600&fit=crop',
                altText: 'Premium Polo Neck T-Shirt'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=600&fit=crop',
                altText: 'Premium Polo Neck T-Shirt - Side View'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/3',
                title: 'Navy / M',
                price: { amount: '44.99', currencyCode: 'USD' },
                compareAtPrice: { amount: '54.99', currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Navy' },
                  { name: 'Size', value: 'M' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Navy', 'White', 'Black', 'Gray'] },
          { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '44.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '44.99', currencyCode: 'USD' }
        },
        tags: ['polo', 'casual', 'cotton'],
        productType: 'Polo Neck T-Shirts',
        vendor: 'SUXXUS',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z'
      }
    },
    
    // Round Neck T-Shirts
    {
      node: {
        id: 'gid://shopify/Product/4',
        title: 'Essential Round Neck T-Shirt',
        handle: 'essential-round-neck-tshirt',
        description: 'Comfortable round neck t-shirt made from 100% organic cotton.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
                altText: 'Essential Round Neck T-Shirt'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=800&h=600&fit=crop',
                altText: 'Essential Round Neck T-Shirt - Back View'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/4',
                title: 'White / L',
                price: { amount: '24.99', currencyCode: 'USD' },
                compareAtPrice: null,
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'White' },
                  { name: 'Size', value: 'L' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['White', 'Black', 'Gray', 'Navy'] },
          { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '24.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '24.99', currencyCode: 'USD' }
        },
        tags: ['organic', 'basic', 'cotton'],
        productType: 'Round Neck T-Shirts',
        vendor: 'SUXXUS',
        createdAt: '2024-01-04T00:00:00Z',
        updatedAt: '2024-01-04T00:00:00Z'
      }
    },
    
    // Joggers
    {
      node: {
        id: 'gid://shopify/Product/5',
        title: 'Athletic Performance Joggers',
        handle: 'athletic-performance-joggers',
        description: 'High-performance joggers with moisture-wicking technology and flexible fit.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1575428698297-5c0490c57873?w=800&h=600&fit=crop',
                altText: 'Athletic Performance Joggers'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop',
                altText: 'Athletic Performance Joggers - Detail'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/5',
                title: 'Black / 32',
                price: { amount: '69.99', currencyCode: 'USD' },
                compareAtPrice: { amount: '89.99', currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Black' },
                  { name: 'Size', value: '32' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Black', 'Navy', 'Gray'] },
          { name: 'Size', values: ['28', '30', '32', '34', '36'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '69.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '69.99', currencyCode: 'USD' }
        },
        tags: ['athletic', 'performance', 'moisture-wicking'],
        productType: 'Joggers',
        vendor: 'SUXXUS',
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z'
      }
    },
    
    // Jeans
    {
      node: {
        id: 'gid://shopify/Product/6',
        title: 'Classic Slim Fit Jeans',
        handle: 'classic-slim-fit-jeans',
        description: 'Premium quality denim jeans with modern slim fit and comfortable stretch.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6ca9d?w=800&h=600&fit=crop',
                altText: 'Classic Slim Fit Jeans'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop',
                altText: 'Classic Slim Fit Jeans - Detail'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/6',
                title: 'Dark Blue / 32',
                price: { amount: '89.99', currencyCode: 'USD' },
                compareAtPrice: null,
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Dark Blue' },
                  { name: 'Size', value: '32' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Dark Blue', 'Light Blue', 'Black'] },
          { name: 'Size', values: ['28', '30', '32', '34', '36', '38'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '89.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '89.99', currencyCode: 'USD' }
        },
        tags: ['denim', 'slim-fit', 'stretch'],
        productType: 'Jeans',
        vendor: 'SUXXUS',
        createdAt: '2024-01-06T00:00:00Z',
        updatedAt: '2024-01-06T00:00:00Z'
      }
    },
    
    // Trousers
    {
      node: {
        id: 'gid://shopify/Product/7',
        title: 'Formal Dress Trousers',
        handle: 'formal-dress-trousers',
        description: 'Elegant dress trousers perfect for formal occasions and office wear.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1618354187500-203efd2a9439?w=800&h=600&fit=crop',
                altText: 'Formal Dress Trousers'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1506629905607-bb5199f27365?w=800&h=600&fit=crop',
                altText: 'Formal Dress Trousers - Detail'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/7',
                title: 'Navy / 34',
                price: { amount: '119.99', currencyCode: 'USD' },
                compareAtPrice: { amount: '149.99', currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Navy' },
                  { name: 'Size', value: '34' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Navy', 'Charcoal', 'Black'] },
          { name: 'Size', values: ['30', '32', '34', '36', '38'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '119.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '119.99', currencyCode: 'USD' }
        },
        tags: ['formal', 'dress', 'office'],
        productType: 'Trousers',
        vendor: 'SUXXUS',
        createdAt: '2024-01-07T00:00:00Z',
        updatedAt: '2024-01-07T00:00:00Z'
      }
    },
    
    // Shorts
    {
      node: {
        id: 'gid://shopify/Product/8',
        title: 'Summer Casual Shorts',
        handle: 'summer-casual-shorts',
        description: 'Lightweight and breathable shorts perfect for summer activities and casual wear.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1560243573-30ca208f932c?w=800&h=600&fit=crop',
                altText: 'Summer Casual Shorts'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1591213962084-59a20c23d0dd?w=800&h=600&fit=crop',
                altText: 'Summer Casual Shorts - Side View'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/8',
                title: 'Khaki / 32',
                price: { amount: '39.99', currencyCode: 'USD' },
                compareAtPrice: null,
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Khaki' },
                  { name: 'Size', value: '32' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Khaki', 'Navy', 'Black', 'Olive'] },
          { name: 'Size', values: ['28', '30', '32', '34', '36'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '39.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '39.99', currencyCode: 'USD' }
        },
        tags: ['summer', 'casual', 'lightweight'],
        productType: 'Shorts',
        vendor: 'SUXXUS',
        createdAt: '2024-01-08T00:00:00Z',
        updatedAt: '2024-01-08T00:00:00Z'
      }
    },
    
    // Additional New Launch items
    {
      node: {
        id: 'gid://shopify/Product/9',
        title: 'Limited Edition Hoodie',
        handle: 'limited-edition-hoodie',
        description: 'Exclusive limited edition hoodie with premium materials and unique design.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop',
                altText: 'Limited Edition Hoodie'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
                altText: 'Limited Edition Hoodie - Back View'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/9',
                title: 'Gray / L',
                price: { amount: '129.99', currencyCode: 'USD' },
                compareAtPrice: { amount: '159.99', currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Gray' },
                  { name: 'Size', value: 'L' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Gray', 'Black', 'Navy'] },
          { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '129.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '129.99', currencyCode: 'USD' }
        },
        tags: ['new', 'limited-edition', 'premium', 'hoodie'],
        productType: 'New Launches',
        vendor: 'SUXXUS',
        createdAt: '2024-01-09T00:00:00Z',
        updatedAt: '2024-01-09T00:00:00Z'
      }
    },

    // More Shirts
    {
      node: {
        id: 'gid://shopify/Product/10',
        title: 'Casual Linen Shirt',
        handle: 'casual-linen-shirt',
        description: 'Breathable linen shirt perfect for casual outings and warm weather.',
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=600&fit=crop',
                altText: 'Casual Linen Shirt'
              }
            },
            {
              node: {
                url: 'https://images.unsplash.com/photo-1622470952794-61d72cc0a605?w=800&h=600&fit=crop',
                altText: 'Casual Linen Shirt - Detail'
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/10',
                title: 'Beige / M',
                price: { amount: '69.99', currencyCode: 'USD' },
                compareAtPrice: null,
                availableForSale: true,
                selectedOptions: [
                  { name: 'Color', value: 'Beige' },
                  { name: 'Size', value: 'M' }
                ]
              }
            }
          ]
        },
        options: [
          { name: 'Color', values: ['Beige', 'White', 'Light Blue'] },
          { name: 'Size', values: ['S', 'M', 'L', 'XL'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '69.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '69.99', currencyCode: 'USD' }
        },
        tags: ['linen', 'casual', 'breathable'],
        productType: 'Shirts',
        vendor: 'SUXXUS',
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z'
      }
    }
  ],
  pageInfo: { hasNextPage: false, endCursor: null }
};

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          image: {
            url: string;
            altText: string;
          };
          product: {
            id: string;
            title: string;
            handle: string;
          };
          price: {
            amount: string;
            currencyCode: string;
          };
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
        cost: {
          totalAmount: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }>;
  };
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Array<{
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  }>;
  orders: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        orderNumber: number;
        processedAt: string;
        financialStatus: string;
        fulfillmentStatus: string;
        totalPrice: {
          amount: string;
          currencyCode: string;
        };
        lineItems: {
          edges: Array<{
            node: {
              title: string;
              quantity: number;
              variant: {
                image: {
                  url: string;
                  altText: string;
                };
                price: {
                  amount: string;
                  currencyCode: string;
                };
                product: {
                  handle: string;
                };
              };
            };
          }>;
        };
      };
    }>;
  };
}

// GraphQL queries for Shopify Storefront API
export const SHOPIFY_QUERIES = {
  GET_PRODUCTS: `
    query getProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
      products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            tags
            productType
            vendor
            createdAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,

  GET_PRODUCT_BY_HANDLE: `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        tags
        productType
        vendor
      }
    }
  `,

  CREATE_CART: `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      title
                      handle
                    }
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  ADD_TO_CART: `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      title
                      handle
                    }
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  UPDATE_CART_LINES: `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      title
                      handle
                    }
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  REMOVE_FROM_CART: `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      title
                      handle
                    }
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  CUSTOMER_ACCESS_TOKEN_CREATE: `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,

  CUSTOMER_CREATE: `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,

  GET_CUSTOMER: `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
        addresses(first: 10) {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        orders(first: 20) {
          edges {
            node {
              id
              name
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 50) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image {
                        url
                        altText
                      }
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        handle
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
};

// Shopify API client
export class ShopifyAPI {
  private domain: string;
  private storefrontToken: string;
  private apiVersion: string;
  private useMockData: boolean;

  constructor() {
    this.domain = SHOPIFY_CONFIG.domain;
    this.storefrontToken = SHOPIFY_CONFIG.storefrontToken;
    this.apiVersion = SHOPIFY_CONFIG.apiVersion;
    this.useMockData = SHOPIFY_CONFIG.useMockData || false;
  }

  private async request(query: string, variables?: any) {
    const url = `https://${this.domain}/api/${this.apiVersion}/graphql.json`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  }

  // Product methods
  async getProducts(options: {
    first?: number;
    query?: string;
    sortKey?: string;
    reverse?: boolean;
  } = {}) {
    if (this.useMockData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(MOCK_PRODUCTS), 500); // Simulate API delay
      });
    }

    const { first = 20, query, sortKey = 'CREATED_AT', reverse = true } = options;
    
    const data = await this.request(SHOPIFY_QUERIES.GET_PRODUCTS, {
      first,
      query,
      sortKey,
      reverse,
    });
    
    return data.products;
  }

  async getProductByHandle(handle: string) {
    const data = await this.request(SHOPIFY_QUERIES.GET_PRODUCT_BY_HANDLE, {
      handle,
    });
    
    return data.productByHandle;
  }

  // Cart methods
  async createCart(lines: Array<{ merchandiseId: string; quantity: number }> = []) {
    if (this.useMockData) {
      return {
        id: 'gid://shopify/Cart/mock-cart-id',
        checkoutUrl: 'https://demo-store.myshopify.com/cart',
        totalQuantity: 0,
        cost: {
          totalAmount: { amount: '0.00', currencyCode: 'USD' },
          subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
          totalTaxAmount: { amount: '0.00', currencyCode: 'USD' }
        },
        lines: { edges: [] }
      };
    }

    const data = await this.request(SHOPIFY_QUERIES.CREATE_CART, {
      input: { lines },
    });
    
    return data.cartCreate.cart;
  }

  async addToCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
    if (this.useMockData) {
      console.log('Mock: Adding to cart', { cartId, lines });
      return {
        id: cartId,
        checkoutUrl: 'https://demo-store.myshopify.com/cart',
        totalQuantity: 1,
        cost: {
          totalAmount: { amount: '29.99', currencyCode: 'USD' },
          subtotalAmount: { amount: '29.99', currencyCode: 'USD' },
          totalTaxAmount: { amount: '0.00', currencyCode: 'USD' }
        },
        lines: { edges: [] }
      };
    }

    const data = await this.request(SHOPIFY_QUERIES.ADD_TO_CART, {
      cartId,
      lines,
    });
    
    return data.cartLinesAdd.cart;
  }

  async updateCartLines(cartId: string, lines: Array<{ id: string; quantity: number }>) {
    const data = await this.request(SHOPIFY_QUERIES.UPDATE_CART_LINES, {
      cartId,
      lines,
    });
    
    return data.cartLinesUpdate.cart;
  }

  async removeFromCart(cartId: string, lineIds: string[]) {
    const data = await this.request(SHOPIFY_QUERIES.REMOVE_FROM_CART, {
      cartId,
      lineIds,
    });
    
    return data.cartLinesRemove.cart;
  }

  // Customer methods
  async createCustomer(input: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    const data = await this.request(SHOPIFY_QUERIES.CUSTOMER_CREATE, {
      input,
    });
    
    return data.customerCreate;
  }

  async createAccessToken(email: string, password: string) {
    const data = await this.request(SHOPIFY_QUERIES.CUSTOMER_ACCESS_TOKEN_CREATE, {
      input: { email, password },
    });
    
    return data.customerAccessTokenCreate;
  }

  async getCustomer(customerAccessToken: string) {
    const data = await this.request(SHOPIFY_QUERIES.GET_CUSTOMER, {
      customerAccessToken,
    });
    
    return data.customer;
  }
}

// Create singleton instance
export const shopifyAPI = new ShopifyAPI();