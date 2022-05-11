export const getShortInt = (longInt) => {
  // Return if not int
  if (isNaN(longInt)) {
    return longInt;
  }
  // Convert thousands to k, millions to m
  if (longInt >= 1000000) {
    return (longInt / 1000000).toFixed(1) + "M";
  }
  if (longInt >= 1000) {
    return (longInt / 1000).toFixed(1) + "K";
  }
  return longInt;
};

export const convertToCamelCase = (url) => {
  return url
    .split("-")
    .map((path, idx) =>
      idx === 0 ? path : path[0].toUpperCase() + path.slice(1)
    )
    .join("");
};

export const convertToHyphenCase = (url) => {
  // Split where uppercase leter occurs
  const split = url.split(/(?=[A-Z])| /);
  // Convert to hyphen case
  return split.map((path) => path.toLowerCase()).join("-");
};
