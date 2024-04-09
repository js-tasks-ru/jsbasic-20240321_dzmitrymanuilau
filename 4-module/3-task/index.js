function highlight(table) {
  // Selecting all the rows inside the table body
  let rows = table.querySelectorAll('tbody tr');

  // Loop through each row
  rows.forEach(row => {
      // Get the Age cell
      let ageCell = row.querySelector('td:nth-child(2)');
      let age = parseInt(ageCell.textContent);

      // Add line-through style if Age < 18
      if (age < 18) {
          row.style.textDecoration = 'line-through';
      } else {
          row.style.textDecoration = ''; // Reset style if age is 18 or above
      }

      // Get the Status cell and its data-available attribute value
      let statusCell = row.querySelector('td[data-available]');
      let available = statusCell ? statusCell.getAttribute('data-available') : null;

      // Promote the available/unavailable class based on data-available attribute
      if (available === 'true') {
          row.classList.add('available');
      } else if (available === 'false') {
          row.classList.add('unavailable');
      } else {
          row.setAttribute('hidden', 'true');
      }

      // Get the Gender cell
      let genderCell = row.querySelector('td:nth-child(3)');
      let gender = genderCell.textContent;

      // Set male/female class based on the content of Gender cell
      if (gender === 'm') {
          row.classList.add('male');
      } else if (gender === 'f') {
          row.classList.add('female');
      }
  });
}