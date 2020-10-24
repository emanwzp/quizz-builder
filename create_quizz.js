

var title = "";
var questions = [];


function saveQuizz(){
	var quizz_saved = true;
	if(questions.length == 0){
    alert("Your quizz does not have any questions");
	}else{

		fetch(add_quizz_api_url + "?title=" +title)
		.then(response => response.json())
		.then(response =>{
			var quizz_id = response.quizz_id;
			if(typeof quizz_id === 'number' && (quizz_id%1) === 0) {
	    	// save questions here
        for(i = 0; i < questions.length; i++){
          var question = questions[i][0];
          var question_number = i + 1;
          var answer = questions[i][1];
          fetch(add_question_api_url + "?quizz_id=" + quizz_id + "&question=" +
          question + "&question_number=" + question_number + "&answer=" + answer)
          .then(response => response.json())
          .then(response =>{
            if(response !== 1){
							alert("An error occured when trying to save the quizz");
              quizz_saved = false;

            }
          });
        }
			}
			else{
				alert("failed to save the quizz or get a valid response from the server")
			}
		});
  }
	if(quizz_saved){
		alert("Quizz was successfully created!");
		window.location.href = "homepage.html";
	}
}

function loadBuilder(){
  var textfield = document.getElementById("title-field");
  if(!textfield.value){
    alert("Give you quizz a title first");
  }else{
    title = textfield.value;
    var builder = document.getElementById("builder");
    builder.innerHTML = "";

    var display_title = document.createElement("h3");
    display_title.innerHTML = "Quizz Title: " + title;
    builder.appendChild(display_title);

    var question_field = document.createElement("input");
    question_field.setAttribute("class", "form-control col col-lg-12");
    question_field.setAttribute("id", "question-field");
    question_field.setAttribute("placeholder", "Question");

    var answer_field = document.createElement("input");
    answer_field.setAttribute("class", "form-control col col-lg-12");
    answer_field.setAttribute("type", "text");
    answer_field.setAttribute("id", "answer-field");
    answer_field.setAttribute("placeholder", "Answer");


    var add_question_btn = document.createElement("button");
    add_question_btn.setAttribute("class", "btn btn-outline-secondary");
    add_question_btn.setAttribute("onclick", "addQuestion()");
    add_question_btn.innerHTML = "Add Question";



    builder.appendChild(question_field);
    builder.appendChild(answer_field);
    builder.appendChild(add_question_btn);


    var question_list = document.createElement("ul");
    question_list.setAttribute("class", "list-group");
    question_list.setAttribute("title", "Question List");
    question_list.setAttribute("id", "question-list");
    builder.appendChild(question_list);


    var save_quizz_btn = document.createElement("button");
    save_quizz_btn.setAttribute("class", "btn btn-primary");
    save_quizz_btn.setAttribute("onclick", "saveQuizz()");
    save_quizz_btn.innerHTML = "Save Quizz";
    builder.appendChild(save_quizz_btn);
  }



}

function addQuestion(){
  var question_field = document.getElementById("question-field");
  var answer_field = document.getElementById("answer-field");
  if(!question_field.value){
    alert("input a question first please");
  }else if (!answer_field.value) {
    alert("input an answer first please");
  }else{
    var question = [question_field.value, answer_field.value];
    questions.push(question);

    question_field.value = "";
    answer_field.value = "";
    showQuestions();
  }


}

function showQuestions(){
  var builder = document.getElementById("builder");
  var question_list = document.getElementById("question-list");
  question_list.innerHTML = "";
  for (i = 0; i < questions.length; i++){
    var question = questions[i][0];
    var question_show = document.createElement("li");
    question_show.setAttribute("class", "list-group-item");
    question_show.innerHTML = question;
    question_list.appendChild(question_show);
  }

}
