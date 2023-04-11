<?php
   defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">  
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>User Enable/Disable Account</title> 
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script> 
      <!--
      <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
      <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>      
      -->
      <title>Welcome to CodeIgniter</title>      
      <link rel = "stylesheet" type = "text/css" href = "../css/style.css">
      <link rel = "stylesheet" type = "text/css" href = "../css/modal.css">
      
   </head>
   <body>
      <div id="wrapper">
         <div class="loader"></div>
         <div class="loader_percent">
            <div class="loader_percent_text"></div>
         </div>
         <div id="main">
            <div id="container">  
               <div id="body">  
                  <div id="user_header" class="resp-table-row">  
                     <div class="table-body-cell user-header">User ID</div> 
                     <div class="table-body-cell user-header">User Name</div> 
                     <div class="table-body-cell user-header">First Name</div>  
                     <div class="table-body-cell user-header">Last Name</div>  
                     <div class="table-body-cell user-header">E-Mail</div> 
                     <div class="table-body-cell user-header">Job</div> 
                     <div class="table-body-cell user-header">Address</div> 
                     <div class="table-body-cell user-header">Country</div> 
                     <div class="table-body-cell user-header">Activated</div> 
                     <div class="table-body-cell user-header">Comments</div> 
                     <div class="table-body-cell user-header">Comments Flag</div> 
                  </div>  
                  <!-- data will be appended here using javascript (user.js) -->
               </div>             
            </div>  
            <div id="status_dialog" title="Status">
               <h1>Success!</h1>
            </div>

            <div id="myModal" class="modal">
               <!-- Modal content -->
               <div class="modal-content">
               <div class="modal-header">
                  <span class="close">&times;</span>
                  <h2>Success!</h2>
               </div>
               <div class="modal-body">
                  
               </div>
               <div class="modal-footer">
                  <h3>Modal Footer</h3>
               </div>
               </div>
            </div>


            <div id="admin_login" title="Status">
               <input type="password" id="password_text" />
               <button id="login_button" onClick="login();">Login</button>
         
               <button id="logout_button" onClick="logout();">Logout</button>
            </div>
         </div>
      </div>
      <!--<script type = 'text/javascript' src = "../js/user.js"></script>-->
      <script type = 'text/javascript' src = "../js/script.js"></script>     
   </body>  
</html>  