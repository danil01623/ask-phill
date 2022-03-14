import { products } from "../../../data/miista";

export default function handler(req, res) {
  const { limit, page } = req.query;

  let filteredProducts = [];
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

    filteredProducts = filterProducts(
      transformCategories,
      transformColors,
      transformPrices
    );
  }

  if (filteredProducts?.length) {
    res
      .status(200)
      .json(filteredProducts.slice((page - 1) * limit, page * limit));
  } else {
    res.status(200).json(products.slice((page - 1) * limit, page * limit));
  }
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
    return filteredCategories;
  }
  if (colors?.length) {
    filterColors = filterByColors(colors);
    return filterColors;
  }
  if (prices?.length) {
    filterPrices = filterByPrice(prices);
    return filterPrices;
  }
};

const filterByCategory = (categories) => {
  const filter = products.filter((product) => {
    return (
      product?.node?.categoryTags?.filter((category) => {
        return categories.includes(category);
      }).length > 0
    );
  });
  return filter;
};

const filterByColors = (colors) => {
  const filter = products.filter((product) => {
    return (
      product?.node?.colorFamily?.filter((color) => colors.includes(color.name))
        .length > 0
    );
  });
  return filter;
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
