<?php
require_once 'DB.php'; 

$sql = "SELECT user_id FROM salesqueentable";
$result = mysqli_query($conn, $sql);

if (!$result) {
    die('Error fetching user IDs: ' . mysqli_error($conn));
}

$rows = array();
while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
}

mysqli_free_result($result);
mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($rows);
?>
