<?php
require "scripts/dbconnect.php";

// Set headers for JSON response
header('Content-Type: application/json');

// Initialize response array
$response = array(
	'success' => false,
	'message' => '',
	'data' => null
);

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	$response['message'] = 'Invalid request method';
	echo json_encode($response);
	exit;
}

// Validate required fields
$required_fields = ['contact', 'church', 'wedding'];
foreach ($required_fields as $field) {
	if (!isset($_POST[$field]) || empty($_POST[$field])) {
		$response['message'] = "Missing required field: $field";
		echo json_encode($response);
		exit;
	}
}

// Sanitize and validate input
$contact = htmlspecialchars(trim($_POST['contact']), ENT_QUOTES, 'UTF-8');
$church = htmlspecialchars(trim($_POST['church']), ENT_QUOTES, 'UTF-8');
$wedding = htmlspecialchars(trim($_POST['wedding']), ENT_QUOTES, 'UTF-8');

// Validate attending status for both church and wedding
if (!in_array($church, ['Yes', 'No']) || !in_array($wedding, ['Yes', 'No'])) {
	$response['message'] = 'Invalid attending status';
	echo json_encode($response);
	exit;
}

try {
	// Prepare the update statement
	$submitQ = "UPDATE `rsvp_list` SET `church` = ?, `wedding` = ? WHERE `contact` = ?";
	$submitRes = mysqli_prepare($conn, $submitQ);

	if (!$submitRes) {
		throw new Exception('Failed to prepare statement: ' . mysqli_error($conn));
	}

	// Bind parameters
	mysqli_stmt_bind_param($submitRes, "sss", $church, $wedding, $contact);

	// Execute the statement
	if (!mysqli_stmt_execute($submitRes)) {
		throw new Exception('Failed to execute statement: ' . mysqli_stmt_error($submitRes));
	}

	// Check if any rows were affected
	if (mysqli_stmt_affected_rows($submitRes) === 0) {
		$response['message'] = 'No records were updated';
	} else {
		$response['success'] = true;
		$response['message'] = 'RSVP updated successfully';
	}

	mysqli_stmt_close($submitRes);

} catch (Exception $e) {
	$response['message'] = 'Database error: ' . $e->getMessage();
}

// Send response
echo json_encode($response);
?>