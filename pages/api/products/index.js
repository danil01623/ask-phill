import { products } from "../../../data/miista";

export default function handler(req, res) {
  const { limit, page } = req.query;

  if (checkQuery(req.query)) {
    const transformCategories =
      req.query?.categories?.length &&
      req.query?.categories !== "all_categories"
        ? req.query.categories.split(",")
        : [];
    const transformColors =
      req.query?.colors?.length && req.query?.colors !== "all_colors"
        ? req.query.colors.split(",")
        : [];
    const transformPrices =
      req.query?.prices?.length && req.query?.prices !== "all_prices"
        ? req.query.prices.split(",")
        : [];

    const filteredProducts = filterProducts(
      transformCategories,
      transformColors,
      transformPrices
    );
  }
  // res.status(200).json(products.slice(0, limit));
  res.status(200).json(products.slice((page - 1) * limit, page * limit));
}

const checkQuery = (query) => {
  if (
    (query.categories && query.categories !== "all_categories") ||
    (query.colors && query.colors !== "all_colors") ||
    (query.prices && query.prices !== "all_prices")
  ) {
    return true;
  }
  return false;
};

const filterProducts = (categories, colors, prices) => {
  let filteredCategories = [];
  let filterColors = [];
  let filterPrices = [];
  if (categories?.length) {
    filteredCategories = filterByCategory(categories);
  }
  if (colors?.length) {
    filterColors = filterByColors(colors);
  }
  if (prices?.length) {
    filterPrices = filterByColors(prices);
  }
};

const filterByCategory = (categories) => {
  const productsCategory = products.filter((product) => {
    return product?.node?.categoryTags?.filter((category) =>
      categories.includes(category)
    );
  });
  return productsCategory;
};

const filterByColors = (colors) => {
  const productsByColor = products.filter((product) => {
    return product?.node?.colorFamily?.filter((color) =>
      colors.includes(color.name)
    );
  });
  return productsByColor;
};

const filterByPrice = (prices) => {
  const incomingPrice = parseInt(prices[0]);
  const priceNum = products.filter(
    (product) =>
      parseInt(product.node.shopifyProductEu.variants.edges[0].node.price) <=
      incomingPrice
  );
  return priceNum;
};
