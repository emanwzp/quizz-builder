<?php

include_once('config.php');

if($_SERVER["REQUEST_METHOD"] === "GET"){
  if($_GET['id'] !== null && (int)$_GET['id'] > 0){
    $id = $_GET["id"];
    $title = mysqli_real_escape_string($conn,$_GET["title"]);
    //trim white spaces from both ends of the string
    $title = trim($title);
    $rename_query = "UPDATE quizzes SET title = '" .$title . "' WHERE quizz_id = " . $id;
    if ($conn->query($rename_query) === TRUE) {
      echo "done";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}

?>
