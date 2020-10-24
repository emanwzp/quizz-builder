


loadQuizzes();





function loadQuizzes(){
	fetch(get_quizzes_api_url + "?quizzes")
		.then(response => response.json())
		.then(quizzes => {

			var quizz_holder = document.createElement("div");
			quizz_holder.setAttribute("class", "radio-toolbar");

			quizzes.forEach(quizz =>{
				quizz_id = quizz.quizz_id
				quizz_title = quizz.title

				var quizz_radio = document.createElement("input");
				quizz_radio.setAttribute("type", "radio");
				quizz_radio.setAttribute("id", quizz_id);
				quizz_radio.setAttribute("value", quizz_id);
				quizz_radio.setAttribute("name", "quizz");

				var	quizz_label = document.createElement("label");
				quizz_label.setAttribute("for", quizz_id);
				quizz_label.setAttribute("class", "col-sm-2");
				quizz_label.innerHTML = quizz_title

				quizz_holder.appendChild(quizz_radio);
				quizz_holder.appendChild(quizz_label);

			});
			var container = document.getElementById("quizzes");
			container.innerHTML = "";
			container.appendChild(quizz_holder)
		});
}


function deleteQuizz(){
	//getting quizz id by getting the checked radio button
	var radios = document.querySelectorAll('input[type="radio"]:checked');
	var quizz_id = radios.length>0? radios[0].value: null;
	if(quizz_id){
		fetch(delete_questions_api_url + "?quizz_id=" + quizz_id);
		fetch(delete_quizz_api_url + "?id=" + quizz_id)
		.then(response => response.json())
		.then(response => {
			if(response == 1){
				loadQuizzes();
			}else{
				alert("An error occured when deleting the quizz")
			}
		});


	}else{
		alert("Select a quizz to delete");
	}


}

function editQuizz(){
	//getting quizz id by getting the checked radio button
	var radios = document.querySelectorAll('input[type="radio"]:checked');
	var quizz_id = radios.length>0? radios[0].value: null;
	if(quizz_id){
		window.location.href = "edit_quizz_page.html?quizz_id=" + quizz_id;

	}else{
		alert("Select a quizz to edit");
	}

}

function playQuizz(){
	//getting quizz id by getting the checked radio button
	var radios = document.querySelectorAll('input[type="radio"]:checked');
	var quizz_id = radios.length>0? radios[0].value: null;
	if(quizz_id){
		window.location.href = "play_quizz_page.html?quizz_id=" + quizz_id;

	}else{
		alert("Select a quizz to play");
	}

}
