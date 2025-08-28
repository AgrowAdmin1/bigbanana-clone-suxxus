// Shopify Storefront API configuration and utilities
export const SHOPIFY_CONFIG = {
  domain: process.env.VITE_SHOPIFY_DOMAIN || 'demo-store.myshopify.com',
  storefrontToken: process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'demo-token',
  apiVersion: '2024-01',
  useMockData: true // Enable mock data for demo
};

// Mock products for demo
const MOCK_PRODUCTS = {
  edges: [
    {
      node: {
        id: 'gid://shopify/Product/1',
        title: 'Premium Wireless Headphones',
        handle: 'premium-wireless-headphones',
        description: 'High-quality wireless headphones with active noise cancellation and superior sound quality.',
        images: {
          edges: [{
            node: {
              url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
              altText: 'Premium Wireless Headphones'
            }
          }]
        },
        variants: {
          edges: [{
            node: {
              id: 'gid://shopify/ProductVariant/1',
              title: 'Black / One Size',
              price: { amount: '299.99', currencyCode: 'USD' },
              compareAtPrice: { amount: '399.99', currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [
                { name: 'Color', value: 'Black' },
                { name: 'Size', value: 'One Size' }
              ]
            }
          }]
        },
        options: [
          { name: 'Color', values: ['Black', 'White'] },
          { name: 'Size', values: ['One Size'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '299.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '299.99', currencyCode: 'USD' }
        },
        tags: ['new', 'wireless', 'premium'],
        productType: 'Electronics',
        vendor: 'AudioTech',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    },
    {
      node: {
        id: 'gid://shopify/Product/2',
        title: 'Eco-Friendly Water Bottle',
        handle: 'eco-friendly-water-bottle',
        description: 'Sustainable stainless steel water bottle with double-wall insulation.',
        images: {
          edges: [{
            node: {
              url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop',
              altText: 'Eco-Friendly Water Bottle'
            }
          }]
        },
        variants: {
          edges: [{
            node: {
              id: 'gid://shopify/ProductVariant/2',
              title: 'Blue / 500ml',
              price: { amount: '29.99', currencyCode: 'USD' },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                { name: 'Color', value: 'Blue' },
                { name: 'Size', value: '500ml' }
              ]
            }
          }]
        },
        options: [
          { name: 'Color', values: ['Blue', 'Green', 'Black'] },
          { name: 'Size', values: ['500ml', '750ml'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '29.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '29.99', currencyCode: 'USD' }
        },
        tags: ['eco-friendly', 'sustainable'],
        productType: 'Accessories',
        vendor: 'EcoLife',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
      }
    },
    {
      node: {
        id: 'gid://shopify/Product/3',
        title: 'Organic Cotton T-Shirt',
        handle: 'organic-cotton-t-shirt',
        description: 'Soft and comfortable organic cotton t-shirt made from sustainable materials.',
        images: {
          edges: [{
            node: {
              url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
              altText: 'Organic Cotton T-Shirt'
            }
          }]
        },
        variants: {
          edges: [{
            node: {
              id: 'gid://shopify/ProductVariant/3',
              title: 'White / M',
              price: { amount: '24.99', currencyCode: 'USD' },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                { name: 'Color', value: 'White' },
                { name: 'Size', value: 'M' }
              ]
            }
          }]
        },
        options: [
          { name: 'Color', values: ['White', 'Black', 'Navy'] },
          { name: 'Size', values: ['S', 'M', 'L', 'XL'] }
        ],
        priceRange: {
          minVariantPrice: { amount: '24.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '24.99', currencyCode: 'USD' }
        },
        tags: ['organic', 'cotton'],
        productType: 'Clothing',
        vendor: 'GreenWear',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z'
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