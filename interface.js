
let game_box = document.getElementById("gamebox");
let lesson_selection = document.createElement("div");

function make_lesson_selection(lesson_title, lesson_nr, levels_nr, level_offset, save_to_main) {
    let lesson_selection_box = document.createElement("div");
    lesson_selection_box.classList.add("lessonselectitem");
    // Making a div for the selection title, so that people know what it is
    let selection_title = document.createElement("div");
    selection_title.classList.add("lessontitle");
    selection_title.innerHTML = lesson_title;
    lesson_selection_box.appendChild(selection_title);

    // Adding a progress bar
    let progress_bar_outer = document.createElement("div");
    progress_bar_outer.classList.add("progressbarouter");

    let progress_bar_inner = document.createElement("div");
    progress_bar_inner.classList.add("progressbarinner");

    progress_bar_inner.id = `lessonbar_${lesson_nr}`;
    
    progress_bar_outer.appendChild(progress_bar_inner);

    lesson_selection_box.appendChild(progress_bar_outer);

    // Setting progress of the progress bar
    // console.log("setting bar to " + Math.round(((level_offset - 1) / levels_nr) * 100));
    progress_bar_inner.style.width = Math.round(((level_offset - 1) / levels_nr) * 100).toString() + "%";
    
    // adding functionality to it
    lesson_selection_box.addEventListener("click", function () {
	// Load and add level to screen
	game_box.innerHTML = `You are now in Lesson ${lesson_nr}, Level ${level_offset}`;

	// The exit button lets us save our progress.
	let exit_button = document.createElement("button");
	exit_button.innerHTML = "Save Progress";
	// Go back
	exit_button.addEventListener("click", save_to_main);
	
	game_box.appendChild(exit_button);
	
	
    });
    
    return lesson_selection_box;
}
