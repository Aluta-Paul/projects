// Select the search input element, table rows, and table headings
const search = document.querySelector(".input_group input"),
  table_rows = document.querySelectorAll("tbody tr"),
  table_headings = document.querySelectorAll("thead th");

// Add an event listener to the search input to trigger the searchTable function on input
search.addEventListener("input", searchTable);

// Function to filter and highlight table rows based on the search input
function searchTable() {
  // Iterate through each table row
  table_rows.forEach((row, i) => {
    // Get the text content of the row and the search input, both converted to lowercase
    let table_data = row.textContent.toLowerCase();
    search_data = search.value.toLowerCase();

    // Toggle the 'hide' class on the row based on whether the row text includes the search text
    row.classList.toggle("hide", table_data.indexOf(search_data) < 0);

    // Set a CSS property to stagger the animation delay for each row
    row.style.setProperty('--delay', i / 25 + 's');
  });

  // Iterate through each visible row to alternate background color for better readability
  document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
    visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
  });
}

// Iterate through each table heading to add sorting functionality
table_headings.forEach((head, i) => {
  // Variable to keep track of sorting order
  let sort_asc = true;

  // Add a click event listener to each heading
  head.onclick = () => {
    // Remove 'active' class from all headings and add it to the clicked heading
    table_headings.forEach(head => head.classList.remove('active'));
    head.classList.add("active");

    // Remove 'active' class from all table cells and add it to the cells in the clicked column
    document.querySelectorAll("td").forEach(td => td.classList.remove("active"));
    table_rows.forEach(row => {
      row.querySelectorAll('td')[i].classList.add('active');
    });

    // Toggle the 'asc' class on the heading to indicate sort order and update sort_asc
    head.classList.toggle('asc', sort_asc);
    sort_asc = head.classList.contains('asc') ? false : true;

    // Call sortTable function to sort rows based on the clicked column and sort order
    sortTable(i, sort_asc);
  };
});

// Function to sort table rows based on the specified column and sort order
function sortTable(column, sort_asc) {
  // Spread the table rows into an array and sort them
  [...table_rows].sort((a, b) => {
    // Get the text content of the cells in the specified column, converted to lowercase
    let first_row = a.querySelectorAll("td")[column].textContent.toLowerCase();
    let second_row = b.querySelectorAll("td")[column].textContent.toLowerCase();

    // Compare the text content based on the sort order
    return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
  })
  // Re-append the sorted rows to the tbody to update the table display
  .map(sorted_row => document.querySelector("tbody").appendChild(sorted_row));
}


/* element.classList.toggle('class-name'): If the element has the class, it will be removed; if it doesn't, the class will be added.

element.classList.toggle('class-name', condition): If the condition is true, the class will be added; if false, the class will be removed.
 */