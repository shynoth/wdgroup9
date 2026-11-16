
const translations = {

    fa: {
        online: "آنلاین",
        navigation: "مسیرهای دسترسی",
        home: "رابط هوشمند",
        tasks: "وظایف",
        notes: "یادداشت‌ها",
        reminders: "یادآورها",
        profile: "پروفایل",
        settings: "تنظیمات",
        systemReady: "سیستم آماده است",

        coreActive: "هسته هوشمند فعال است",
        voiceTitle: "هوشمندی تو،<br>فرمان تو.",
        voiceDescription: "به ایجنت شخصی خود متصل شو. حرکت بعدی تو از اینجا شروع می‌شود.",
        tapToConnect: "برای اتصال ضربه بزن",
        listening: "در حال گوش دادن...",
        voiceHint: "ایجنت تو منتظر فرمان توست.",

        tasksSubtitle: "عملیات روزانه خود را مدیریت کن.",
        taskPlaceholder: "وظیفه جدید را وارد کن...",
        addTask: "افزودن وظیفه +",
        totalTasks: "کل وظایف",
        completedTasks: "انجام‌شده",

        remindersSubtitle: "هیچ زمان مهمی را از دست نده.",
        reminderPlaceholder: "عنوان یادآور...",
        addReminder: "ثبت یادآور",

        profileDescription: "فضای کاری شخصی تو.",

        language: "زبان",
        languageDescription: "زبان رابط کاربری را انتخاب کن.",
        theme: "ظاهر برنامه",
        themeDescription: "حالت نمایش برنامه را تغییر بده.",
        toggleTheme: "تغییر تم",

        backDashboard: "بازگشت به داشبورد",
        notesSubtitle: "افکار و ایده‌های خود را ثبت کن.",
        noteTitlePlaceholder: "عنوان یادداشت...",
        noteContentPlaceholder: "متن یادداشت...",
        saveNote: "ذخیره یادداشت +",
        savedNotes: "یادداشت‌های ذخیره‌شده",

        emptyNotes: "هنوز یادداشتی ثبت نشده است.",
        emptyTasks: "هنوز وظیفه‌ای ثبت نشده است.",
        emptyReminders: "هنوز یادآوری ثبت نشده است.",
        futureDate: "زمان یادآوری باید در آینده باشد.",
        delete: "حذف"
    },

    en: {
        online: "ONLINE",
        navigation: "NAVIGATION",
        home: "Neural Interface",
        tasks: "Tasks",
        notes: "Notes",
        reminders: "Reminders",
        profile: "Profile",
        settings: "Settings",
        systemReady: "SYSTEM READY",

        coreActive: "NEURAL CORE ACTIVE",
        voiceTitle: "Your Intelligence.<br>Your Command.",
        voiceDescription: "Connect with your personal AI agent. Your next move starts here.",
        tapToConnect: "TAP TO CONNECT",
        listening: "LISTENING...",
        voiceHint: "Your agent is waiting for your command.",

        tasksSubtitle: "Manage your daily operations.",
        taskPlaceholder: "Enter a new task...",
        addTask: "ADD TASK +",
        totalTasks: "TOTAL TASKS",
        completedTasks: "COMPLETED",

        remindersSubtitle: "Never miss an important moment.",
        reminderPlaceholder: "Reminder title...",
        addReminder: "CREATE REMINDER",

        profileDescription: "Your personal workspace.",

        language: "Language",
        languageDescription: "Choose your interface language.",
        theme: "Appearance",
        themeDescription: "Customize your interface.",
        toggleTheme: "TOGGLE THEME",

        backDashboard: "BACK TO DASHBOARD",
        notesSubtitle: "Capture your thoughts and ideas.",
        noteTitlePlaceholder: "Note title...",
        noteContentPlaceholder: "Write something...",
        saveNote: "SAVE NOTE +",
        savedNotes: "SAVED NOTES",

        emptyNotes: "No notes saved yet.",
        emptyTasks: "No tasks yet.",
        emptyReminders: "No reminders yet.",
        futureDate: "Reminder time must be in the future.",
        delete: "DELETE"
    }

};


// Global Language
function applyLanguage(language) {

    const selectedLanguage =
        translations[language] ? language : "fa";

    document.documentElement.lang = selectedLanguage;

    document.documentElement.dir =
        selectedLanguage === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        if (translations[selectedLanguage][key] !== undefined) {
            element.innerHTML = translations[selectedLanguage][key];
        }

    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.dataset.i18nPlaceholder;

        if (translations[selectedLanguage][key] !== undefined) {
            element.placeholder = translations[selectedLanguage][key];
        }

    });

    document.querySelectorAll("#languageSelect").forEach(select => {
        select.value = selectedLanguage;
    });

    localStorage.setItem("routiva-language", selectedLanguage);

    document.dispatchEvent(
        new CustomEvent("routiva:languageChanged", {
            detail: { language: selectedLanguage }
        })
    );

}


// Global Theme
function applyTheme(theme) {

    document.body.classList.toggle(
        "light-mode",
        theme === "light"
    );

    localStorage.setItem("routiva-theme", theme);

}


// Initialize App
document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        localStorage.getItem("routiva-language") || "fa";

    const savedTheme =
        localStorage.getItem("routiva-theme") || "dark";

    applyLanguage(savedLanguage);
    applyTheme(savedTheme);


    // Language Selector
    document.querySelectorAll("#languageSelect").forEach(select => {

        select.addEventListener("change", () => {
            applyLanguage(select.value);
        });

    });


    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const nextTheme =
                document.body.classList.contains("light-mode")
                    ? "dark"
                    : "light";

            applyTheme(nextTheme);

        });

    }


    // Hamburger Menu
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("menuOverlay");

    function openMenu() {

        sidebar.classList.add("open");
        overlay.classList.add("show");

        menuToggle.setAttribute("aria-expanded", "true");

    }

    function closeMenu() {

        sidebar.classList.remove("open");
        overlay.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

    }

    if (menuToggle) {
        menuToggle.addEventListener("click", openMenu);
    }

    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }


    // Internal Navigation
    const menuItems = document.querySelectorAll("[data-view]");

    const views = {
        voice: "voiceView",
        tasks: "tasksView",
        reminders: "remindersView",
        profile: "profileView",
        settings: "settingsView"
    };

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            const selectedView = item.dataset.view;

            Object.values(views).forEach(id => {

                document.getElementById(id)?.classList.remove("active");

            });

            document.getElementById(
                views[selectedView]
            )?.classList.add("active");

            menuItems.forEach(button => {
                button.classList.remove("active");
            });

            item.classList.add("active");

            closeMenu();

        });

    });


    // Keyboard Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

});
