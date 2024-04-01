function filterRange(arr, a, b) {
  let filteredArr = [];

  for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= a && arr[i] <= b) {
          filteredArr.push(arr[i]);
      }
  }

  return filteredArr;
}