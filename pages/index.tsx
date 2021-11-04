import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home">
        <ul className="card-list">
          <li>
            <Link href="/cart">
              <a className="card cart-style-background">
                <img src="/use-shopping-cart.png" />
                <h2 className="bottom">Use Shopping Cart</h2>
              </a>
            </Link>
          </li>
        </ul>
    </Layout>
  );
};

export default IndexPage;
