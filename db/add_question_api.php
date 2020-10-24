<?php

include_once('config.php');


if($_SERVER["REQUEST_METHOD"] === "GET"){

  $question_number = $_GET["question_number"];
  $quizz_id = $_GET["quizz_id"];
  //check if question_number and quizz_ id are positive integers
  if($question_number !== null && (int)$question_number > 0 &&
      $quizz_id !== null && (int)$quizz_id > 0 ){
    //needs to be validated (cleaned for sql injection)
    $question = mysqli_real_escape_string($conn,$_GET["question"]);
    $answer = mysqli_real_escape_string($conn,$_GET["answer"]);
    //trim white spaces on both ends of the string
    $question = trim($question);
    $answer = trim($answer);
    $insert_query = "INSERT INTO questions (quizz_id, question, question_number, answer) VALUES
    ('". $quizz_id . "', '" . $question . "', '" . $question_number . "', '" .$answer . "')";
    if ($conn->query($insert_query) === TRUE) {
      echo json_encode(1);
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }

  }
}

?>
