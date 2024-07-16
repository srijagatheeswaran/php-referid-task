<?php
$hostName = "localhost:3306";
$uname = "root";
$pass  = "";
$dbName = "salesqueen";
$conn=mysqli_connect($hostName,$uname,$pass,$dbName);
if(!$conn){
    die("something went wrong :");
}
?>