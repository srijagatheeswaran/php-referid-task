<?php
require_once 'DB.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $refer_id = $_POST['refer_id'];
    $amount = $_POST['amount'];


    // Generate user ID
    $sql = "SELECT COUNT(*) as count FROM salesqueentable";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $count = $row['count'] + 1;
    $user_id = '#' . str_pad($count, 3, '0', STR_PAD_LEFT);

    // Calculate wallet
    $wallet = $amount;
    if ($refer_id) {
        $sql = "SELECT wallet FROM salesqueentable WHERE user_id = '$refer_id'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        if ($row) {
            $wallet += $row['wallet'] * 0.1;
        }
        
        
    }
    else{
        $refer_id = "-";
    }
    
    $sql = "INSERT INTO salesqueentable (user_id, name, refer_id, amount, wallet) VALUES ('$user_id', '$name', '$refer_id', '$amount', '$wallet')";
    if (mysqli_query($conn, $sql)) {
        
        echo json_encode(array("status" => "success", "message" => "Upload success"));
       
    } else {
        echo "Error inserting data: " . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>