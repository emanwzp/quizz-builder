<?php

include_once('config.php');

if($_SERVER["REQUEST_METHOD"] === "GET"){
  if(array_key_exists('quizz_id', $_GET)){
    getQuestions($_GET["quizz_id"]);
  }
  else if(array_key_exists('question_id', $_GET)){
    getAnswer($_GET["question_id"]);
  }
}

function getQuestions($quizz_id){
  global $conn;
  //check if quizz_id is a valid positive integer
  if($quizz_id !== null && (int)$quizz_id > 0){
    $query = "SELECT question_id, question, question_number, answer FROM questions WHERE quizz_id = '".$quizz_id. "'ORDER BY question_number";
    $get_data_query = mysqli_query($conn, $query) or die(mysqli_error($conn));
    if(mysqli_num_rows($get_data_query)!=0){
      $result = array();
      while($row = mysqli_fetch_array($get_data_query)){
        extract($row);
        $result[] = array("question_id" => $question_id, "question" => $question
        , "question_number" => $question_number, "answer" => $answer);
      }
    }
    else{
      $json = array("status" => 0, "error" => "Quizzes not found");
    }
    // Set Content-type to JSON
    header('Content-type: application/json');
    echo json_encode($result);
    }
}

function getAnswer($question_id){
  global $conn;
  //check ifquestion_id is a valid positive integer
  if($question_id !== null && (int)$question_id > 0){
    $query = 'SELECT answer FROM questions WHERE question_id=' .$question_id;
    $get_data_query = mysqli_query($conn, $query) or die(mysqli_error($conn));
    if(mysqli_num_rows($get_data_query)!=0){
      $result = array();
      while($row = mysqli_fetch_array($get_data_query)){
        extract($row);
        $result[] = array("question_id" => $question_id, "answer" => $answer);
  	  }
    }
  	else{
  		$json = array("status" => 0, "error" => "Quizzes not found");
    }
    // Set Content-type to JSON
    header('Content-type: application/json');
    echo json_encode($result);

  }
}


?>
