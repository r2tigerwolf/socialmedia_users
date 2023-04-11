<?php
    foreach ($p->result() as $row) 
        $password = $row->password;

    if (isset($password)) {
        $password = "TRUE";
        $_SESSION["login"] = true;
    } else {
        $password = "FALSE";
        $_SESSION["login"] = false;
    }
?>