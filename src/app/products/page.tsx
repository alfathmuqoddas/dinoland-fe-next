import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Retro Gaming Console",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Drone Camera",
    price: 699.99,
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "VR Headset",
    price: 399.99,
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80",
  },
];

const Products = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="brutalist-card group">
            <div className="relative overflow-hidden mb-4 border-4 border-black">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transform transition-transform group-hover:scale-110"
              />
              <div className="absolute top-0 right-0 bg-yellow-400 px-4 py-2 border-l-4 border-b-4 border-black font-bold">
                ${product.price}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <button className="brutalist-button w-full flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>ADD TO CART</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
