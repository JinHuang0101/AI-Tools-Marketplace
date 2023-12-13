// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects to modify
let addDevForm = document.getElementById('add-dev-form-ajax');

// Modify the objects 
addDevForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from
    let inputDevName = document.getElementById("input-dev_name");
    let inputDevLocation = document.getElementById("input-dev_location");
    let inputDevWebsite = document.getElementById("input-dev_website");

    // Get the values from the form fields
    let devNameValue = inputDevName.value;
    let devLocationValue = inputDevLocation.value;
    let devWebsiteValue = inputDevWebsite.value;

    /// Save the data to send in javascript object 
    let data = {
        dev_name : devNameValue,
        dev_location: devLocationValue,
        dev_website: devWebsiteValue,
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-dev-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for next 
            inputDevName.value='';
            inputDevLocation.value='';
            inputDevWebsite.value='';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object 
addRowToTable = (data) => {

    // Get a reference to the current table on the page 
    let currentTable = document.getElementById("developers-table");

    // Get the location to insert the new row at the end of table
    let newRowIndex = currentTable.rows.length;

    // Reference the new row from the database query, i.e. the last object
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let dev_id_cell = document.createElement("TD");
    let dev_name_cell = document.createElement("TD");
    let dev_location_cell = document.createElement("TD");
    let dev_website_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells 
    dev_id_cell.innerText = newRow.dev_id;
    dev_name_cell.innerText = newRow.dev_name;
    dev_location_cell.innerText = newRow.dev_location;
    dev_website_cell.innerText = newRow.dev_website;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteUser(newRow.dev_id);
    };

    location.reload();

    row.setAttribute('data-value', newRow.dev_id);

    // Add the row to the table
    currentTable.appendChild(row);
}