var directory = (window.location.href).replace(/^(.+?)\/*?$/, "$1"); // remove trailing slashes
var pathArray = directory.split('/');

// This is to fix Path without /user
if(pathArray[pathArray.length - 1] == "user") directory = directory + "/";
else directory = directory + "/user/";


function populate() {
    fetch(directory + 'user_record', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },})
       .then(response => response.json())
       .then(response => {
            element("loader_percent_text")[0].innerHTML ="Loading " + response + " records";
        })


    fetch(directory + 'user_load', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },})
   .then(response => response.json())
   .then(response => {
        data = response
        console.log(data.length);        
        var i = 0;
        
        Object.keys(data).forEach(function(key) {       

            //console.log(data[key]);
            var userid = data[key].user_id;
            var username = data[key].user_name;
            var fname = data[key].first_name;
            var lname = data[key].last_name;
            var email = data[key].email;
            var job = data[key].job;
            var country_code = data[key].country_code
            var country_name = data[key].country_name
            var address = data[key].address
            var status = data[key].enabled;
            var comments = data[key].comments;
            var flag = data[key].flag;
            var arrLength = data.length;
            var user_table = "";
        
            user_table +='<div class="resp-table-row">';
            user_table +='<div class="table-body-cell userid">' + userid + '</div>';
            user_table +='<div class="table-body-cell username">' + username + '</div>';
            user_table +='<div class="table-body-cell first_name" contenteditable="true" onblur="updatefield(' + userid + ',\'first_name\',' + i + ',\'' + fname + '\', \'' + lname + '\', \'' + fname + '\')">' + fname + '</div>';
            user_table +='<div class="table-body-cell last_name" contenteditable="true" onblur="updatefield(' + userid + ',\'last_name\',' + i + ',\'' + fname + '\', \'' + lname + '\', \'' + lname + '\')">' + lname + '</div>';
            user_table +='<div class="table-body-cell email">' + email + '</div>';
            user_table +='<div class="table-body-cell job" contenteditable="true" onblur="updatefield(' + userid + ',\'job\',' + i + ',\'' + fname + '\', \'' + lname + '\', \'' + job + '\', \'' + job + '\')">' + job + '</div>';
            user_table +='<div class="table-body-cell address" contenteditable="true" onblur="updatefield(' + userid + ',\'address\',' + i + ',\'' + fname + '\', \'' + lname + '\', \'' + address + '\', \'' + address + '\')">' + address + '</div>';
            user_table +='<div class="table-body-cell country_name">' + country_name + '</div>';
            user_table +='<div class="table-body-cell enabled">';
            user_table +='<select name="status" class="status" id="userid_' +  userid + '" onchange="status(' + userid + ');">';
        
            if(status == "Y") {
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="Y" selected="selected">Y</option>';
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="N">N</option>';
            } else {
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="Y">Y</option>';
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="N" selected="selected">N</option>';
            }
            
            user_table +='</select>';           
            user_table +='</div>';
            user_table +='<div class="table-body-cell comments">' + comments + '</div>';

            user_table +='<div class="table-body-cell comments-flag">';
            user_table +='<select name="flag" class="flag" id="flag_' +  userid + '" onchange="flag(' + userid + ');">';
            if(flag == "Y") {
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="Y" selected="selected">Y</option>';
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="N">N</option>';
            } else {
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="Y">Y</option>';
                user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="N" selected="selected">N</option>';
            }                        
            user_table +='</select>';

            user_table +='</div>';
            
            //user_table +='<div class="table-body-cell">' + flag + '</div>';
            user_table +='</div> ';

            elem("body").innerHTML += user_table;     
            i++;                                             
        })
        //document.getElementById("body").style.visibility = "visible";
        elem("login_button").style.display = "none";
        elem("password_text").style.display = "none";
        elem("logout_button").style.display = "inline-block";
        elem("loader")[0].style.display = "none";
        elem("loader_percent")[0].style.display = "none";
        
    })
 }

populate();

function updatefield(userid, fieldname, position, first_name, last_name, original_value) {    
    //console.log(userid + " " + fieldname + " " + position)
    var element = elem(fieldname)[position];
    var value = element.innerHTML;
    value = value.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML Tags
    element.innerHTML = value.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML Tags
    console.log(fieldname);

    if(original_value == value) return;

    var status_dialog = elem("modal-body")[0];
    
    fetch(directory + 'user_field_update', {
        method: 'POST',
        body:  JSON.stringify({
            "userid":userid,
            "fieldname":fieldname,
            "value":value
          }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(response => {
        let element = elem(fieldname)[position];
        element.setAttribute("onblur", 'updatefield(' + userid + ',\'' + fieldname + '\',' + position + ',\'' + first_name + '\', \'' + last_name + '\', \'' + value + '\')');
        status_dialog.style.display = "block";   
        status_dialog.innerHTML = "<h3>" + first_name + " " + last_name + "'s information has been updated</h3>";  
        // Get the modal
        var modal = elem("myModal");
        var span = elem("close")[0];        
        modal.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        data = response;
        console.log(data);
    })
}


function login() {       
    fetch(directory + 'user_login', {
        method: 'POST',
        body:  JSON.stringify({
            "password_entered":elem("password_text").value
          }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(response => {
        data = response;
        console.log(data);
        elem("login_button").style.display = "inline-block";
        elem("password_text").style.display = "inline-block";
        elem("logout_button").style.display = "none";
        populate();
    })
}

function logout() { 
    fetch(directory + 'user_logout', {
        method: 'POST',
        body:  {"password_entered":""},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(response => {
        data = response;
        console.log(data);
        elem("login_button").style.display = "inline-block";
        elem("password_text").style.display = "inline-block";
        elem("logout_button").style.display = "none";
        removeElementsByClass("resp-table-row");            
    })
}

function removeElementsByClass(className){
    const elements = element(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[1]);
    }
}

function status(statusid) {
    var status = elem("userid_" + statusid).value;
    var firstname = elem("userid_" + statusid);
        firstname = firstname.options[firstname.selectedIndex].getAttribute("firstname");
    var lastname = elem("userid_" + statusid);
        lastname = lastname.options[lastname.selectedIndex].getAttribute("lastname");
    var status_dialog = elem("modal-body")[0];
    console.log("userid_" + statusid + " " + status);
    
    fetch(directory + 'user_update', {
        method: 'POST',
        body:  JSON.stringify({
            "statusid":statusid,
            "status":status
          }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(response => {
        status_dialog.style.display = "block";   
        status_dialog.innerHTML = "<h3>" + firstname + " " + lastname + "'s Status has been updated</h3>";  
        // Get the modal
        var modal = elem("myModal");
        var span = elem("close")[0];        
        modal.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        data = response;
        console.log(data);
    })
}

function flag(flagid) {
    var flag = elem("flag_" + flagid).value;
    var firstname = elem("flag_" + flagid);
        firstname = firstname.options[firstname.selectedIndex].getAttribute("firstname");
    var lastname = elem("flag_" + flagid);
        lastname = lastname.options[lastname.selectedIndex].getAttribute("lastname");
    var flag_dialog = elem("modal-body")[0];
    console.log("flag_" + flagid + " " + flag);
    
    fetch(directory + 'flag_update', {
        method: 'POST',
        body:  JSON.stringify({
            "flagid":flagid,
            "flag":flag
          }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(response => {
        flag_dialog.style.display = "block";   
        flag_dialog.innerHTML = "<h3>" + firstname + " " + lastname + "'s Comment Flag has been updated</h3>";  
        // Get the modal
        var modal = elem("myModal");
        var span = elem("close")[0];        
        modal.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        data = response;
        console.log(data);
    })
}