const headings = document.getElementsByTagName("h2");
const leftNav = document.getElementById("left-nav");
const inlineNav = document.createElement("nav");
inlineNav.id = "inline-nav";
headings[0].parentNode.insertBefore(inlineNav, headings[0]);
const anchors = new Set();
const bigBlockAtEnd = document.createElement("div");
bigBlockAtEnd.id = "big-block";
bigBlockAtEnd.innerHTML = "&nbsp;"
document.getElementsByTagName("main")[0].appendChild(bigBlockAtEnd);
const ul = document.createElement("ul");
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
