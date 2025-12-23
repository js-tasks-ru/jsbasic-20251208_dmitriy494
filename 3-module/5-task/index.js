function getMinMax(str) {
  let filterArr = str.split(" ").filter((el) => {
    return Number(el);
  });

  return {
    min: Math.min(...filterArr),
    max: Math.max(...filterArr),
  };
}
