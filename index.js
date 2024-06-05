let clicks = localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0;
let grandma = localStorage.getItem('grandma') ? parseInt(localStorage.getItem('grandma')) : 10;
let grandmaAmount = localStorage.getItem('grandmaAmount') ? parseInt(localStorage.getItem('grandmaAmount')) : 0;
let kyle = localStorage.getItem('kyle') ? parseInt(localStorage.getItem('kyle')) : 25;
let kyleAmount = localStorage.getItem('kyleAmount') ? parseInt(localStorage.getItem('kyleAmount')) : 0;
let hasAutoClicker = localStorage.getItem('hasAutoClicker') === 'true';
let hasKyleClicker = localStorage.getItem('hasKyleClicker') === 'true';
let achievementReached100 = localStorage.getItem('achievementReached100') === 'true';
let autoClickerInterval = null;
let kyleClickerInterval = null;

const element = document.getElementById('clicks');
const click = document.getElementById('click');
const tripleclick = document.getElementById('tripleclick');
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const doubleclick = document.getElementById('doubleclick');
const kyleclick = document.getElementById('kyleclick');
const autoclick = document.getElementById('autoclick');
const clear = document.getElementById('clear');
const factoryname = document.getElementById('factoryname');

element.innerHTML = 'Clicks: ' + formatNumberWithCommas(clicks);
a1.innerHTML = "Locked";
autoclick.innerHTML = "Grandpa. Clicks 1 click per second. Cost: " + grandma + " clicks per. Amount is " + grandmaAmount;
kyleclick.innerHTML = "Kyle. Clicks 2 clicks per second. Cost: " + kyle + " clicks per. Amount is " + kyleAmount;

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateClicks() {
    element.innerHTML = 'Clicks: ' + formatNumberWithCommas(clicks);
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('grandma', grandma);
    localStorage.setItem('hasAutoClicker', hasAutoClicker);
    localStorage.setItem('grandmaAmount', grandmaAmount);
    localStorage.setItem('kyle', kyle);
    localStorage.setItem('kyleAmount', kyleAmount);
    localStorage.setItem('hasKyleClicker', hasKyleClicker);
}

function startAutoClicker() {
    if (autoClickerInterval) return; // Prevent multiple intervals
    autoClickerInterval = setInterval(function() {
        clicks += grandmaAmount;
        updateClicks();
        console.log("Clicks: " + clicks);
    }, 1000);
}

function startKyleClicker() {
    if (kyleClickerInterval) return; // Prevent multiple intervals
    kyleClickerInterval = setInterval(function() {
        clicks += kyleAmount * 2;
        updateClicks();
        console.log("Clicks: " + clicks);
    }, 1000);
}

function updateMessage() {
    let input = document.getElementById("userInput").value;
    localStorage.setItem("factoryName", input);
    displayFactoryName(input);
}

function displayFactoryName(name) {
    let outputDiv = document.getElementById("outputMessage");
    outputDiv.textContent = name;
}

window.onload = function() {
    var savedFactoryName = localStorage.getItem("factoryName");
    if (savedFactoryName) {
        document.getElementById("userInput").value = savedFactoryName;
        displayFactoryName(savedFactoryName);
    }
    if (clicks >= 100) {
        document.getElementById("a1").innerHTML = "Starter Clicker (100 clicks)";
        document.getElementById("a1").style.color = "green";
    }
    if (clicks >= 250) {
        document.getElementById("a2").innerHTML = "Novice Clicker (250 clicks)";
        document.getElementById("a2").style.color = "green"; // Update achievement
    }
    if (clicks >= 500) {
        document.getElementById("a3").innerHTML = "Better Novice Clicker (500 clicks)";
        document.getElementById("a3").style.color = "green"; // Update achievement
    }
    if (hasAutoClicker) {
        startAutoClicker();
    }
    if (hasKyleClicker) {
        startKyleClicker();
    }
}

click.onclick = function() {
    clicks++;
    updateClicks();
    if (clicks >= 100) {
        document.getElementById("a1").innerHTML = "Starter Clicker (100 clicks)";
        document.getElementById("a1").style.color = "green";
    }
    if (clicks >= 250) {
        document.getElementById("a2").innerHTML = "Novice Clicker (250 clicks)";
        document.getElementById("a2").style.color = "green"; // Update achievement
    }
    if (clicks >= 500) {
        document.getElementById("a3").innerHTML = "Better Novice Clicker (500 clicks)";
        document.getElementById("a3").style.color = "green"; // Update achievement
    }
}

// Double Click function
doubleclick.onclick = function() {
    if (clicks >= 100) {
        console.log("bought double clicks");
        clicks -= 100;
        updateClicks();
        click.onclick = function() {
            clicks += 2;
            updateClicks();
        };
    } else {
        console.log("not enough clicks");
        element.innerHTML = "Not enough clicks";
    }
}

tripleclick.onclick = function() {
    if (clicks >= 500) {
        console.log("bought triple clicks");
        clicks -= 500;
        updateClicks();
        click.onclick = function() {
            clicks += 3;
            updateClicks();
        };
    } else {
        console.log("not enough clicks");
        element.innerHTML = "Not enough clicks";
    }
}

// Autoclick
autoclick.onclick = function() {
    if (clicks >= grandma) {
        console.log("bought auto clicker");
        clicks -= grandma;
        hasAutoClicker = true;
        grandma++;
        grandmaAmount++;
        updateClicks();
        autoclick.innerHTML = "Grandpa. Clicks 1 click per second. Cost: " + grandma + " clicks per. Amount is " + grandmaAmount;
        startAutoClicker();
    } else {
        element.innerHTML = "Not enough clicks";
    }
};

kyleclick.onclick = function() {
    if (clicks >= kyle) {
        console.log("bought kyle clicker");
        hasKyleClicker = true;
        clicks -= kyle;
        kyle++;
        kyle++;
        kyleAmount++;
        updateClicks();
        kyleclick.innerHTML = "Kyle. Clicks 2 clicks per second. Cost: " + kyle + " clicks per. Amount is " + kyleAmount;
        startKyleClicker();
    } else {
        element.innerHTML = "Not enough clicks";
    }
};

clear.onclick = function() {
    if (confirm("Are you sure you want to clear your game?") == true) {
        localStorage.clear();
        clicks = 0;
        grandma = 10;
        grandmaAmount = 0;
        kyle = 25;
        kyleAmount = 0;
        hasAutoClicker = false;
        hasKyleClicker = false;
        element.innerHTML = "Clicks: " + formatNumberWithCommas(0);
        autoclick.innerHTML = "Grandpa. Clicks 1 click per second. Cost: 10 clicks per. Amount is 0";
        kyleclick.innerHTML = "Kyle. Clicks 2 clicks per second. Cost: 25 clicks per. Amount is 0";

        click.onclick = function() {
            clicks++;
            updateClicks();
        };

        if (autoClickerInterval) {
            clearInterval(autoClickerInterval);
            autoClickerInterval = null; // Reset the interval
        }
        if (kyleClickerInterval) {
            clearInterval(kyleClickerInterval);
            kyleClickerInterval = null; // Reset the interval
        }
    } else {
        element.innerHTML = "Clearing aborted";
    }
}
