const schoolList = [
  {name: "Stanford", status: "Accepted 1/31", details: "AHHHHHHHHH!! Got an email telling me to check the portal. Nothing else to say except that I am stoked -- (Most likely to attend)"},
  {name: "Berkeley", status: "Accepted 2/13", details: ""},
  {name: "University of Wisconsin -- Madison", status: "Accepted 1/23", details: "Email confirming that I was accepted. Will update with offer information."},
  {name: "Dartmouth", status: "Accepted 1/28", details: "Email telling me to check the portal."},
  {name: "Northwestern", status: "Accepted 2/3", details: "Got informed that I am being recommended to the Graduate Office"},
  {name: "UCSD", status: "Accepted 2/7", details: "I got the information that I am being recommended to the Graduate Office."},
  {name: "Boston University", status: "Accepted 2/7", details: ""},
  {name: "Boston College", status: "Accepted 2/7", details: ""},
  {name: "University of Maryland", status: "Accepted", details: ""},
  {name: "UCSB", status: "Rejected", details: ""},
  {name: "CalTech", status: "Rejected", details: ""},
  {name: "Columbia", status: "Rejected", details: ""},
  {name: "Boulder", status: "Rejected", details: ""},
  {name: "Yale", status: "Rejected", details: ""},
  {name: "University of Washington - Seattle", status: "Rejected", details: ""},
  {name: "UMich", status: "Rejected 2/11", details: ""},
  {name: "MIT", status: "Rejected 2/12", details: ""},
  {name: "UChicago", status: "Rejected 1/28", details: ""},
  {name: "Princeton", status: "Rejected 2/10", details: ""},
  {name: "University of Iowa", status: "Withdrawn", details: ""},
  {name: "Lehigh", status: "Withdrawn", details: ""},
  {name: "UCR", status: "Withdrawn", details: ""},
]

const yellow = "#FFEF65";
const red = "#FF6565";
const green = "#90FF6C";
const lightblue = "#8AD7F4";
const orange = "#FFA500";

function addRows() {
  for (let i = 0; i < schoolList.length; i++) {
    // Cell 1: Name
    const cell1 = document.createElement("td");
    const node1 = document.createTextNode(schoolList[i]["name"]);
    cell1.style.fontWeight = "bold";
    cell1.appendChild(node1);

    // Cell 2: Status
    const cell2 = document.createElement("td");
    const node2Text = schoolList[i]["status"];
    const node2 = document.createTextNode(node2Text);

    let node2BgColor;
    if (node2Text.includes("Interview") || node2Text.includes("Recommended")) {
      node2BgColor = yellow;
    } else if (node2Text.includes("Accepted")) {
      node2BgColor = green;
    } else if (node2Text.includes("Rejected")) {
      node2BgColor = red;
    } else if (node2Text.includes("Withdrawn")) {
      node2BgColor = orange;
    } else {
      node2BgColor = lightblue;
    }

    cell2.style.backgroundColor = node2BgColor;
    cell2.appendChild(node2);

    // Cell 3: Details
    const cell3 = document.createElement("td");
    const node3 = document.createTextNode(schoolList[i]["details"]);
    cell3.appendChild(node3);

    // Create Row
    const row = document.createElement("tr");
    row.setAttribute("id", `tr${i}`);
    row.append(cell1);
    row.append(cell2);
    row.append(cell3);

    const tableElement = document.getElementById("table");
    tableElement.append(row);
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  addRows()
});



