export const getShortInt = (longInt) => {
  // Convert thousands to k, millions to m
  if (longInt >= 1000000) {
    return (longInt / 1000000).toFixed(1) + "M";
  }
  if (longInt >= 1000) {
    return (longInt / 1000).toFixed(1) + "K";
  }
  return longInt;
};
