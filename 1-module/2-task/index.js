function print(text) {
  console.log(text);
}

function isValid(name) {
  return Boolean(name) && !name.includes(' ') && name.length > 3;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}