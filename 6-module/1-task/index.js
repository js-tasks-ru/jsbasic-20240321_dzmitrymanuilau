export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this._createTable();
  }

  _createTable() {
    const table = document.createElement('table');
    const headers = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];

    // Создаем заголовки таблицы
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr>${headers.map(headerText => `<th>${headerText}</th>`).join('')}</tr>`;
    table.appendChild(thead);

    // Создаем строки с данными и кнопками удаления
    const tbody = document.createElement('tbody');
    this.rows.forEach(rowData => {
      const tr = document.createElement('tr');
      tr.innerHTML = Object.values(rowData).map(value => `<td>${value}</td>`).join('');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
        const index = Array.from(tbody.children).indexOf(tr);
        this.rows.splice(index, 1);
        tr.remove();
      });
      tr.lastElementChild.appendChild(deleteButton);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Обработчик события для удаления строк
    table.addEventListener('click', event => {
      if (event.target.tagName === 'BUTTON') {
        const tr = event.target.closest('tr');
        const index = Array.from(tbody.children).indexOf(tr);
        this.rows.splice(index, 1);
        tr.remove();
      }
    });

    return table;
  }
}