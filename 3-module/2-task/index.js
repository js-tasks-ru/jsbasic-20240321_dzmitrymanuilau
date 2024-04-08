function filterRange(arr, a, b) {
  return arr.filter(element => element >= a && element <= b)
            .map(element => element === a || element === b ? element : element);
}