//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addDownloadForm = document.getElementById('add-download-form-ajax');

// Modify the objects we need
addDownloadForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from
    let inputToolID = document.getElementById("input-tool_id");
    let inputUserID = document.getElementById("input-user_id");
    let inputOrderID = document.getElementById("input-order_id");
    let inputDownloadDate = document.getElementById("input-download_date");
    let inputDownloadSuccess = document.getElementById("input-download_success")

    // Get the values from the form fields
    let toolIDValue = inputToolID.value;
    let userIDValue = inputUserID.value;
    let orderIDValue = inputOrderID.value;
    let downloadDateValue = inputDownloadDate.value;
    let downloadSuccessValue = inputDownloadSuccess.value;


    // Save the data to send in javascript object 
    let data = {
        tool_id : toolIDValue,
        user_id: userIDValue,
        order_id: orderIDValue,
        download_date: downloadDateValue,
        download_success: downloadSuccessValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-download-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for next 
            inputToolID.value='';
            inputUserID.value='';
            inputOrderID.value='';
            inputDownloadDate.value='';
            inputDownloadSuccess.value='';
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
    let currentTable = document.getElementById("downloads-table");

    // Get the location to insert the new row at the end of table
    let newRowIndex = currentTable.rows.length;

    // Reference the new row from the database query, i.e. the last object
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let download_id_cell = document.createElement("TD");
    let tool_id_cell = document.createElement("TD");
    let tool_name_cell = document.createElement("TD");
    let user_id_cell = document.createElement("TD");
    let user_name_cell = document.createElement("TD");
    let order_id_cell = document.createElement("TD");
    let order_date_cell = document.createElement("TD");
    let download_date_cell = document.createElement("TD");
    let download_success_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with data 
    download_id_cell.innerText = newRow.download_id;
    tool_id_cell.innerText = newRow.tool_id;
    tool_name_cell.innerText = "Refresh for tool name";
    user_id_cell.innerText = newRow.user_id;
    user_name_cell.innerText = "Refresh for user name";
    order_id_cell.innerText = newRow.order_id;
    order_date_cell.innerText = "Refresh for order date";
    download_date_cell.innerText = newRow.download_date;
    download_success_cell.innerText = newRow.download_success;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDownload(newRow.download_id);
    };

    location.reload();

    row.setAttribute('data-value', newRow.download_id);

    // Add the row to the table
    currentTable.appendChild(row);

}