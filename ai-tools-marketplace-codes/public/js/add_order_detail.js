// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects to modify
let addOrderDetailForm = document.getElementById('add-order-detail-form-ajax');

// Modify the objects 
addOrderDetailForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from
    let inputOrderID = document.getElementById("input-order_id");
    let inputToolID = document.getElementById("input-tool_id");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let toolIDValue = inputToolID.value;

    // Save the data to send in javascript object 
    let data = {
        order_id: orderIDValue,
        tool_id: toolIDValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for next
            inputOrderID.value = '';
            inputToolID.value = '';
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
    let currentTable = document.getElementById("order-details-table");

    // Get the location to insert the new row at the end of table
    let newRowIndex = currentTable.rows.length;

    // Reference the new row from the database query, i.e. the last object
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let order_details_id_cell = document.createElement("TD");
    let order_id_cell = document.createElement("TD");
    let user_id_cell = document.createElement("TD");
    let user_name_cell = document.createElement("TD");
    let tool_id_cell = document.createElement("TD");
    let tool_name_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells 
    order_details_id_cell.innerText = newRow.order_details_id;
    order_id_cell.innerText = newRow.order_id;
    user_id_cell.innerText = "Refresh the page for user id";
    user_name_cell.innerText = "Refresh the page for user name";
    tool_id_cell.innerText = newRow.tool_id;
    tool_name_cell.innerText = "Refresh the page for tool name";

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDevDetails(newRow.order_details_id);
    };

    location.reload();

    row.setAttribute('data-value', newRow.order_details_id);

    // Add the row to the table
    currentTable.appendChild(row);

}