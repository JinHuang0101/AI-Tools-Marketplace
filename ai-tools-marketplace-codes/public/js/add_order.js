// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from 
    let inputUserID = document.getElementById("input-user_id");
    let inputOrderDate = document.getElementById("input-order_date");
    let inputOrderAmount = document.getElementById("input-order_amount");
    let inputPaymentComplete = document.getElementById("input-payment_complete");

    // Get the values from the form fields
    let userIDValue = inputUserID.value;
    let orderDateValue = inputOrderDate.value;
    let orderAmountValue = inputOrderAmount.value;
    let paymentCompleteValue = inputPaymentComplete.value;

    // Save the data to send in javascript object 
    let data = {
        user_id : userIDValue,
        order_date: orderDateValue,
        order_amount: orderAmountValue,
        payment_complete: paymentCompleteValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for next 
            inputUserID.value='';
            inputOrderDate.value='';
            inputOrderAmount.value='';
            inputPaymentComplete.value='';
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
    let currentTable = document.getElementById("orders-table");

    // Get the location to insert the new row at the end of table
    let newRowIndex = currentTable.rows.length;

    // Reference the new row from the database query, i.e. the last object
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row wtih cells
    let row = document.createElement("TR");
    let order_id_cell = document.createElement("TD");
    let user_id_cell = document.createElement("TD");
    let order_date_cell = document.createElement("TD");
    let order_amount_cell = document.createElement("TD");
    let payment_complete_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells 
    order_id_cell.innerText = newRow.order_id;
    user_id_cell.innerText = newRow.user_id;
    order_date_cell.innerText = newRow.order_date;
    order_amount_cell.innerText = newRow.order_amount;
    payment_complete_cell.innerText = newRow.payment_complete;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrder(newRow.order_id);
    };

    location.reload();

    
    row.setAttribute('data-value', newRow.order_id);

    // Add the row to the table
    currentTable.appendChild(row);

}