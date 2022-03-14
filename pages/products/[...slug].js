import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Pagination from "../../components/shared/Pagination";
import ProductList from "../../components/products/ProductList";
import classes from "../../styles/Home.module.css";

const ProductFilterPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    () =>
      slug?.length
        ? `/api/products/?page=1&limit=20&categories=${slug[0]}&colors=${slug[1]}&prices=${slug[2]}`
        : null,
    fetcher
  );

  useEffect(() => {
    if (data && data.length) {
      const transformData = data.map((dat) => {
        return dat.node;
      });
      setProducts(transformData);
    }
  }, [data]);

  const updatePage = (type) => {
    const path =
      type === "next"
        ? `products/?page=${parseInt(pageIndex) + 1}&limit=20`
        : `products/?page=${parseInt(pageIndex) - 1}&limit=20`;
    setPageIndex(
      type === "next" ? parseInt(pageIndex) + 1 : parseInt(pageIndex) - 1
    );
    router.push(path);
  };

  return (
    <div>
      <div className={classes.productList}>
        {products?.length && <ProductList items={products} />}
      </div>
    </div>
  );
};

export default ProductFilterPage;
