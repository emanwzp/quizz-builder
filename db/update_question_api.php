<?php

include_once('config.php');

if($_SERVER["REQUEST_METHOD"] === "GET"){
  if(array_key_exists('question_number', $_GET)){
    updateQuestionNumber($_GET["question_id"], $_GET["question_number"]);
  }
  else if(array_key_exists('question_id', $_GET)){
    if(array_key_exists('answer', $_GET)){
      updateQuestion($_GET["question_id"], $_GET["question"], $_GET["answer"]);
    }
  }
}

function updateQuestionNumber($question_id, $question_number){
  global $conn;
  if($question_id !== null && (int)$question_id > 0 && $question_number !== null && (int)$question_number > 0 ){
    $update_query = 'UPDATE questions SET question_number = '.$question_number .' WHERE question_id = ' . $question_id;
    if ($conn->query($update_query) === TRUE) {
      echo "done";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}

function updateQuestion($question_id, $question, $answer){
  global $conn;
  echo $question;
  echo $answer;
  if($question_id !== null && (int)$question_id > 0){
    $update_query = 'UPDATE questions SET question = "' .$question . '", answer = "' .$answer . '" WHERE question_id = ' . $question_id;
    echo $update_query;
    if ($conn->query($update_query) === TRUE) {
      echo "done";
    } else {
      //echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}


?>
