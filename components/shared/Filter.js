import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../ui/Button";
import classes from "./Filter.module.css";

const Categories = [
  "New Arrivals",
  "Sandals",
  "Mid-Heels",
  "Mules",
  "Flats",
  "Tall Boots",
  "Boots",
  "Court Shoes",
  "Ankle Boots",
];

const Colors = [
  "White",
  "Green",
  "Brown",
  "Orange",
  "Black",
  "Yellow",
  "Natural",
  "Red",
  "Blue",
];

const Filter = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrice] = useState(250);
  const [selectedColors, setSelectedColors] = useState([]);
  const minValue = 50;

  useEffect(() => {
    if (slug?.length) {
      setSelectedCategories(slug[0].split(","));
      setSelectedColors(slug[1].split(","));
    }
  }, [slug]);

  const showCategories = () => {
    return (
      <ul>
        {Categories.map((category, index) => (
          <li key={category + index}>
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => categoriesHandler(e, category)}
            />
            <label htmlFor={category}>{category}</label>
          </li>
        ))}
      </ul>
    );
  };

  const showColors = () => {
    return (
      <ul>
        {Colors.map((color, index) => (
          <li key={color + index}>
            <input
              type="checkbox"
              id={color}
              checked={selectedColors.includes(color)}
              onChange={(e) => colorsHandler(e, color)}
            />
            <label htmlFor={color}>{color}</label>
          </li>
        ))}
      </ul>
    );
  };

  const showPriceRange = () => {
    return (
      <div className={classes.priceRange}>
        <span>Price range:</span>
        <label htmlFor="price" className={classes.marginLeft}>
          50
        </label>

        <input
          type="range"
          id="price"
          min="50"
          max="500"
          value={selectedPrices}
          onChange={(e) => setSelectedPrice(parseInt(e.target.value))}
        />
        <label htmlFor="price">500</label>
        <span className={classes.marginLeft}>
          Selected value: {minValue} - {selectedPrices}
        </span>
      </div>
    );
  };

  const categoriesHandler = (e, category) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    }
  };

  const colorsHandler = (e, color) => {
    if (e.target.checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(
        selectedColors.filter((itemColor) => itemColor !== color)
      );
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onFilter(selectedCategories, selectedColors, selectedPrices);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.filterContainer}>
        <div className={classes.list}>{showCategories()}</div>
        <div className={classes.list}>{showColors()}</div>
        {showPriceRange()}
      </div>
      <div className={classes.btn}>
        <Button>Apply Filters</Button>
      </div>
    </form>
  );
};

export default Filter;
