<?php

include_once('config.php');

if($_SERVER["REQUEST_METHOD"] === "GET"){
  if(array_key_exists('quizz_id', $_GET)){
    deleteQuestions($_GET["quizz_id"]);
  }elseif (array_key_exists('question_id', $_GET)) {
    deleteQuestion($_GET["question_id"]);
  }
}


function deleteQuestion($question_id){
  global $conn;
  if($question_id !== null && (int)$question_id > 0){

    $delete_query = "DELETE FROM questions WHERE question_id = ".$question_id;
    if ($conn->query($delete_query) === TRUE) {
      echo json_encode(1);
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}

function deleteQuestions($quizz_id){
  global $conn;
  if($quizz_id !== null && (int)$quizz_id > 0){
    $delete_query = "DELETE FROM questions WHERE quizz_id = ".$quizz_id;
    if ($conn->query($delete_query) === TRUE) {
      echo json_encode(1);
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}
?>
