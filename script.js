const headings = document.getElementsByTagName("h2");
const leftNav = document.getElementById("left-nav");
const topLink = document.getElementById("top-link");
const inlineNav = document.createElement("nav");
inlineNav.id = "inline-nav";
headings[0].parentNode.insertBefore(inlineNav, headings[0]);
const anchors = new Set();
const bigBlockAtEnd = document.createElement("div");
bigBlockAtEnd.id = "big-block";
bigBlockAtEnd.innerHTML = "&nbsp;"
const main = document.getElementsByTagName("main")[0];
main.appendChild(bigBlockAtEnd);
const ul = document.createElement("ul");
onResize();
addEventListener("resize", onResize);

let caughtScroll = false;
addEventListener("scroll", onScroll);

function onResize() {
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
    if (!caughtScroll) {
        requestAnimationFrame(() => {
            updateLeftNav();
            caughtScroll = false;
        });
    } 
    caughtScroll = true;
}

function updateLeftNav() {
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


leftNav.appendChild(ul);

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

let first = true;
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
    first = false;
}
const leftNavItems = [...document.querySelectorAll("#left-nav li")];
