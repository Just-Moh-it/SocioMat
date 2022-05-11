const convertToHyphenCase = (url) => {
  // Split where uppercase leter occurs
  const split = url.split(/(?=[A-Z])/);
  // Convert to hyphen case
  return split.map((path) => path.toLowerCase()).join("-");
};
