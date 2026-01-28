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
var tilebuttons = document.getElementsByClassName("tilebutton");

var flowerimages = [];
var openimages = [];
var closedimages = [];

var flowerdata = [];
var opendata = [];
var closeddata = [];

function isDot(t){
  if (Math.floor(t / 10) == 0){
    return true;
  }
  else{
    return false;
  }
}

function isBam(t){
  if (Math.floor(t / 10) == 1){
    return true;
  }
  else{
    return false;
  }
}

function isChar(t){
  if (Math.floor(t / 10) == 2){
    return true;
  }
  else{
    return false;
  }
}

function isNumber(t){
  if (Math.floor(t / 10) <= 2){
    return true;
  }
  else{
    return false;
  }
}

function isWind(t){
  if ((Math.floor(t / 10) == 3) && (t % 10 < 4)){
    return true;
  }
  else{
    return false;
  }
}

function isDragon(t){
  if ((Math.floor(t / 10) == 3) && (t % 10 >= 4)){
    return true;
  }
  else{
    return false;
  }
}

function isHonor(t){
  if (Math.floor(t / 10) == 3){
    return true;
  }
  else{
    return false;
  }
}

function isFlower(t){
  if ((Math.floor(t / 10) == 4) || (Math.floor(t / 10) == 5)){
    return true;
  }
  else{
    return false;
  }
}

function isJoker(t){
  if (Math.floor(t / 10) >= 6){
    return true;
  }
  else{
    return false;
  }
}

function updatebuttons(){
	switch (mode){
    case HAND_MODE:
      if (closeddata.length == 13 - (opendata.length * 3)){
        for (const b of tilebuttons){
          b.style.opacity = 1;
        }
      }
      else if (closeddata.length == 14 - (opendata.length * 3)){
        for (const b of tilebuttons){
          b.style.opacity = 0.5;
        }
      }
      else{
        for (const b of tilebuttons){
          if (isFlower(Number(b.id))){
            b.style.opacity = 0.5;
          }
          else{
            b.style.opacity = 1;
          }
        }
      }
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

function initialize(){
  //initialize hand display
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
  
  //update tile buttons
  updatebuttons();
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

  //darken corresponding mode button
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
  
  //update tile buttons
  updatebuttons();
}

function backspace(){
  switch (mode){
    case HAND_MODE:
      if (closeddata.length > 0){
        closedimages[closeddata.length - 1].src = "graphics/tilespace.png";
        closeddata.pop();
      }
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
  updatebuttons();
}

function abandoncurrent(){
  switch (mode){
    case CHOW_MODE:
    case PUNG_MODE:
    case OPEN_QUAD_MODE:
    case CLOSED_QUAD_MODE:
      //abandon unfinished group
      break;
    default:
      break;
  }
}

function addChow(){
  abandoncurrent();
  if (mode == CHOW_MODE){
    changeMode(HAND_MODE);
  }
  else{
    changeMode(CHOW_MODE);
  }
}

function addPung(){
  abandoncurrent();
  if (mode == PUNG_MODE){
    changeMode(HAND_MODE);
  }
  else{
    changeMode(PUNG_MODE);
  }
}

function addOpenQuad(){
  abandoncurrent();
  if (mode == OPEN_QUAD_MODE){
    changeMode(HAND_MODE);
  }
  else{
    changeMode(OPEN_QUAD_MODE);
  }
}

function addClosedQuad(){
  abandoncurrent();
  if (mode == CLOSED_QUAD_MODE){
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
      if (document.getElementById(("0" + t).slice(-2)).style.opacity == 1){
        closedimages[closeddata.length].src = "graphics/" + ("0" + t).slice(-2) + ".png";
        closeddata.push(t);
      }
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
  updatebuttons();
}
