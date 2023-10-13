let notes = [];
let titles = [];
let trashNotes = [];
let trashTitles = [];
load();


function createNotiz() {
    let inputElement = document.getElementById('note');
    let newPost = inputElement.value;
    notes.push(newPost);
    let inputTitle = document.getElementById('noteTitle');
    let newTitle = inputTitle.value;
    titles.push(newTitle);
    saveNotes();
    displayNotes();
    inputElement.value = '';
    inputElement.placeholder = 'Notiz schreiben';
    inputTitle.value = '';
    inputTitle.placeholder = 'Titel eingeben';

}

function saveNotes() {
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
    let titleAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titleAsText);
    let trashNotesAsText = JSON.stringify(trashNotes);
    localStorage.setItem('trashnotes', trashNotesAsText);
    let trashTitleAsText = JSON.stringify(trashTitles);
    localStorage.setItem('trashtitles', trashTitleAsText);
}

function displayNotes() {
    const notizElement = document.getElementById('notiz');
    notizElement.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        const posts = notes[i];
        const titlesPosts = titles[i];

        notizElement.innerHTML += `
        <div class="postBox">
        <div class="postingContainer">
        <b>Title: </b>${titlesPosts}
        <b>Notiz: </b>${posts}
        </div> 
        <button class="deleteButton" onclick="deleteNote(${i})">Löschen</button>
        </div>
        <br>
        `;
    }
}

function deleteNote(index) {
    trashNotes.push(notes[index]);
    trashTitles.push(titles[index]);
    notes.splice(index, 1);
    titles.splice(index, 1);
    saveNotes();
    displayNotes();
}

function load() {
    let notesAsText = localStorage.getItem('notes');
    if (notesAsText) {
        notes = JSON.parse(notesAsText); //parse-Methode: Text umwandeln und in ein array ausgeben
    }

    let titleAsText = localStorage.getItem('titles');
    if (titleAsText) {
        titles = JSON.parse(titleAsText);
    }

    let trashTitleAsText = localStorage.getItem('trashtitles');
    if (trashTitleAsText) {
        trashTitles = JSON.parse(trashTitleAsText);
    }

    let trashNotesAsText = localStorage.getItem('trashnotes');
    if (trashNotesAsText) {
        trashNotes = JSON.parse(trashNotesAsText);
    }
}

function displayTrash() {
    const trashElement = document.getElementById('trash');
    trashElement.innerHTML = '';

    for (let i = 0; i < trashNotes.length; i++) {
        const trashPost = trashNotes[i];
        const trashTitlesPost = trashTitles[i];

        trashElement.innerHTML += `
        <div class="postingContainer">
            <b>Title: </b>${trashTitlesPost}
            <b>Notiz: </b>${trashPost}
            <div class="buttons">
            <button class="deleteButton" onclick="deleteTrashNote(${i})">Löschen</button>
            <button class="deleteButton" onclick="restoreTrashNote(${i})">Wiederherstellen</button>
            </div>
        </div>
        <br>
        `;
    }
}

function deleteTrashNote(index) {
    trashNotes.splice(index, 1);
    trashTitles.splice(index, 1);
    saveNotes();
    displayTrash();
}

function restoreTrashNote(index) {
    titles.push(trashTitles[index]);
    notes.push(trashNotes[index]);
    deleteTrashNote(index);
    saveNotes();
}