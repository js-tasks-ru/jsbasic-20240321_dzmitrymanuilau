function makeDiagonalRed(table) {
  const rows = table.rows;
  
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    
    if (cells[i]) {
      cells[i].style.backgroundColor = 'red';
    }
  }
}