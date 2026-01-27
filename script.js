const HAND_MODE = 0;
const CHOW_MODE = 1;
const PUNG_MODE = 2;
const OPEN_QUAD_MODE = 3;
const CLOSED_QUAD_MODE = 4;
const FLOWER_MODE = 5;

var mode = HAND_MODE;

var flowerhand = document.getElementById("flowerdhand");
var openhand = document.getElementById("openhand");
var closedhand = document.getElementById("closedhand");

var flowerimages = [];
var openimages = [];
var closedimages = [];

var flowers = [];
var open = [];
var closed = [];

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

function addChow(){
  mode = CHOW_MODE;
}

function addPung(){
  mode = PUNGMODE;
}

function addOpenQuad(){
  mode = OPEN_QUAD_MODE;
}

function addClosedQuad(){
  mode = CLOSED_QUAD_MODE;
}

function addFlowers(){
  mode = FLOWER_MODE;
}

function sendTile(t){
  switch (mode){
    case HAND_MODE:
      console.log(closed.length);
      console.log(("0" + t).slice(-2));
      console.log("graphics/" + ("0" + t).slice(-2) + ".png");
      closedimages[closed.length].src = "graphics/" + ("0" + t).slice(-2) + ".png";
      closed.push(t);
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
