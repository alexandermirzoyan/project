var socket = io();
socket.on("statistics", printStats);

function printStats(data) {
  document.getElementById('grass-count').innerText = data.grassCount;
  document.getElementById('grass-eater-count').innerText = data.grassEaterCount;
  document.getElementById('person-count').innerText = data.personCount;
  document.getElementById('gishatich-count').innerText = data.gishatichCount;
  document.getElementById('dog-count').innerText = data.dogCount;
}