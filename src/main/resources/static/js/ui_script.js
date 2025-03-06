const coverHeader = document.querySelector("#cover");
const menuCards = document.querySelectorAll(".menu-card");
const exit = document.querySelector("#exit");
const newGame = document.querySelector("#open-new-game");
const options = document.querySelector("#open-options");
const soundfx = document.querySelector("#sound-fx");
const music = document.querySelector("#music");

let activeMenuCard = "menu";

const toggleCover = () => {
    coverHeader.classList.toggle("active-cover");
};

const closeMenu = () => {
    menuCards.forEach((menuCard) => {
        menuCard.classList.remove("active-menu");
    });
};

const toggleMenu = () => {
    closeMenu();

    menuCards.forEach((menuCard) => {
        if (menuCard.id === activeMenuCard) {
            menuCard.classList.add("active-menu");
        }
    });
};

coverHeader.addEventListener("click", () => {
    toggleCover();
    toggleMenu();
});

exit.addEventListener("click", () => {
    closeMenu();
    toggleCover();
});

const back = () => {
    activeMenuCard = "menu";
    toggleMenu();
};

newGame.addEventListener("click", () => {
    activeMenuCard = "new-game";
    toggleMenu();
});

options.addEventListener("click", () => {
    activeMenuCard = "options";
    toggleMenu();
});

let settings = {
    sound: "on",
    music: "on",
};

const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
};

soundfx.addEventListener("click", () => {
    if (settings.sound === "on") {
        settings.sound = "off";
    } else {
        settings.sound = "on";
    }
    saveSettings();
    soundfx.innerHTML = settings.sound;
});

music.addEventListener("click", () => {
    if (settings.music === "on") {
        settings.music = "off";
    } else {
        settings.music = "on";
    }
    saveSettings();
    music.innerHTML = settings.music;
});

const defaultSettings = () => {
    const savedSettings = localStorage.getItem("settings");
    if (!savedSettings) {
        saveSettings();
    } else {
        const parsedSettings = JSON.parse(savedSettings);
        settings.sound = parsedSettings.sound;
        settings.music = parsedSettings.music;

        soundfx.innerText = settings.sound;
        music.innerText = settings.music;
        saveSettings();
    }
};

window.onload = () => {
    defaultSettings();
};
