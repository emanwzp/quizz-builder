<?php

include_once('config.php');

if($_SERVER["REQUEST_METHOD"] === "GET"){
  if($_GET['id'] !== null && (int)$_GET['id'] > 0){
    $id = $_GET["id"];
    $delete_query = "DELETE FROM quizzes WHERE quizz_id = ".$id;
    if ($conn->query($delete_query) === TRUE) {
      echo json_encode(1);
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}

?>
