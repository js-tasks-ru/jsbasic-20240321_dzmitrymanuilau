let calculator = {
  value1: 0,
  value2: 0,
  
  read: function(a, b) {
    this.value1 = a;
    this.value2 = b;
  },
  
  sum: function() {
    return this.value1 + this.value2;
  },
  
  mul: function() {
    return this.value1 * this.value2;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально