import { Fragment } from "react";
import MainHeader from "./MainHeader";
import Filter from "../shared/Filter";
import { useRouter } from "next/router";

const Layout = (props) => {
  const router = useRouter();

  const findProductHandler = (
    categoriesOptions,
    colorsOptions,
    pricesOptions
  ) => {
    const categoriesPath = categoriesOptions.length
      ? categoriesOptions.join()
      : "all_categories";
    const colorsPath = colorsOptions.length
      ? colorsOptions.join()
      : "all_colors";
    const pricesPath = pricesOptions ? pricesOptions : "all_prices";

    const fullPath = `products/${categoriesPath}/${colorsPath}/${pricesPath}/?page=1&limit=20`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <MainHeader />
      <Filter onFilter={findProductHandler} />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
