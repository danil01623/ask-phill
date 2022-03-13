import { useState } from "react";
import ProductList from "../components/products/ProductList";
import classes from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Pagination from "../components/shared/Pagination";

const Home = (props) => {
  const router = useRouter();
  const [products, setProducts] = useState(props.products);
  const [pageIndex] = useState(1);

  const setPaginationPath = (type) => {
    if (type === "next") {
      router.push(`/pagination/?page=${pageIndex + 1}&limit=20`);
    } else {
      router.push(`/pagination/?page=${pageIndex - 1}&limit=20`);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <Pagination
          textPrevious="Previous"
          textNext="Next"
          page="pageIndex"
          onClick={setPaginationPath}
        />
      </div>
      <div className={classes.productList}>
        <ProductList items={props.products} />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/products?page=1&limit=20");
  const data = await res.json();

  const products = data.map((dat) => dat.node);

  return {
    props: { products },
  };
};

export default Home;
