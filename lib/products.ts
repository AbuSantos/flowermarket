export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  flower: {
    name: string;
    color: string;
  };
  chocolate: {
    type: string;
    flavor: string;
  };
  necklace: {
    material: string;
    style: string;
  };
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Romance Rose Bundle",
    price: 79.99,
    description:
      "Classic red roses paired with rich dark chocolate truffles and an elegant gold necklace",
    flower: {
      name: "Red Rose",
      color: "Deep Crimson",
    },
    chocolate: {
      type: "Dark Chocolate Truffles",
      flavor: "Ganache",
    },
    necklace: {
      material: "Gold Plated",
      style: "Heart Pendant",
    },
    image:
      "https://storage.googleapis.com/regalflowers-cdn/img-2017-10-Red-Roses-with-gypso-and-Guylian-Chocolate-with-Sandara-wine-Fresh-flower-store-in-Abuja-flower-delivery-in-lagos-flower-for-her.jpg",
  },
  {
    id: "2",
    name: "Sunlight Bloom Box",
    price: 184.99,
    description:
      "Vibrant sunflowers with milk chocolate pralines and a delicate silver chain",
    flower: {
      name: "Sunflower",
      color: "Golden Yellow",
    },
    chocolate: {
      type: "Milk Chocolate Pralines",
      flavor: "Caramel",
    },
    necklace: {
      material: "Sterling Silver",
      style: "Minimalist Bar",
    },
    image:
      "https://grannydoris.my/cdn/shop/products/Rise_Shine-SunflowerBouquet.jpg?v=1636461395&width=1445",
  },
  {
    id: "3",
    name: "Garden Dream Set",
    price: 289.99,
    description:
      "Mixed tulips with white chocolate raspberry and a pearl-adorned rose gold necklace, inclusive of delivery",
    flower: {
      name: "Assorted Tulips",
      color: "Pastel Mix",
    },
    chocolate: {
      type: "White Chocolate",
      flavor: "Raspberry",
    },
    necklace: {
      material: "Rose Gold Plated",
      style: "Pearl Accent",
    },
    image:
      "https://oopsydaisyflowers.com.au/cdn/shop/products/image_07694ad3-39da-42c3-9900-bc32b339c78d_2450x.jpg",
  },
  {
    id: "4",
    name: "Lavender Luxury",
    price: 274.99,
    description:
      "Soothing lavender with artisan chocolate bars and an amethyst stone necklace",
    flower: {
      name: "Lavender",
      color: "Purple",
    },
    chocolate: {
      type: "Artisan Chocolate Bar",
      flavor: "Dark with Lavender",
    },
    necklace: {
      material: "Sterling Silver",
      style: "Amethyst Stone",
    },
    image:
      "https://www.themaevastore.com/cdn/shop/files/IMG_4166-1-1-1.jpg?v=1738874763&width=1000",
  },
  {
    id: "5",
    name: "Cherry Blossom Collection",
    price: 369.99,
    description:
      "Delicate cherry blossoms with cherry-filled chocolate bonbons and a dainty gold necklace",
    flower: {
      name: "Cherry Blossoms",
      color: "Soft Pink",
    },
    chocolate: {
      type: "Filled Bonbons",
      flavor: "Cherry",
    },
    necklace: {
      material: "Gold Plated",
      style: "Dainty Chain",
    },
    image:
      "https://shop.sheridannurseries.com/cdn/shop/files/G4227-1024-1024-01_8eaede10-cd53-4c13-9fd6-613049008d5c_5000x.jpg",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
