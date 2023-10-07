<?php

require "dbconnect.php";

$cntNo = htmlspecialchars($_POST["contact"]);

// $cntNo = '0712188098';

// Create a prepared statement
$invInfo = "SELECT * FROM `rsvp_list` WHERE `contact` = ?";
$stmt = mysqli_prepare($conn, $invInfo);

if ($stmt) {
    // Bind the parameter to the statement
    mysqli_stmt_bind_param($stmt, "s", $cntNo);

    // Execute the statement
    mysqli_stmt_execute($stmt);

    // Get the result
    $invInfoRes = mysqli_stmt_get_result($stmt);

    // Fetch the row
    $invInfoRow = mysqli_fetch_array($invInfoRes);

    // Close the statement
    mysqli_stmt_close($stmt);

    header('Content-Type: application/json');
    echo json_encode($invInfoRow);
}

?>
