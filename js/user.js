
function populate() {
   $.ajax({
      type: "POST",
      dataType: "json",
      url: "user_load", // in Welcome.php under controllers folder
      async: true,
      cache: false,
      data: {"password_entered":""},
      success: function(data) {
         console.log(data);
         var user_table = "";
         var arrLength = 0;
         
         $("#logout_button").css({"display":"inline-block"});
         $("#login_button").css({"display":"none"});
         $("#password_text").css({"display":"none"});

         $.each(data, function(key, val ) {     
            var userid = val.users_info_id;
            var fname = val.first_name;
            var lname = val.last_name;
            var status = val.status;
            var arrLength = data.length;
            
            user_table +='<div class="resp-table-row">';
            user_table +='<div class="table-body-cell">' + userid + '</div>';
            user_table +='<div class="table-body-cell">' + fname + '</div>';
            user_table +='<div class="table-body-cell">' + lname + '</div>';
            user_table +='<div class="table-body-cell">';
            user_table +='<select name="status" class="status" id="' + val.users_info_id + '">';

            if(status == "Y") {
               user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="Y" selected="selected">Y</option>';
               user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="N">N</option>';
            } else {
               user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="Y">Y</option>';
               user_table +='<option firstname="' + fname + '" lastname="' + lname + '" value="N" selected="selected">N</option>';
            }
            
            user_table +='</select>';
            user_table +='</div>';
            user_table +='</div> ';

            if(key == arrLength - 1) {
               $( "#body" ).append(user_table);
               console.log($(".resp-table-row").length);
            }
         });
         
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
         console.log("Status: " + textStatus);
         console.log("Error: " + errorThrown);
      }
   });
}

//To prevent error when switched to JQuery
function login() {}
function logout() {}
function status() {}

populate();

$("#login_button").on("click", function(e) {
   $.ajax({
      type: "POST",
      dataType: "json",
      url: "user_login", // in Welcome.php under controllers folder
      async: true,
      cache: false,
      data: {"password_entered":$("#password_text").val()},
      success: function(data) {
         console.log(data);
         populate();
         $("#password_text").val("");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
         console.log("Status: " + textStatus);
         console.log("Error: " + errorThrown);
      }
   });
   e.preventDefault();
});

$("#logout_button").on("click", function(e) {
   $.ajax({
      type: "POST",
      dataType: "json",
      url: "user_logout", 
      async: true,
      cache: false,
      data: {"password_entered":""},
      success: function(data) {
         console.log(data);
         $("#logout_button").css({"display":"none"});
         $("#login_button").css({"display":"inline-block"});
         $("#password_text").css({"display":"inline-block"});

         $(".resp-table-row").not(':first').empty().remove();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
         console.log("Status: " + textStatus);
         console.log("Error: " + errorThrown);
      }
   });
   e.preventDefault();
});

 $(document).on("change", ".status", function (e) {
    var userid = this.id;
    var status = this.value;
    var firstname = $('option:selected', this).attr('firstname');;
    var lastname = $('option:selected', this).attr('lastname');;
    
    console.log(userid);
    console.log(status);
    e.preventDefault();

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "user_update", // in Welcome.php under controllers folder
      async: true,
      cache: false,
      data: {"userid":userid, 'status' : status},

      success: function(data) {         
         var status_dialog = document.getElementsByClassName("modal-body")[0];
         status_dialog.style.display = "block";   
         status_dialog.innerHTML = "<h3>" + firstname + " " + lastname + "'s Status has been updated</h3>";  
         // Get the modal
         var modal = document.getElementById("myModal");
         var span = document.getElementsByClassName("close")[0];        
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
         
         if(data.update_status == "success") {
            $("#status_dialog h1").text(firstname + " " + lastname + "'s Status has been updated");                  
            console.log(data.update_status);
         } else {
            $("#status_dialog h1").text(firstname + " " + lastname + "'Status has not been updated");
         }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
         console.log("Status: " + textStatus);
         console.log("Error: " + errorThrown);
      }
   });
});