import Image from "next/image";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const {
    name,
    categoryTags,
    colorFamily,
    thumbnailImage: {
      file: { url },
    },
    shopifyProductEu: { variants },
  } = props.product;

  const showColors = () => {
    return colorFamily?.map((color) => color.name).join(", ");
  };

  const showCategories = () => {
    return categoryTags?.join(", ");
  };

  return (
    <li className={classes.item}>
      <img src={url} alt={name} />
      <div className={classes.content}>
        <div className={classes.name}>
          <h2>{name}</h2>
        </div>
        <div className={classes.info}>
          <p>
            Price:{" "}
            <span className={classes.bold}>{variants.edges[0].node.price}</span>
          </p>
        </div>
        <div className={classes.info}>
          <p>
            Color: <span className={classes.bold}>{showColors()}</span>
          </p>
        </div>
        <div className={classes.info}>
          <p>
            Categories: <span className={classes.bold}>{showCategories()}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
