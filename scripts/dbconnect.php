<?php

$servername = "localhost:3306";
$username = "yasasc";
$password = "yasasWeds@96";
 $dbname = "yasaswedima";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>