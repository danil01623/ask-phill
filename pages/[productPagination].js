import { useState, useEffect } from "react";
import ProductList from "../components/products/ProductList";
import Pagination from "../components/shared/Pagination";
import useSWR from "swr";
import { useRouter } from "next/router";
import classes from "../styles/Home.module.css";

const ProductsPagination = () => {
  const router = useRouter();
  const { page, limit } = router.query;
  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(page);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    () => (page ? `/api/products?page=${pageIndex}&limit=${limit}` : null),
    fetcher
  );

  useEffect(() => {
    setPageIndex(page);
  }, [page]);

  useEffect(() => {
    if (data && data.length) {
      const transformData = data.map((dat) => {
        return dat.node;
      });
    }
    setProducts(transformData);
  }, [data]);

  const updatePage = (type) => {
    const path =
      type === "next"
        ? `pagination/?page=${parseInt(pageIndex) + 1}&limit=20`
        : `pagination/?page=${parseInt(pageIndex) - 1}&limit=20`;
    setPageIndex(
      type === "next" ? parseInt(pageIndex) + 1 : parseInt(pageIndex) - 1
    );
    router.push(path);
  };

  return (
    <div>
      <div className={classes.pagination}>
        <Pagination
          textPrevious="Previous"
          textNext="Next"
          page="pageIndex"
          onClick={updatePage}
        />
      </div>
      <div className={classes.productList}>
        {products?.length && <ProductList items={products} />}
      </div>
    </div>
  );
};

export default ProductsPagination;
