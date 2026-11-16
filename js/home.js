
document.addEventListener("DOMContentLoaded", () => {

    // Voice Interface

    const voiceOrb = document.getElementById("voiceOrb");
    const voiceStatus = document.getElementById("voiceStatus");
    const voiceHint = document.querySelector(".voice-hint");

    let isListening = false;

    function updateVoiceInterface() {

        const language =
            localStorage.getItem("routiva-language") || "fa";

        isListening = !isListening;

        voiceOrb.classList.toggle("listening", isListening);

        voiceOrb.setAttribute(
            "aria-pressed",
            String(isListening)
        );

        if (language === "fa") {

            voiceStatus.textContent = isListening
                ? "در حال گوش دادن..."
                : "برای اتصال ضربه بزن";

            voiceHint.textContent = isListening
                ? "حالت شنود نمایشی فعال است."
                : "ایجنت تو منتظر فرمان توست.";

        } else {

            voiceStatus.textContent = isListening
                ? "LISTENING..."
                : "TAP TO CONNECT";

            voiceHint.textContent = isListening
                ? "Demo listening mode is active."
                : "Your agent is waiting for your command.";

        }

    }

    if (voiceOrb) {
        voiceOrb.addEventListener("click", updateVoiceInterface);
    }

    document.addEventListener("routiva:languageChanged", () => {

        const language = localStorage.getItem("routiva-language");

        if (voiceStatus) {

            voiceStatus.textContent = isListening
                ? (language === "fa" ? "در حال گوش دادن..." : "LISTENING...")
                : (language === "fa" ? "برای اتصال ضربه بزن" : "TAP TO CONNECT");

        }

        if (voiceHint) {

            voiceHint.textContent = isListening
                ? (language === "fa"
                    ? "حالت شنود نمایشی فعال است."
                    : "Demo listening mode is active.")
                : (language === "fa"
                    ? "ایجنت تو منتظر فرمان توست."
                    : "Your agent is waiting for your command.");

        }

    });


    // Task Management

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(
        localStorage.getItem("routiva-tasks")
    ) || [];

    function saveTasks() {

        localStorage.setItem(
            "routiva-tasks",
            JSON.stringify(tasks)
        );

    }

    function renderTasks() {

        taskList.innerHTML = "";

        if (tasks.length === 0) {

            const empty = document.createElement("li");
            empty.textContent = translations[
                localStorage.getItem("routiva-language") || "fa"
            ].emptyTasks;

            taskList.appendChild(empty);

        }

        tasks.forEach((task, index) => {

            const li = document.createElement("li");

            if (task.completed) li.classList.add("done");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {

                tasks[index].completed = checkbox.checked;

                saveTasks();
                renderTasks();

            });

            const span = document.createElement("span");
            span.textContent = task.text;

            const remove = document.createElement("button");
            remove.className = "delete-button";
            remove.textContent = "✕";
            remove.setAttribute("aria-label", "Delete task");

            remove.addEventListener("click", () => {

                tasks.splice(index, 1);

                saveTasks();
                renderTasks();

            });

            li.append(checkbox, span, remove);

            taskList.appendChild(li);

        });

        updateStats();

    }

    if (taskForm) {

        taskForm.addEventListener("submit", event => {

            event.preventDefault();

            const text = taskInput.value.trim();

            if (!text) return;

            tasks.push({
                text,
                completed: false
            });

            saveTasks();

            taskInput.value = "";

            renderTasks();

        });

    }


    // Reminder Management

    const reminderForm = document.getElementById("reminderForm");
    const reminderInput = document.getElementById("reminderInput");
    const reminderDate = document.getElementById("reminderDate");
    const reminderList = document.getElementById("reminderList");

    let reminders = JSON.parse(
        localStorage.getItem("routiva-reminders")
    ) || [];

    function saveReminders() {

        localStorage.setItem(
            "routiva-reminders",
            JSON.stringify(reminders)
        );

    }

    function renderReminders() {

        reminderList.innerHTML = "";

        const language =
            localStorage.getItem("routiva-language") || "fa";

        if (reminders.length === 0) {

            const empty = document.createElement("li");
            empty.textContent = translations[language].emptyReminders;

            reminderList.appendChild(empty);

        }

        reminders.forEach((reminder, index) => {

            const li = document.createElement("li");

            const span = document.createElement("span");

            span.textContent =
                reminder.text + " | " +
                new Date(reminder.date).toLocaleString(
                    language === "fa" ? "fa-IR" : "en-US"
                );

            const remove = document.createElement("button");

            remove.className = "delete-button";
            remove.textContent = "✕";

            remove.addEventListener("click", () => {

                reminders.splice(index, 1);

                saveReminders();
                renderReminders();

            });

            li.append(span, remove);

            reminderList.appendChild(li);

        });

    }

    if (reminderForm) {

        reminderForm.addEventListener("submit", event => {

            event.preventDefault();

            const text = reminderInput.value.trim();
            const date = reminderDate.value;

            const language =
                localStorage.getItem("routiva-language") || "fa";

            if (!text || !date) return;

            if (new Date(date).getTime() <= Date.now()) {

                alert(translations[language].futureDate);
                return;

            }

            reminders.push({
                text,
                date
            });

            saveReminders();

            reminderForm.reset();

            renderReminders();

        });

    }


    // Dashboard Statistics

    function updateStats() {

        const total = document.getElementById("totalTasks");
        const completed = document.getElementById("completedTasks");

        if (total) total.textContent = tasks.length;

        if (completed) {
            completed.textContent =
                tasks.filter(task => task.completed).length;
        }

    }


    // Update Dynamic Text After Language Change

    document.addEventListener("routiva:languageChanged", () => {

        renderTasks();
        renderReminders();

    });


    // Initial Rendering

    renderTasks();
    renderReminders();
    updateStats();

});
