const X = "X",
  O = "O";
const genNumber = (arr = [X, X, X, O, X, X, X, X, O, O, O, X, X, X]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          arr[j] = "remove";
        } else break;
      }
    }
  }
  return arr.filter((elem) => elem != "remove");
};

console.log(genNumber());
