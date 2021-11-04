import products from "../data/products.json";
import Image from "next/image";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

const Products = () => {
  const { addItem, removeItem } = useShoppingCart();
  return (
    <section className="products">
      {products.map((product) => (
        <div key={product.sku} className="product">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
          />
          <h3>{product.name}</h3>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
          <button
            className="cart-style-background"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.sku)}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default Products;
