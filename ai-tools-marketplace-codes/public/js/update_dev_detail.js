// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects to modify
let updateDevDetailForm = document.getElementById('update-dev-detail-form-ajax');

// Modify the objects 
updateDevDetailForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from
    let inputDevDetailsID = document.getElementById("mySelect");
    let inputToolID = document.getElementById("input-tool_id-update")
    let inputDevID = document.getElementById("input-dev_id-update");

    // Get the values from the form fields
    let devDetailsIDValue = inputDevDetailsID.value;
    let toolIDValue = inputToolID.value;
    let devIDValue = inputDevID.value;
    
    // Abort if tool id is null
    if (isNaN(toolIDValue)) 
    {
        return;
    }

    // Put the new data in a javascript object
    let data = {
        dev_details_id: devDetailsIDValue,
        tool_id: toolIDValue,
        dev_id: devIDValue,
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-dev-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve errors
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, devDetailsIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload()
})

// display the new row
function updateRow(data, dev_details_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("dev-detail-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == dev_details_id) {

            // Get the location of the row with the matching tool id
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of tool id value 
            let td_tool = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign tool id to our value we updated to
            td_tool.innerHTML = parsedData[0].tool_id; 

            // Get td of developer id value
            let td_dev = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign developer id to our value we updated to
            td_dev.innerHTML = parsedData[0].dev_id; 
       }
    }
}
