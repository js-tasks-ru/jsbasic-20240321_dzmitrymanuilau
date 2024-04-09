function camelize(str) {
  return str
      .split('-') // Split the string by hyphens
      .map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)) // Capitalize each word after the first one
      .join(''); // Join the words back together
}