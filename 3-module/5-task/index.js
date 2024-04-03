function getMinMax(str) {
  const numericValues = str
    .split(' ')
    .map(wordOrNumber => parseFloat(wordOrNumber))
    .filter(value => !isNaN(value));

  if (numericValues.length === 0) {
    return null;
  }

  const min = Math.min(...numericValues);
  const max = Math.max(...numericValues);

  return { min, max };
}