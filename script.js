const HAND_MODE = 0;
const CHOW_MODE = 1;
const PUNG_MODE = 2;
const OPEN_QUAD_MODE = 3;
const CLOSED_QUAD_MODE = 4;
const FLOWER_MODE = 5;

var mode = HAND_MODE;

var flowerhand = document.getElementById("flowerhand");
var openhand = document.getElementById("openhand");
var closedhand = document.getElementById("closedhand");

var chowbutton = document.getElementById("chowbutton");
var pungbutton = document.getElementById("pungbutton");
var openquadbutton = document.getElementById("openquadbutton");
var closedquadbutton = document.getElementById("closedquadbutton");
var flowerbutton = document.getElementById("flowerbutton");

var flowerimages = [];
var openimages = [];
var closedimages = [];

var flowerdata = [];
var opendata = [];
var closeddata = [];

function initialize(){
  for (let i = 0; i < 14; i++){
    var tile = document.createElement("img");
    tile.src = "graphics/tilespace.png";
    tile.style.height = "26px";
    tile.style.width = "20px";
    tile.style.margin = "0";
    if (i == 13){
      tile.style.marginLeft = "5px";
    }
    closedhand.appendChild(tile);
    closedimages.push(tile);
  }
}

function changeMode(m)
{
  //clear all buttons
  chowbutton.style.background = "white";
  pungbutton.style.background = "white";
  openquadbutton.style.background = "white";
  closedquadbutton.style.background = "white";
  flowerbutton.style.background = "white";
  
  //change mode
  mode = m;

  //darken corresponding button
  switch(m){
    case CHOW_MODE:
      chowbutton.style.background = "lightgrey";
      break;
    case PUNG_MODE:
      pungbutton.style.background = "lightgrey";
      break;
    case OPEN_QUAD_MODE:
      openquadbutton.style.background = "lightgrey";
      break;
    case CLOSED_QUAD_MODE:
      closedquadbutton.style.background = "lightgrey";
      break;
    case FLOWER_MODE:
      flowerbutton.style.background = "lightgrey";
      break;
    default:
      break;
  }
}

function addChow(){
  if (mode == CHOW_MODE){
    //TODO: remove unfinished chow
    changeMode(HAND_MODE);
  }
  else{
    changeMode(CHOW_MODE);
  }
}

function addPung(){
  if (mode == PUNG_MODE){
    //TODO: remove unfinished pung
    changeMode(HAND_MODE);
  }
  else{
    changeMode(PUNG_MODE);
  }
}

function addOpenQuad(){
  if (mode == OPEN_QUAD_MODE){
    //TODO: remove unfinished quad
    changeMode(HAND_MODE);
  }
  else{
    changeMode(OPEN_QUAD_MODE);
  }
}

function addClosedQuad(){
  if (mode == CLOSED_QUAD_MODE){
    //TODO: remove unfinished quad
    changeMode(HAND_MODE);
  }
  else{
    changeMode(CLOSED_QUAD_MODE);
  }
}

function addFlowers(){
  if (mode == FLOWER_MODE){
    changeMode(HAND_MODE);
  }
  else{
    changeMode(FLOWER_MODE);
  }
}

function sendTile(t){
  switch (mode){
    case HAND_MODE:
      closedimages[closeddata.length].src = "graphics/" + ("0" + t).slice(-2) + ".png";
      closeddata.push(t);
      break;
    case CHOW_MODE:
      break;
    case PUNG_MODE:
      break;
    case OPEN_QUAD_MODE:
      break;
    case CLOSED_QUAD_MODE:
      break;
    case FLOWER_MODE:
      break;
    default:
      break;
  }
}
