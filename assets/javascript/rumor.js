const schoolList = [
  {name: "MIT", status: "Interview 1/10", details: "Interview went okay. Awaiting results."},
  {name: "Stanford", status: "Submitted", details: ""},
  {name: "UCSB", status: "Submitted", details: ""},
  {name: "UCSD", status: "Submitted", details: ""},
  {name: "CalTech", status: "Submitted", details: ""},
  {name: "Princeton", status: "Submitted", details: ""},
  {name: "Berkeley", status: "Submitted", details: ""},
  {name: "UChicago", status: "Submitted", details: ""},
  {name: "Columbia", status: "Submitted", details: ""},
  {name: "Boulder", status: "Submitted", details: ""},
  {name: "Yale", status: "Submitted", details: ""},
  {name: "UMich", status: "Submitted", details: ""},
  {name: "Dartmouth", status: "Invitation to Interview 1/14", details: ""},
  {name: "University of Iowa", status: "Submitted", details: ""},
  {name: "Northwestern", status: "Submitted", details: ""},
  {name: "Lehigh", status: "Submitted", details: ""},
  {name: "University of Maryland", status: "Submitted", details: ""},
  {name: "University of Wisconsin", status: "Submitted", details: ""},
  {name: "University of Washington - Seattle", status: "Submitted", details: ""},
  {name: "Boston University", status: "Submitted", details: ""},
  {name: "Boston College", status: "Submitted", details: ""},
  {name: "UCR", status: "Submitted", details: ""},
]

const yellow = "#FFEF65";
const red = "#FF6565";
const green = "#90FF6C";
const lightblue = "#8AD7F4";

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
    if (node2Text.includes("Interview")) {
      node2BgColor = yellow;
    } else if (node2Text.includes("Accepted")) {
      node2BgColor = green;
    } else if (node2Text.includes("Rejected")) {
      node2BgColor = red;
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



