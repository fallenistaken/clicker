let clicks = localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0;
let grandma = localStorage.getItem('grandma') ? parseInt(localStorage.getItem('grandma')) : 10;
let grandmaAmount = localStorage.getItem('grandmaAmount') ? parseInt(localStorage.getItem('grandmaAmount')): 0
let hasAutoClicker = localStorage.getItem('hasAutoClicker') === 'true';
let achievementReached100 = localStorage.getItem('achievementReached100') === 'true';
let intervals = [];

const element = document.getElementById('clicks')
const click = document.getElementById('click')
const tripleclick = document.getElementById('tripleclick')
const a1 = document.getElementById('a1')
const a2 = document.getElementById('a2')
const a3 = document.getElementById('a3')
const doubleclick = document.getElementById('doubleclick')
const autoclick = document.getElementById('autoclick')
const clear = document.getElementById('clear')
const factoryname = document.getElementById('factoryname')

element.innerHTML = 'Clicks: ' + clicks;
a1.innerHTML = "Locked"
autoclick.innerHTML = "Clicks 1 click per second. Cost: " + grandma + " clicks per. Amount is " + grandmaAmount;

function updateClicks() {
    element.innerHTML = 'Clicks: ' + clicks;
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('grandma', grandma);
    localStorage.setItem('hasAutoClicker', hasAutoClicker);
    localStorage.setItem('grandmaAmount', grandmaAmount);
}

function startAutoClicker() {
    setInterval(function() {
        clicks += grandmaAmount;
        updateClicks();
        console.log("Clicks: " + clicks);
    }, 1000);
}


function updateMessage() {
    let input = document.getElementById("userInput").value;
     let outputDiv = document.getElementById("outputMessage");
     outputDiv.textContent = input;
     localStorage.setItem("factoryName", input);
}

window.onload = function() {
    var savedFactoryName = localStorage.getItem("factoryName");
    if (savedFactoryName) {
        document.getElementById("outputMessage").textContent = savedFactoryName;
        document.getElementById("userInput").value = savedFactoryName;
    }
    if (clicks >= 100) {
        document.getElementById("a1").innerHTML = "Starter Clicker (100 clicks)";
        document.getElementById("a1").style.color="green";
    }
    if (clicks >= 250 ) {
        document.getElementById("a2").innerHTML = "Novice Clicker (250 clicks)";
        document.getElementById("a2").style.color="green"; // Update achievement
    }
    if (clicks >= 500 ) {
        document.getElementById("a3").innerHTML = "Better Novice Clicker (500 clicks)";
        document.getElementById("a3").style.color="green"; // Update achievement
    }
}


click.onclick = function() {
    ++clicks;
    updateClicks();
    if (clicks >= 100) {
        document.getElementById("a1").innerHTML = "Starter Clicker (100 clicks)";
        document.getElementById("a1").style.color="green";
    }
    if (clicks >= 250 ) {
        document.getElementById("a2").innerHTML = "Novice Clicker (250 clicks)";
        document.getElementById("a2").style.color="green"; // Update achievement
    }
    if (clicks >= 500 ) {
        document.getElementById("a3").innerHTML = "Better Novice Clicker (500 clicks)";
        document.getElementById("a3").style.color="green"; // Update achievement
    }
}


// Double Click function
doubleclick.onclick = function() {
    if (clicks>=100) {
        console.log("bought double clicks")
        clicks=clicks-100
        updateClicks();
        click.onclick = function() {
            clicks=clicks+2;
            updateClicks();
        };
        
    }
    else {
        console.log("not enough clicks");
         element.innerHTML = "Not enough clicks";
    }
}

tripleclick.onclick = function() {
    if (clicks>=500) {
        console.log("bought triple clicks")
        clicks=clicks-500
        updateClicks();
        click.onclick = function() {
            clicks=clicks+3;
            updateClicks();
        };
        
    }
    else {
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
        autoclick.innerHTML = "Clicks 1 click per second. Cost: " + grandma + " clicks per. Amount is " + grandmaAmount;
        startAutoClicker();
    } else {
        element.innerHTML = "Not enough clicks";
    }
};
   
if (hasAutoClicker) {
    startAutoClicker();
}

clear.onclick = function() {
    if (confirm("Are you sure you want to clear your game?") == true) {
        localStorage.clear()
        clicks = 0;
        grandma = 10;
        hasAutoClicker = false;
        element.innerHTML = "Clicks: 0";
        autoclick.innerHTML = "Clicks 1 click per second. Cost: 10 clicks per";

        click.onclick = function() {
            clicks++;
            updateClicks();
        }
        intervals.forEach(clearInterval);
     intervals = []; // Reset the intervals array
    }
    else {
        element.innerHTML = "Clearing aborted";
    }
   
}
