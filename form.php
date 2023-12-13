<?php
require "scripts/dbconnect.php";
// Fetch data from POST
$contact = htmlspecialchars($_POST['contact']);
$attending = htmlspecialchars($_POST['attending']);
$guestCount = htmlspecialchars($_POST['guestCount']);
$guestDetails = $_POST['guestDetails'];

if ($attending == "No") {
	$guestDetails = "";
	$guestCount = 0;

}
$submitQ = "UPDATE `rsvp_list` SET `s_confirmed` = ?, `guestDetails` = ?, `attending` = ? WHERE `contact` = ?";
$submitRes = mysqli_prepare($conn, $submitQ);

if ($submitRes) {
	// Bind the parameter to the statement
	mysqli_stmt_bind_param($submitRes, "isss", $guestCount, $guestDetails, $attending, $contact);

	// Execute the statement
	$state = mysqli_stmt_execute($submitRes);

	mysqli_stmt_close($submitRes);

	$data['state'] = $state;
	echo json_encode($data);
} else {
	$data['state'] = false;
	echo json_encode($data);
}

?>