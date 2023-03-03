import { Officer, Sock, Location_history } from "./interfaces";


//builds a sock for the preview page
export function buildSock(sock: Sock, count: number) {
  //new sock div
  const socksDiv = document.createElement("div");
  socksDiv.classList.add("dataPreview");
  socksDiv.setAttribute("id", "preview" + count);
  //model
  const name = document.createElement("h3");
  name.setAttribute("id", sock.model);
  name.innerHTML = sock.model;
  //quantity
  const quantity = document.createElement("p");
  quantity.innerHTML = "Quantity: " + sock.quantity
  //size
  const size = document.createElement("p");
  size.innerHTML = "Size: " + sock.size;
  //location data
  const location = document.createElement("ul");
  location.innerHTML = "Location Data: "
  const lat = document.createElement("li");
  lat.innerHTML = "lat: " + sock.lat;
  const lon = document.createElement("li");
  lon.innerHTML = "lon: " + sock.lon;
  const base = document.createElement("li");
  base.innerHTML = "Current Base: " + sock.base;
  const city = document.createElement("li");
  city.innerHTML = "Nearest City: " + sock.city;
  location.appendChild(lat);
  location.appendChild(lon);
  location.appendChild(base);
  location.appendChild(city);
  //manufacturing date
  const manufactured = document.createElement("p");
  manufactured.innerHTML = "Manufactured: " + sock.manufactured;
  //officer in charge
  const officer = document.createElement("p");
  officer.innerHTML = "Officer in charge: " + sock.officer;
  //sock id
  //officer in charge
  const id = document.createElement("p");
  id.innerHTML = "Sock ID: " + sock.id;

  //appending
  socksDiv.appendChild(name);
  socksDiv.appendChild(quantity);
  socksDiv.appendChild(size);
  socksDiv.appendChild(location);
  socksDiv.appendChild(manufactured);
  socksDiv.appendChild(officer);
  document.getElementById("dataPreviewList")!.appendChild(socksDiv);
}

//builds an officer for the preview page
export function buildOfficer(officer: Officer, count: number){
  //new officer div
  const officerDiv = document.createElement("div");
  officerDiv.classList.add("dataPreview");
  officerDiv.setAttribute("id", "preview" + count);
  //officer name
  const name = document.createElement("h3");
  name.setAttribute("id", officer.name);
  name.innerHTML = "Name: " + officer.name;
  //officer id
  const id = document.createElement("p");
  id.innerHTML = "ID: " + officer.id;
  //officer email
  const email = document.createElement("p");
  email.innerHTML = "Email: " + officer.email;
  //officer phone
  const phone = document.createElement("p");
  phone.innerHTML = "Phone: " + officer.phone

  //appending
  officerDiv.appendChild(name);
  officerDiv.appendChild(id);
  
  officerDiv.appendChild(email);
  officerDiv.appendChild(phone);
  document.getElementById("dataPreviewList")!.appendChild(officerDiv);
}

//builds a history for the preview page
export function buildHistory(location_history: Location_history, count: number){
  //new history div
  const historyDiv = document.createElement("div");
  historyDiv.classList.add("dataPreview");
  historyDiv.setAttribute("id", "preview"+count);
  //history arrived/departed
  const arrived_departed = document.createElement("h3");
  arrived_departed.setAttribute("id", location_history.arrived_departed);
  arrived_departed.innerHTML = "Status: " + location_history.arrived_departed;
  //history date
  const date = document.createElement("p");
  date.innerHTML = "Date: " + location_history.date;
  //history location
  const location = document.createElement("p");
  location.innerHTML = "Location: " + location_history.to_location;
  //history sock id
  const id = document.createElement("p");
  id.innerHTML = "Related sock id: " + location_history.socks_id.toString();

  //appending
  historyDiv.appendChild(arrived_departed);
  historyDiv.appendChild(date);
  historyDiv.appendChild(location);
  historyDiv.appendChild(id);
  document.getElementById("dataPreviewList")!.appendChild(historyDiv);
}