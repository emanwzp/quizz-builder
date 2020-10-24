
var url_string = new URL(url);
var quizz_id = url_string.searchParams.get("quizz_id");

var answer_msgs = []


fetch(get_quizzes_api_url + "?quizz_id=" + quizz_id)
  .then(response => response.json())
  .then(response => {
    var title = response[0].title
    var title_heading = document.createElement("h2");
    title_heading.innerHTML = title;
    var quizz_title = document.getElementById("quizz-title")
    quizz_title.appendChild(title_heading);
  });

var quizz_container = document.getElementById("quizz-container");

var questions_container = document.createElement("div");
questions_container.setAttribute("class", "col-lg-8");

fetch(get_questions_api_url + "?quizz_id=" + quizz_id)
  .then(response => response.json())
  .then(questions => {
    questions.forEach(row => {
      question_id = row.question_id;
      question = row.question;
      question_number = row.question_number;
      answer = row.answer;

      question_field = document.createElement("h4");
      question_field.setAttribute("class", "question");
      question_field.innerHTML = question;

      answer_field = document.createElement("input");
      answer_field.setAttribute("type", "text");
      answer_field.setAttribute("class", "form-control");
      answer_field.setAttribute("id", question_id);

      answer_msg = document.createElement("p");
      answer_msg.setAttribute("class", "hidden");
      answer_msg.setAttribute("id", "msg-" + question_id);
      answer_msg.innerHTML = "The correct answer is: " + answer;

      question_div = document.createElement("div");
      question_div.setAttribute("class", "question-row");

      question_div.appendChild(question_field);
      question_div.appendChild(answer_field);
      question_div.appendChild(answer_msg);
      questions_container.appendChild(question_div);


    });
  });

quizz_container.appendChild(questions_container);

var submit_container = document.getElementById("submit-container");

var result_msg = document.createElement("h4");
result_msg.setAttribute("id", "result-msg");
result_msg.setAttribute("class", "hidden");
result_msg.innerHTML = "Result Message";
submit_container.appendChild(result_msg);

var submit_btn = document.createElement("button");
submit_btn.setAttribute("class", "btn btn-primary");
submit_btn.setAttribute("onclick", "submitAnswers()");
submit_btn.setAttribute("id", "submit-answers");
submit_btn.innerHTML = "Submit";


submit_container.appendChild(submit_btn);





function submitAnswers(){
  var client_answers = [];
  //get all the input fields
  var input_fields = questions_container.getElementsByTagName('input');
  for(i = 0; i < input_fields.length; i++){
    var question_id = input_fields[i].id;
    //trim spaces from sides
    var client_answer = input_fields[i].value.trim();
    //check if all questions were answered first
    if(!client_answer){
      alert("Please answer all questions");
      input_fields[i].focus();
      return;
    }else{
      client_answers.push([question_id, client_answer]);
    }
  }
  //get all the correct answers from the server
  var correct_answers = [];
  for(i = 0; i < client_answers.length; i++){
    var question_id = client_answers[i][0];
    fetch(get_questions_api_url + "?question_id=" + question_id)
      .then(response => response.json())
      .then(response => {
        correct_answers.push(response[0]);
        if(correct_answers.length == client_answers.length){
          //ready to be compared
          compareAnswers(client_answers, correct_answers);
        }
      });
  }

}

function compareAnswers(client_answers, correct_answers){
  var correct_counter = 0;
  var total_questions = client_answers.length;

  for(i = 0; i < client_answers.length; i++){
    var question_id = client_answers[i][0];
    var client_a = client_answers[i][1].toLowerCase();

    //find correct answer using question id
    var correct_a = correct_answers.find(obj => obj.question_id === question_id);
    correct_a = correct_a.answer.toLowerCase();

    //Change form based on answers
    var answer_field = document.getElementById(question_id);
    if(client_a == correct_a){
      correct_counter++;
      answer_field.setAttribute("class", "form-control correct");
    }else{
      answer_field.setAttribute("class", "form-control wrong");
      answer_msgs.push(document.getElementById("msg-" +question_id));

    }
  }
  document.getElementById("submit-answers").remove();

  var quizz_container = document.getElementById("quizz-container");
  var result_msg = document.getElementById("result-msg");

  //display message based on correct answers
  if(total_questions - correct_counter > 0){
    result_msg.innerHTML = correct_counter + "/" + total_questions + " Correct Answers";
    var answers_btn = document.createElement("button");
    answers_btn.setAttribute("class", "btn btn-primary");
    answers_btn.setAttribute("onclick", "revealAnswers()");
    answers_btn.innerHTML = "Reveal Correct Answers";
    submit_container.appendChild(answers_btn);

  }else{
    result_msg.innerHTML = "All Answers Were Correct";
    quizz_container.appendChild(result_msg);
  }
  result_msg.setAttribute("class", "");


}

function revealAnswers(){
  for(i = 0; i < answer_msgs.length; i++){
    answer_msgs[i].setAttribute("class", "");
  }
}
