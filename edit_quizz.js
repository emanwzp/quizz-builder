var url_string = new URL(url);
var quizz_id = url_string.searchParams.get("quizz_id");

var questions = [];

fetch(get_quizzes_api_url + "?quizz_id=" + quizz_id)
  .then(response => response.json())
  .then(response => {
    var title = response[0].title
    var title_heading = document.createElement("h2");
    title_heading.setAttribute("id", "title");
    title_heading.innerHTML = title;

    var rename_btn = document.createElement("button");
    rename_btn.setAttribute("class", "btn btn-secondary");
    rename_btn.setAttribute("onclick", "editQuizzTitle()");
    rename_btn.setAttribute("id", "rename-title");
    rename_btn.innerHTML = "Rename Quizz";

    var save_btn = document.createElement("button");
    save_btn.setAttribute("class", "btn btn-secondary");
    save_btn.setAttribute("style", "display:none");
    save_btn.setAttribute("onclick", "saveQuizzTitle()");
    save_btn.setAttribute("id", "save-title");
    save_btn.innerHTML = "Save Title";

    var cancel_btn = document.createElement("button");
    cancel_btn.setAttribute("class", "btn btn-secondary");
    cancel_btn.setAttribute("style", "display:none");
    cancel_btn.setAttribute("onclick", "cancelTitleChange('" + title_heading.innerHTML + "')");
    cancel_btn.setAttribute("id", "cancel-title");
    cancel_btn.innerHTML = "Cancel";

    var title_header = document.getElementById("title-header");
    title_header.appendChild(title_heading);
    title_header.appendChild(rename_btn);
    title_header.appendChild(save_btn);
    title_header.appendChild(cancel_btn);

  });


showQuestions();

//deals with drag and drop list items
var dragged;
var id;
var index;
var indexDrop;
var list;

document.addEventListener("dragstart", ({
  target
}) => {
  dragged = target;
  id = target.id;
  list = target.parentNode.children;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === dragged) {
      index = i;
    }
  }
});

document.addEventListener("dragover", (event) => {
  event.preventDefault();
});

document.addEventListener("drop", ({
  target
}) => {
  if (target.className == "list-group-item" && target.id !== id) {
    dragged.remove(dragged);
    for (let i = 0; i < list.length; i += 1) {
      if (list[i] === target) {
        indexDrop = i;
      }
    }
    //console.log(index, indexDrop);
    if (index > indexDrop) {
      target.before(dragged);
    } else {
      target.after(dragged);
    }
  }
});




function getOrder(){
  var list_questions = document.getElementsByTagName("li");
  return list_questions;
}



function saveQuizzTitle(){
	var title = document.getElementById("title").innerHTML;
  if(title){
    fetch(update_quizz_api_url + "?id=" + quizz_id + "&title=" + title);
    alert('Quizz Title changed');
    document.getElementById("rename-title").style.display = "inline-block";
    document.getElementById("save-title").style.display = "none";
    document.getElementById("cancel-title").style.display = "none";
  }else{
    alert('input a valid title');
    document.getElementById("title").focus();
  }
	//
}



function showQuestions(){
  var question_list = document.getElementById("question-list");
  var quizz_container = document.getElementById("quizz-container");
  fetch(get_questions_api_url + "?quizz_id=" + quizz_id)
    .then(response => response.json())
    .then(response => {
      response.forEach(row => {
        var question_show = document.createElement("li");
        question_show.setAttribute("class", "list-group-item");
        question_show.setAttribute("draggable", "true");
        question_show.setAttribute("id", row.question_id);
        question_show.innerHTML = row.question;
        question_list.appendChild(question_show);

        questions.push(row);

        question_div = document.createElement("div");
        question_div.setAttribute("class", "question-row");

        question_p = document.createElement("h4");
        //question_field.setAttribute("class", "question");
        question_p.innerHTML = "Question: " + row.question;

        answer_p = document.createElement("h4");
        //answer_field.setAttribute("type", "text");
        answer_p.innerHTML = "Answer: " + row.answer;

        edit_btn = document.createElement("button");
        edit_btn.setAttribute("class", "btn btn-secondary edit");
        edit_btn.setAttribute("onclick", "editQuestion('" + row.question_id +"')");
        edit_btn.innerHTML = "Edit Question ";
        delete_btn = document.createElement("button");
        delete_btn.setAttribute("class", "btn btn-secondary delete");
        delete_btn.setAttribute("onclick", "deleteQuestion('" + row.question_id +"')");
        delete_btn.innerHTML = "Delete Question ";

        question_div.appendChild(question_p);
        question_div.appendChild(answer_p);
        question_div.appendChild(edit_btn);
        question_div.appendChild(delete_btn);

        quizz_container.appendChild(question_div);
      });

    });

}

function saveOrder(){
  var question_list = document.getElementsByTagName("li");
  for(i = 0; i < question_list.length; i++){
    //check if order of each question is still the same, if not, they need to be updated
    var question_id = question_list[i].id
    var temp_question = questions.find(obj => obj.question_id == question_id);
    var old_order = parseInt(temp_question.question_number);
    var new_order = i+1;
    if(old_order !== new_order){
      //question order needs to be updated
      fetch(update_question_api_url + "?question_id=" + question_id + "&question_number=" + new_order);
    };
  }
  window.location.reload();
}

function editQuizzTitle(){
  var title_heading = document.getElementById("title");
  title_heading.setAttribute("contenteditable", "true");
  title_heading.focus();
  document.getElementById("rename-title").style.display = "none";
  document.getElementById("save-title").style.display = "inline-block";
  document.getElementById("cancel-title").style.display = "inline-block";


  var quizz_title = document.getElementById("title-header");


}

function cancelTitleChange(original_t){
  var title_heading = document.getElementById("title");
  title_heading.setAttribute("contenteditable", "false");
  title_heading.innerHTML = original_t;
  document.getElementById("rename-title").style.display = "inline-block";
  document.getElementById("save-title").style.display = "none";
  document.getElementById("cancel-title").style.display = "none";
}

function addQuestion(){
  var question_field = document.getElementById("question-field");
  var answer_field = document.getElementById("answer-field");
  if(!question_field.value){
    alert("input a question first please");
  }else if (!answer_field.value) {
    alert("input an answer first please");
  }else{
    var question = question_field.value;
    var answer = answer_field.value
    var question_number = questions.length + 1;
    fetch(add_question_api_url + "?quizz_id=" + quizz_id + "&question=" +
    question + "&question_number=" + question_number + "&answer=" + answer);
    alert('Question Added To The Quizz');
    window.location.reload();
  }
}

function deleteQuestion(question_id){
  fetch(delete_questions_api_url + "?question_id=" + question_id);
  alert('Question deleted');
  window.location.reload();
}


function editQuestion(question_id){
  var question_container = document.getElementById("quizz-container");

  var question_editor = document.createElement("div");
  question_editor.setAttribute("id", "question-editor");
  var heading = document.createElement("h4");
  heading.innerHTML = "Edit question";
  var temp_question = questions.find(obj => obj.question_id == question_id);

  var question_field = document.createElement("input");
  question_field.setAttribute("class", "form-control col col-lg-4");
  question_field.setAttribute("type", "text");
  question_field.setAttribute("id", "question-field-edit");
  question_field.value = temp_question.question;

  var answer_field = document.createElement("input");
  answer_field.setAttribute("class", "form-control col col-lg-4");
  answer_field.setAttribute("type", "text");
  answer_field.setAttribute("id", "answer-field-edit");
  answer_field.value = temp_question.answer;

  var submit_btn = document.createElement("button");
  submit_btn.setAttribute("class", "btn btn-secondary");
  submit_btn.setAttribute("onclick", "updateQuestion('" + question_id + "')");
  submit_btn.innerHTML = "Save Changes";

  question_editor.appendChild(heading);
  question_editor.appendChild(question_field);
  question_editor.appendChild(answer_field);
  question_editor.appendChild(submit_btn);
  question_container.appendChild(question_editor);

  question_field.focus();
}

function updateQuestion(question_id){
  console.log(question_id);
  var question_field = document.getElementById('question-field-edit');
  var question = question_field.value;
  var answer_field = document.getElementById('answer-field-edit')
  var answer = answer_field.value;
  if(!question){
    alert("Please input a valid question");
    question_field.focus();
  }else if(!answer){
    alert("Please input a valid answer");
    answer_field.focus();
  }else{
    fetch(update_question_api_url + "?question_id=" + question_id + "&question=" + question + "&answer=" + answer);
    alert("Question updated");
    window.location.reload();
  }
}
