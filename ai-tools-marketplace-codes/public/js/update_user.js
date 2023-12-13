// Adapated from the starter code 
//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects to modify
let updateUserForm = document.getElementById('update-user-form-ajax');

// Modify the objects 
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields where the data is from
    let inputUserID = document.getElementById("mySelect");
    let inputUserWebsite = document.getElementById("input-user_website-update");

    // Get the values from the form fields
    let userIDValue = inputUserID.value;
    let userWebsiteValue = inputUserWebsite.value;


    // Abort if user id is null
    if (isNaN(userIDValue)) 
    {
        return;
    }

    // Put the new data in a javascript object
    let data = {
        user_id: userIDValue,
        user_website: userWebsiteValue,
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve erros 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, userIDValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
})


// display the new row
function updateRow(data, user_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("users-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == user_id) {

            // Get the location of the row with the matching tool id
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of user website value 
            let td_user_website = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign an id to the new updated value
            td_user_website.innerHTML = parsedData[0].user_website; 
       }
    }
}
