
// This is an enum detailing the available types of questions we see on our platform
const QuestionType = {
    "MULT_CHOICE" : 0,
    "BLANK_FILL" : 1,
    "MATCHING" : 2,
};
// This is what you might know as a constructor for the question type
function question(qtype, qdata, qans) {
    return Object.freeze({
	qtype, // qtype is the question
	qdata, // qdata is the data of the question. This can vary between question types
	qans // qans is the index of the question's answer in qdata
    });
}
let wrong_answer_sound = new Audio("./Assets/Bruh-Sound-Effect.mp3");
let right_answer_sound = new Audio("./Assets/FitnessGram2.mp3");
function wrong_answer(lesson) {
    console.log("Wrong answer");
    // Play an audio cue that we got a question wrong
    wrong_answer_sound.play();
    // Push a copy of this question to the end, the same behavior that duolingo exhibits
    // not actually working

    // Find some way to signal back to the server that the question was got wrong

    lesson.next_question();
}

function right_answer(lesson) {
    console.log("Right answer");
    // Play an audio cue
    right_answer_sound.play();
    // Update the score
    ++lesson.discrete_score;
    // Move to the next question
    lesson.next_question();
    // Find some way to signal back to the server that the question was right
}

// generates a html form with event listeners for each question
function generate(question, question_nr, lesson_object) {
    // The question object is returned at the end of the function
    let q_object = document.createElement("form");
    switch (question.qtype) {
    case QuestionType.MULT_CHOICE:
	// For a multiple choice question, the first element in the array is always the question text
	// The next answers are always the radio button texts
	
	question.qdata.forEach(function (element, element_nr) {
	    // function that returns a radio button element
	    function radio(choice_num) {
		let rad = document.createElement("input");
		rad.type = "radio";
		rad.id = `q${element_nr}_${choice_num}`;
		rad.name = `q${question_nr}`;
		return rad;
	    }
	    
	    if (element_nr == 0) {
		// This is the question text
		let initial_question = document.createElement("p");
		initial_question.innerHTML = element;
		q_object.appendChild(initial_question);
		//q_object.appendChild(document.createElement("br"));
	    } else {
		let qselect = radio(element_nr);
		let qchoice = document.createElement("label");
		qchoice.innerHTML = element;
		qchoice["for"] = `q${question_nr}_${element_nr}`;
		if (element_nr == question.qans) {
		    // This is the right answer
		    qselect.addEventListener("click", function () {
			// Plays the code for right answer
			right_answer(lesson_object);

			// Move to next question
		    });
		} else {
		    // This is the wrong answer
		    qselect.addEventListener("click", function () {
			// Plays the code for wrong answer
			wrong_answer(lesson_object);

			// Move to next question
		    })
		}
		q_object.appendChild(qselect);
		q_object.appendChild(qchoice);
		q_object.appendChild(document.createElement("br"));
		
	    } 
	}); 
	break;
    case QuestionType.BLANK_FILL:
	// Create a fill in the blank question
	let main_question = question.qdata[0];
	let dropdowns = question.qdata.slice(1);
	let dropdown_objects = [];
	dropdowns.forEach(function (element, element_nr) {
	    // Create a dropdown in HTML
	    let current_dropdown = document.createElement("select");
	    current_dropdown.id = `q${question_nr}_${element_nr}`;
	    current_dropdown.name = `q${question_nr}_${element_nr}`;
	    // console.log(element);
	    element.forEach(function (choice, choice_nr) { // Iterates through the options for each dropdown
		let current_choice = document.createElement("option");
		current_choice.innerHTML = choice;
		current_choice.value = choice_nr;
		current_dropdown.appendChild(current_choice);
	    });
	    // Adding the dropdown to the list of dropdown objects that we have for this question
	    dropdown_objects.push(current_dropdown);
	});
	// Getting the main object stitched together
	dropdown_objects.forEach(function (dd, dd_no) {
	    let qpart = document.createElement("label");
	    qpart.innerHTML = main_question[dd_no];
	    q_object.appendChild(qpart);
	    q_object.appendChild(dd);
	});
	// Final part
	let qpart = document.createElement("label");
	qpart.innerHTML = main_question[main_question.length - 1];
	q_object.appendChild(qpart);
	
	// The submit button that lets you check your answer.
	let submit_button = document.createElement("button");
	submit_button.innerHTML = "Answer";
	submit_button.type = "button";
	submit_button.addEventListener("click", function () {
	    if (dropdown_objects.every(function (dropdownitem, dropdown_index) {
		// console.log(`Choice: ${dropdownitem.value}`);
		// console.log(`Correct answer: ${question.qans[dropdown_index]}`);
		return parseInt(dropdownitem.value) === question.qans[dropdown_index];
	    })) {
		right_answer(lesson_object);
	    } else {
		wrong_answer(lesson_object);
	    }
	});
	q_object.appendChild(document.createElement("br"));
	q_object.appendChild(submit_button);
	break;
    case QuestionType.MATCHING:
	// Instructions because they might not get it
	let instructions = document.createElement("p");
	instructions.innerHTML = "Match the following with the correct answers: ";
	q_object.appendChild(instructions);
	// The matching question has two columns, the left column and the right column
	let org = document.createElement("table");
	let lc = question.qdata[0]; let rc = question.qdata[1];
	let drop_objects = [];
	
	lc.forEach(function (factor, i) {
	    let table_row = document.createElement("tr");
	    // Creating the label for each left side
	    let llabel = document.createElement("label");
	    llabel.innerHTML = factor;
	    let louter = document.createElement("td");
	    louter.align = "center";
	    // Creating the dropdown menu for each
	    let dd = document.createElement("select");
	    rc.forEach(function (choice, choice_nr) {
		// Creating each individual choice
		let chop = document.createElement("option");
		chop.innerHTML = choice;
		chop.value = choice_nr;
		dd.appendChild(chop);
	    });
	    // Arrangement of objects
	    drop_objects.push(dd);
	    louter.appendChild(llabel);
	    louter.appendChild(dd);
	    table_row.appendChild(louter);
	    // Creating the label for each right side
	    let rlabel = document.createElement("td");
	    rlabel.align = "right";
	    rlabel.innerHTML = rc[i];
	    table_row.appendChild(rlabel);
	    // Appending the construction to the table
	    org.appendChild(table_row);
	});
	q_object.appendChild(org);
	
	// The submit button that lets you check your answer.
	let submit = document.createElement("button");
	submit.innerHTML = "Answer";
	submit.type = "button";
	submit.addEventListener("click", function () {
	    if (drop_objects.every(function (dropdownitem, dropdown_index) {
		// console.log(`Choice: ${dropdownitem.value}`);
		// console.log(`Correct answer: ${question.qans[dropdown_index]}`);
		return parseInt(dropdownitem.value) === question.qans[dropdown_index];
	    })) {
		right_answer(lesson_object);
	    } else {
		wrong_answer(lesson_object);
	    }
	});
	q_object.appendChild(document.createElement("br"));
	q_object.appendChild(submit);
	break;
    default:
	// Should never get here because there are only three QuestionTypes in Ba Sing Se
	break;
    }
    return q_object;
}
let end_screen_sound = new Audio("./Assets/FitnessGram1.mp3");
// a lesson is just a list of questions, by the way
function generate_lesson(lesson_data, div) {

    let lesson_object = {
	div,
	question_list : [],
	current_question : 0,
	discrete_score : 0,
	total_questions : lesson_data.length,
	next_question: function () {
	    ++lesson_object.current_question;
	    if (lesson_object.current_question >= lesson_object.total_questions) {
		// Display the end screen
		div.innerHTML = "";
		let end_screen = document.createElement("p");
		end_screen.innerHTML = `Your final score is ${lesson_object.discrete_score}/${lesson_object.total_questions}`;
		end_screen_sound.play();
		div.appendChild(end_screen);
	    } else {
		// Display the next question
		div.innerHTML = "";
		div.appendChild(lesson_object.question_list[lesson_object.current_question]);
	    }
	}
    };
    // Compiling the data for each question
    lesson_data.forEach(function (element, element_nr) {
	let question = generate(element, element_nr, lesson_object);
	question.id = `q${element_nr + 1}`;
	lesson_object.question_list.push(question);
    });
    
    // Loading the first question
    div.innerHTML = "";
    div.appendChild(lesson_object.question_list[0]);
    return lesson_object;
}
function multilevel_lesson(lesson_data, div, lesson_offset) {
    
    let current_level_index = 0;
    let total_levels = lesson_data;
    
    let ml_lesson_object = {
	div,
	levels : lesson_data.map(function (lesson_level, lesson_nr) {
	    // Collecting the lesson data for each one
	    let lesson_div = document.createElement("div");
	    lesson_div.id = `lesson${lesson_nr + 1}`;
	    return generate_lesson(lesson, lesson_div);
	}),
	current_level_index,
	total_levels,
	next_level : function () {
	    ++current_level_index;
	    if (current_level_index < total_levels) {
		// Next level
		div.innerHTML = `<p>Level ${current_level_index}</p>`;
		div.appendChild(levels[current_level_index].div);
	    } else {
		// Get the results
		let score = 0;
		let out_of = 0;
		levels.forEach(function (level, level_nr) {
		    score += level.discrete_score;
		    out_of += level.total_questions;
		});
		end_screen_sound.play();
		div.innerHTML = `<p>Congratulations! You have finished the levels! Your score is ${score}/${out_of}<p>`;
	    }
	},
	next_question : function () {
	    // Allows continuity between levels
	    let current_lesson = levels[current_level_index];
	    ++current_lesson.current_question;
	    if (current_lesson.current_question >= current_lesson.total_questions) {
		next_level();
	    } else {
		current_lesson.div.innerHTML = "";
		current_lesson.div.appendChild(current_lesson.question_list[current_lesson.current_question]);
	    }
	},
    };
    ml_lesson_object.forEach(function (lesson) {
	lesson.next_question = ml_lesson_object.next_question;
    });
    return ml_lesson_object;
}
