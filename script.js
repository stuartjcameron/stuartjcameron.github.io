const headings = document.getElementsByTagName("h2");
const nav = document.getElementsByTagName("nav")[0];
const anchors = new Set();
const bigBlockAtEnd = document.createElement("div");
bigBlockAtEnd.id = "big-block";
bigBlockAtEnd.innerHTML = "&nbsp;"
document.getElementById("main").appendChild(bigBlockAtEnd);
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
const ul = document.createElement("ul");
nav.appendChild(ul);
for (const heading of headings) {
    const id_ = makeAnchor(heading.textContent);
    heading.id = id_;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerHTML = heading.innerHTML;
    a.href = "#" + id_;
    li.appendChild(a);
    ul.appendChild(li);
}
