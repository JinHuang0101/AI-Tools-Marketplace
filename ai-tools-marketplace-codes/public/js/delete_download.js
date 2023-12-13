// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDownload(download_id) {
    // Save data in a javascript object
    let data = {
        download_id: download_id
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-download-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve errors
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(download_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
}


function deleteRow(download_id){
    let table = document.getElementById("downloads-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == download_id) {
            table.deleteRow(i);
            break;
       }
    }
}