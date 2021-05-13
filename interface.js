
let game_box = document.getElementById("gamebox");
let lesson_selection = document.createElement("div");

function make_lesson_selection(lesson_title, lesson_nr, levels_nr, level_offset, loader, save_to_main) {
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
    lesson_selection_box.addEventListener("click", loader);
    
    return lesson_selection_box;
}
