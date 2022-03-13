import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

const ProductList = (props) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <ProductItem key={item.name} product={item} />
      ))}
    </ul>
  );
};

export default ProductList;
