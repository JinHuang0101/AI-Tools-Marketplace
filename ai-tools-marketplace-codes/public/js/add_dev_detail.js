// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addDevDetailForm = document.getElementById('add-dev-detail-form-ajax');

// Modify the objects 
addDevDetailForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from
    let inputToolID = document.getElementById("input-tool_id-ajax");
    let inputDevID = document.getElementById("input-dev_id-ajax");

    // Get the values from the form fields
    let toolIDValue = inputToolID.value;
    let devIDValue = inputDevID.value;

    // Save the data to send in javascript object 
    let data = {
        tool_id: toolIDValue,
        dev_id: devIDValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-dev-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for next 
            inputToolID.value = '';
            inputDevID.value = '';
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
    let currentTable = document.getElementById("dev-detail-table");

    // Get the location to insert the new row at the end of table
    let newRowIndex = currentTable.rows.length;

    // Reference the new row from the database query, i.e. the last object
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let dev_details_id_cell = document.createElement("TD");
    let tool_id_cell = document.createElement("TD");
    let tool_name_cell = document.createElement("TD");
    let dev_id_cell = document.createElement("TD");
    let dev_name_cell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells 
    dev_details_id_cell.innerText = newRow.dev_details_id;
    tool_id_cell.innerText = newRow.tool_id;
    tool_name_cell.innerText = "Refresh the page for tool name";
    dev_id_cell.innerText = newRow.dev_id;
    dev_name_cell.innerText = "Refresh the page for dev name";

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDevDetails(newRow.dev_details_id);
    };

    location.reload();

    row.setAttribute('data-value', newRow.dev_details_id);

    // Add the row to the table
    currentTable.appendChild(row);

    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.tool_id + ' ' +  newRow.dev_id;
    option.value = newRow.dev_details_id;
    selectMenu.add(option);
}