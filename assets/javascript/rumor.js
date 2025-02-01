const schoolList = [
  {name: "Stanford", status: "Accepted 1/31", details: "AHHHHHHHHH!! Got an email telling me to check the portal. Nothing else to say except that I am stoked -- (Most likely to attend)"},  
  {name: "University of Wisconsin -- Madison", status: "Accepted 1/23", details: "Email confirming that I was accepted. Will update with offer information."},  
  {name: "Dartmouth", status: "Accepted 1/28", details: "Email telling me to check the portal."},  
  {name: "Northwestern", status: "Recommended To Graduate Office 1/22", details: "Got informed that I am being recommended to the Graduate Office"},
  {name: "UCSD", status: "Recommended to Graduate Office 1/19", details: "I got the information that I am being recommended to the Graduate Office."},  
  {name: "MIT", status: "Interview 1/10", details: "Interview went okay. Awaiting results."},
  {name: "UCSB", status: "Submitted", details: ""},
  {name: "CalTech", status: "Submitted", details: ""},
  {name: "Princeton", status: "Submitted", details: ""},
  {name: "Berkeley", status: "Submitted", details: ""},
  {name: "UChicago", status: "Submitted", details: ""},
  {name: "Columbia", status: "Submitted", details: ""},
  {name: "Boulder", status: "Submitted", details: ""},
  {name: "Yale", status: "Submitted", details: ""},
  {name: "UMich", status: "Submitted", details: ""},
  {name: "University of Iowa", status: "Submitted", details: ""},
  {name: "University of Maryland", status: "Submitted", details: ""},
  {name: "University of Washington - Seattle", status: "Submitted", details: ""},
  {name: "Boston University", status: "Submitted", details: ""},
  {name: "Boston College", status: "Submitted", details: ""},
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



