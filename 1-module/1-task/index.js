function factorial(n) {
  if (n === 0) {
    return 1;
  } else if (typeof n === "number") {
    let result = n;

    for (let i = --n; i > 0; i--) {
      result *= i;
    }

    return result;
  } else {
    return "Не число";
  }
}
