<?php
$config = parse_ini_file('credentials.ini');
$conn = mysqli_connect($config['dbhost'], $config['username'], $config['password']);
if (!mysqli_select_db($conn,$config['db_name'])){
    $query = "CREATE DATABASE IF NOT EXISTS ".$config['db_name'];
    if ($conn->query($query) === TRUE) {
        //echo "Database created successfully";
    }else {
        //echo "Error creating database: " . $conn->error ;
    }
}
mysqli_select_db($conn, $config['db_name']);

// If tables do not exist create them
$query = 'SELECT 1 FROM quizzes';
$query_result = $conn->query($query);
if ($query_result !== FALSE){
  //echo "table exists";
} else {
 //echo "table does not exist";
 $sql = 'CREATE TABLE IF NOT EXISTS quizzes (
   quizz_id int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, title varchar(255) NOT NULL
 )';
 if($conn->query($sql) === FALSE) {
   //echo "error creating quizz table";
 }
}

$query2 = 'SELECT 1 FROM questions';
$query_result2 = $conn->query($query2);
if ($query_result2 !== FALSE){
  //echo "table exists";
}
else {
 $sql2 = 'CREATE TABLE IF NOT EXISTS questions (
   question_id int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, quizz_id int(6) NOT NULL,
    question varchar(255) NOT NULL, question_number int(6), answer varchar(255) NOT NULL
 )';

 if($conn->query($sql2) === FALSE) {
   //echo "error creating questions table";
 }
}
?>
