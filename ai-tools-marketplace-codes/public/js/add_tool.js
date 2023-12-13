// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects to modify
let addToolForm = document.getElementById('add-tool-form-ajax');

// Modify the objects
addToolForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from 
    let inputToolName = document.getElementById("input-tool_name");
    let inputToolType = document.getElementById("input-tool_type");
    let inputPrice = document.getElementById("input-price");
    let inputReleaseDate = document.getElementById("input-release_date");
    let inputCategory = document.getElementById("input-category")

    // Get the values from the form fields
    let toolNameValue = inputToolName.value;
    let toolTypeValue = inputToolType.value;
    let priceValue = inputPrice.value;
    let releaseDateValue = inputReleaseDate.value;
    let categoryValue = inputCategory.value;


    // Save the data to send in javascript object 
    let data = {
        tool_name : toolNameValue,
        tool_type: toolTypeValue,
        price: priceValue,
        release_date: releaseDateValue,
        category: categoryValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-tool-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve errors 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputToolName.value='';
            inputToolType.value='';
            inputPrice.value='';
            inputReleaseDate.value='';
            inputCategory.value='';
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
    let currentTable = document.getElementById("tools-table");

    // Get the location to insert the new row at the end of table
    let newRowIndex = currentTable.rows.length;

    // Reference the new row from the database query, i.e. the last object
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    location.reload();

    // Fill the cells 
    tool_id_cell.innerText = newRow.tool_id;
    tool_name_cell.innerText = newRow.tool_name;
    tool_type_cell.innerText = newRow.tool_type;
    price_cell.innerText = newRow.price;
    release_date_cell.innerText = newRow.release_date;
    category_cell.innerText = newRow.category;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTool(newRow.tool_id);
    };

    // Add the cells to the row 
    row.appendChild(tool_id_cell);
    row.appendChild(tool_name_cell);
    row.appendChild(tool_type_cell);
    row.appendChild(price_cell);
    row.appendChild(release_date_cell);
    row.appendChild(category_cell);
    row.appendChild(deleteCell);

    // Add a row attribute so that delete function can find a newly added row 
    row.setAttribute('data-value', newRow.tool_id);

    // Add the row to the table
    currentTable.appendChild(row);

}