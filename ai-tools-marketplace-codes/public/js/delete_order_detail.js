// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteOrderDetail(order_details_id) {
    // Save data in a json object
    let data = {
        order_details_id: order_details_id
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve errors
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(order_details_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
}


function deleteRow(order_details_id){
    let table = document.getElementById("order-details-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == order_details_id) {
            table.deleteRow(i);
            break;
       }
    }
}