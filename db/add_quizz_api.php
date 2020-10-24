<?php

include_once('config.php');



if($_SERVER["REQUEST_METHOD"] === "GET"){
  if(array_key_exists('title', $_GET)){
    //needs to be validated (cleaned for sql injection)
    $title = mysqli_real_escape_string($conn,$_GET["title"]);
    //trim white spaces from both ends of the string
    $title = trim($title);
    $insert_query = "INSERT INTO quizzes (title) VALUES ('".$title."')";
    if ($conn->query($insert_query) === TRUE) {
      $last_id = $conn->insert_id;
      $result = array("quizz_id" => $last_id);
      echo json_encode($result);
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}

?>
