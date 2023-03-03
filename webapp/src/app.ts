import { buildSock, buildOfficer, buildHistory } from "./buildFunctions";
import { Sock, Officer, Location_history } from "./interfaces";
let mode = "create"
let table;
//assign onClicks
async function loadWebsite() {
  let socksButton = document.getElementById("socksButton") as HTMLButtonElement;
  socksButton!.onclick = loadSocks;
  let officersButton = document.getElementById("officersButton") as HTMLButtonElement;
  officersButton!.onclick = loadOfficers;
  let historyButton = document.getElementById("historyButton") as HTMLButtonElement;
  historyButton!.onclick = loadHistory;
  let create = document.getElementById("create") as HTMLInputElement;
  create.onclick = () => { mode = "create" };
  let read = document.getElementById("read") as HTMLInputElement;
  read.onclick = () => { mode = "read" };
  let update = document.getElementById("update") as HTMLInputElement;
  update.onclick = () => { mode = "update" };
  let deletes = document.getElementById("delete") as HTMLInputElement;
  deletes.onclick = () => { mode = "delete" };
  let execute = document.getElementById("executeButton") as HTMLButtonElement;
  execute!.onclick = executeSQL;
}

//loads all socks from database
async function loadSocks() {
  let parentDiv = document.getElementById("dataPreviewList");
  parentDiv!.innerHTML = "";
  const socksToDisplay = await fetch(`http://localhost:3000/socks`);
  const socks: Sock[] = await socksToDisplay.json();
  for (let sock of socks) {
    const count = socks.indexOf(sock);
    buildSock(sock, count);
  }
  table = "socks";
}

//loads all officers from database
async function loadOfficers() {
  let parentDiv = document.getElementById("dataPreviewList");
  parentDiv!.innerHTML = "";
  const officersToDisplay = await fetch(`http://localhost:3000/officers`);
  const officers: Officer[] = await officersToDisplay.json();
  for (let officer of officers) {
    const count = officers.indexOf(officer);
    buildOfficer(officer, count);
  }
  table = "officers";
}

//loads all histories from database
async function loadHistory() {
  let parentDiv = document.getElementById("dataPreviewList");
  parentDiv!.innerHTML = "";
  const historiesToDisplay = await fetch(`http://localhost:3000/location_history`);
  const histories: Location_history[] = await historiesToDisplay.json();
  for (let history of histories) {
    const count = histories.indexOf(history);
    buildHistory(history, count);
  }
  table = "histories";
}

async function executeSQL() {
  const inputWindow = document.getElementById("commandInput")! as HTMLButtonElement;
  const toExecute = inputWindow.value;
  if (mode == "create"){
    const response = await fetch(`http://localhost:3000/create?sql=${toExecute}&table=${table}`);
    console.log(response);
    if (table == "socks") loadSocks();
    if (table == "officers") loadOfficers();
    if (table == "histories") loadHistory();
  }
  if (mode == "read") {
    const response = await fetch(`http://localhost:3000/read?sql=${toExecute}&table=${table}`);
    let parentDiv = document.getElementById("dataPreviewList");
    parentDiv!.innerHTML = "";
    if (table == "socks") {
      const result: Sock[] = await response.json();
      for (let sock of result) {
        const count = result.indexOf(sock);
        buildSock(sock, count);
      }
    }
    if (table == "officers") {
      const result: Officer[] = await response.json();
      for (let officer of result) {
        const count = result.indexOf(officer);
        buildOfficer(officer, count);
      }
    }
    if (table == "histories") {
      const result: Location_history[] = await response.json();
      for (let history of result) {
        const count = result.indexOf(history);
        buildHistory(history, count);
      }
    }
  }
  if (mode == "update"){
    const response = await fetch(`http://localhost:3000/update?sql=${toExecute}&table=${table}`);
    console.log(response);
    if (table == "socks") loadSocks();
    if (table == "officers") loadOfficers();
    if (table == "histories") loadHistory();
  }
  if (mode == "delete"){
    const response = await fetch(`http://localhost:3000/delete?sql=${toExecute}&table=${table}`);
    console.log(response);
    if (table == "socks") loadSocks();
    if (table == "officers") loadOfficers();
    if (table == "histories") loadHistory();
  }
}

// start website
loadWebsite()
