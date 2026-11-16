
document.addEventListener("DOMContentLoaded", () => {

    const noteForm = document.getElementById("noteForm");
    const noteTitle = document.getElementById("noteTitle");
    const noteContent = document.getElementById("noteContent");
    const notesList = document.getElementById("notesList");

    let notes = JSON.parse(
        localStorage.getItem("routiva-notes")
    ) || [];


    function saveNotes() {

        localStorage.setItem(
            "routiva-notes",
            JSON.stringify(notes)
        );

    }


    function renderNotes() {

        notesList.innerHTML = "";

        const language =
            localStorage.getItem("routiva-language") || "fa";

        if (notes.length === 0) {

            const empty = document.createElement("p");

            empty.textContent = translations[language].emptyNotes;

            empty.style.color = "var(--muted)";

            notesList.appendChild(empty);

        }

        notes.forEach((note, index) => {

            const card = document.createElement("article");
            card.className = "note-card";

            const title = document.createElement("h3");
            title.textContent = note.title;

            const content = document.createElement("p");
            content.textContent = note.content;

            const footer = document.createElement("div");
            footer.className = "note-footer";

            const date = document.createElement("small");
            date.textContent = note.date;

            const remove = document.createElement("button");

            remove.className = "delete-button";
            remove.textContent = translations[language].delete;

            remove.addEventListener("click", () => {

                notes.splice(index, 1);

                saveNotes();
                renderNotes();

            });

            footer.append(date, remove);

            card.append(title, content, footer);

            notesList.appendChild(card);

        });

    }


    noteForm.addEventListener("submit", event => {

        event.preventDefault();

        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();

        if (!title || !content) return;

        notes.unshift({

            title,
            content,

            date: new Date().toLocaleDateString(
                localStorage.getItem("routiva-language") === "en"
                    ? "en-US"
                    : "fa-IR"
            )

        });

        saveNotes();

        noteForm.reset();

        renderNotes();

    });


    document.addEventListener("routiva:languageChanged", renderNotes);

    renderNotes();

});
