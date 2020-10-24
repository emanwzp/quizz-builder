const url = window.location.href;
const host = url.substring(0, url.indexOf('quizz/') + 'quizz/'.length);

const get_quizzes_api_url = host + "db/get_quizzes_api.php";
const get_questions_api_url = host + "db/get_questions_api.php";

const add_quizz_api_url = host + "db/add_quizz_api.php";
const add_question_api_url = host + "db/add_question_api.php";

const update_question_api_url = host + "db/update_question_api.php";
const update_quizz_api_url = host + "db/update_quizz_api.php";

const delete_quizz_api_url = host + "db/delete_quizz_api.php";
const delete_questions_api_url = host + "db/delete_questions_api.php";
