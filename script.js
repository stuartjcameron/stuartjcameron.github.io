const headings = document.getElementsByTagName("h2");
const leftNav = document.getElementById("left-nav");
const topLink = document.getElementById("top-link");
const main = document.getElementsByTagName("main")[0];

/* Add empty block at end so it shows the last section heading towards top of screen */
const bigBlockAtEnd = document.createElement("div");
bigBlockAtEnd.id = "big-block";
bigBlockAtEnd.innerHTML = "&nbsp;"
main.appendChild(bigBlockAtEnd);

/* Create inline nav for small screens */
const inlineNav = document.createElement("nav");
inlineNav.id = "inline-nav";
headings[0].parentNode.insertBefore(inlineNav, headings[0]);

/* Add a link for each section heading to both the left nav and the inline nav */
const anchors = new Set();
const ul = document.createElement("ul");
leftNav.appendChild(ul);
let first = true;
const leftNavItems = [];
for (const heading of headings) {
    const id_ = makeAnchor(heading.textContent);
    heading.id = id_;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerHTML = heading.innerHTML;
    a.href = "#" + id_;
    li.appendChild(a);
    ul.appendChild(li);
    if (!first) {
        inlineNav.appendChild(document.createTextNode(" | "));
    }
    inlineNav.appendChild(a.cloneNode(true));
    leftNavItems.push(li);
    first = false;
}

/* Update everything according to screen size and scroll position */
updateLeftNav();
onResize();

/* Add listeners for scroll and resize */
addEventListener("resize", onResize);
let caughtScroll = false;
addEventListener("scroll", onScroll);

function onResize() {
    //--- When user resizes screen, position the left nav correctly
    const displayMode = {"0px": "narrow", "1px": "medium", "2px": "wide"}[getComputedStyle(document.getElementById("display-mode-indicator")).width];
    if (displayMode === "wide") {
        const leftPos = Math.max(0, main.getBoundingClientRect().left - leftNav.offsetWidth) + "px";
        leftNav.style.left = leftPos;
        topLink.style.left = leftPos;
    } else {
        leftNav.style.left = "";
        topLink.style.left = "";
    }
}

function onScroll() {
    //--- Update the left nav when scrolling 
    if (!caughtScroll) {
        requestAnimationFrame(() => {
            updateLeftNav();
            caughtScroll = false;
        });
        caughtScroll = true;
    } 
}

function updateLeftNav() {
    //--- Show the current section heading as selected in the left nav 
    const y = window.scrollY;
    const nextSectionNumber = [...headings].findIndex(h => y < h.offsetTop - parseInt(getComputedStyle(h).marginTop));
    const currentSectionNumber = (nextSectionNumber === - 1 ? [...headings].length : nextSectionNumber) - 1;
    for (const li of leftNavItems) {
        li.classList.remove("selected");
    }
    if (currentSectionNumber !== -1) {    
        leftNavItems[currentSectionNumber].classList.add("selected");
    }
}

function makeAnchor(s) {
    //--- Turn any text into a usable and unique id / anchor
    const anchor = s.toLowerCase().replaceAll(" ", "-");
    if (anchors.has(anchor)) {
        let i = 0;
        while (anchors.has(anchor + i)) {
            i++;
        }
        anchor += i;
    }
    anchors.add(anchor);
    return anchor;
}
