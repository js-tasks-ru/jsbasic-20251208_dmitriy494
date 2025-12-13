function checkSpam(str) {
  if (str) {
    str = str.toLowerCase();
    if (str.includes("1xbet")) {
      return true;
    } else if (str.includes("xxx")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
