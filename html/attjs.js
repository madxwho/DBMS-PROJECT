document.addEventListener('DOMContentLoaded', function () {
    // Select all time input fields
    var timeInputs = document.querySelectorAll('input[type="time"]');

    // Initialize Flatpickr for each time input field
    timeInputs.forEach(function (input) {
        flatpickr(input, {
            enableTime: true, // Enable time picker
            noCalendar: true, // Disable calendar
            time_24hr: false, // Use 12-hour time format
            dateFormat: "h:i K", // Format for time (12-hour with AM/PM)
            enableSeconds: false, // Disable seconds
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Select all date input fields
    var dateInputs = document.querySelectorAll('.date-input');

    // Initialize Flatpickr for each date input field
    dateInputs.forEach(function (input) {
        flatpickr(input, {
            dateFormat: "Y-m-d", // Format for date
        });
    });
});
function addRow() {
    var tbody = document.querySelector('.attendance-table tbody');
    var selectedRow = getSelectedRow();
    var newRow = createRow(tbody.rows.length + 1);

    if (selectedRow) {
        tbody.insertBefore(newRow, selectedRow.nextSibling);
    } else {
        tbody.appendChild(newRow);
    }

    updateSlNo();
    resetCheckboxes();
}

function createRow(slNo) {
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${slNo}</td>
        <td><input type="date" class="date-input" /></td>
        <td><input type="text" class="time-input" /></td>
        <td><input type="text" /></td>
        <td><input type="checkbox" class="row-checkbox"></td>
    `;
    
    // Select the newly created date input field
    var dateInput = row.querySelector('.date-input');

    // Initialize Flatpickr for the date input field
    flatpickr(dateInput, {
        dateFormat: "Y-m-d", // Format for date
    });

    // Select the newly created time input field
    var timeInput = row.querySelector('.time-input');

    // Initialize Flatpickr for the time input field
    flatpickr(timeInput, {
        enableTime: true, // Enable time picker
        noCalendar: true, // Disable calendar
        time_24hr: false, // Use 12-hour time format
        dateFormat: "h:i K", // Format for time (12-hour with AM/PM)
        enableSeconds: false, // Disable seconds
    });

    return row;
}
        function getSelectedRow() {
            var checkboxes = document.querySelectorAll('.row-checkbox');
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    return checkboxes[i].closest('tr');
                }
            }
            return null;
        }

        function deleteSelectedRows() {
    var checkboxes = document.querySelectorAll('.row-checkbox:checked');
    checkboxes.forEach(function(checkbox) {
        checkbox.closest('tr').remove();
    });
    updateSlNo();
    resetCheckboxes();
}


        function updateSlNo() {
            var rows = document.querySelectorAll('.attendance-table tbody tr');
            for (var i = 0; i < rows.length; i++) {
                rows[i].querySelector('td:first-child').textContent = i + 1;
            }
        }

        function resetCheckboxes() {
    var checkboxes = document.querySelectorAll('.row-checkbox:checked');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

document.getElementById('searchInput').addEventListener('input', function() {
    var searchText = this.value.toLowerCase();
    var rows = document.querySelectorAll('.attendance-table tbody tr');

    rows.forEach(function(row) {
        var rowData = row.textContent.toLowerCase();
        if (rowData.includes(searchText)) {
            row.style.display = ''; // Show row if it matches search
        } else {
            row.style.display = 'none'; // Hide row if it doesn't match search
        }
    });
});