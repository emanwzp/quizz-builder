<?php

include_once('config.php');

if($_SERVER["REQUEST_METHOD"] === "GET"){
  if(array_key_exists('quizzes', $_GET)){
    $query = 'SELECT * FROM quizzes';
    $get_data_query = mysqli_query($conn, $query) or die(mysqli_error($conn));
    if(mysqli_num_rows($get_data_query)!=0){
      $result = array();
      while($row = mysqli_fetch_array($get_data_query)){
        extract($row);
        $result[] = array("quizz_id" => $quizz_id, "title" => $title);
  	  }
    }
  	else{
  		$json = array("status" => 0, "error" => "Quizzes not found");
    }
    // Set Content-type to JSON
    header('Content-type: application/json');
    echo json_encode($result);

  }else if(array_key_exists('quizz_id', $_GET)){
    //needs to be validated (cleaned for sql injection)
    $quizz_id = $_GET["quizz_id"];
    if($quizz_id !== null && (int)$quizz_id > 0){
      $query = "SELECT title FROM quizzes WHERE quizz_id=" .$quizz_id;
      $get_data_query = mysqli_query($conn, $query) or die(mysqli_error($conn));
      if(mysqli_num_rows($get_data_query)!=0){
        $result = array();
        while($row = mysqli_fetch_array($get_data_query)){
          extract($row);
          $result[] = array("title" => $title);
          echo json_encode($result);
    	  }
      }
    }
  }
}

?>
