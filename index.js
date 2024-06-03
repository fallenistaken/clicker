let clicks = localStorage.getItem('clicks') ? parseInt(localStorage.getItem('clicks')) : 0;
let grandma = localStorage.getItem('grandma') ? parseInt(localStorage.getItem('grandma')) : 10;
let hasAutoClicker = localStorage.getItem('hasAutoClicker') === 'true';
let intervals = [];

const element = document.getElementById('clicks')
const click = document.getElementById('click')
const doubleclick = document.getElementById('doubleclick')
const autoclick = document.getElementById('autoclick')
const clear = document.getElementById('clear')

element.innerHTML = 'Clicks: ' + clicks;
autoclick.innerHTML = "Clicks 1 click per second. Cost: " + grandma + " clicks per";

function updateClicks() {
    element.innerHTML = 'Clicks: ' + clicks;
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('grandma', grandma);
    localStorage.setItem('hasAutoClicker', hasAutoClicker);
}

function startAutoClicker() {
    setInterval(function() {
        clicks += 1;
        updateClicks();
        console.log("Clicks: " + clicks);
    }, 1000);
}

click.onclick = function() {
    ++clicks
    updateClicks();
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


// Autoclick
autoclick.onclick = function() {
    if (clicks >= grandma) {
        console.log("bought auto clicker");
        clicks -= grandma;
        hasAutoClicker = true;
        grandma++;
        updateClicks();
        autoclick.innerHTML = "Clicks 1 click per second. Cost: " + grandma + " clicks per";
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