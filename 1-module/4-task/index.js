function checkSpam(str) {
  const lowerCaseStr = str.toLowerCase();
  
  if (lowerCaseStr.includes('1xbet') || lowerCaseStr.includes('xxx')) {
      return true;
  } else {
      return false;
  }
}