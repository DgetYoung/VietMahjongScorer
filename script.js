const HAND_MODE = 0;
const CHOW_MODE = 1;
const PUNG_MODE = 2;
const OPEN_QUAD_MODE = 3;
const CLOSED_QUAD_MODE = 4;
const FLOWER_MODE = 5;

var mode = HAND_MODE;

var flowerHand = document.getElementById("flowerhand");
var openHand = document.getElementById("openhand");
var closedHand = document.getElementById("closedhand");

var chowButton = document.getElementById("chowbutton");
var pungButton = document.getElementById("pungbutton");
var openQuadButton = document.getElementById("openquadbutton");
var closedQuadButton = document.getElementById("closedquadbutton");
var flowerButton = document.getElementById("flowerbutton");
var tileButtons = document.getElementsByClassName("tilebutton");

var flowerImages = [];
var openImages = [];
var closedImages = [];

var flowerData = [];
var openData = [];
var closedData = [];


function isJoker(t){
  if (Math.floor(t / 10) >= 6){
    return true;
  }
  else{
    return false;
  }
}

function isDot(t){
  if (Math.floor(t / 10) == 0 ||
      (isJoker(t) && t % 10 == 1)){
    return true;
  }
  else{
    return false;
  }
}

function isBam(t){
  if (Math.floor(t / 10) == 1 ||
      (isJoker(t) && t % 10 == 2)){
    return true;
  }
  else{
    return false;
  }
}

function isChar(t){
  if (Math.floor(t / 10) == 2 ||
      (isJoker(t) && t % 10 == 3)){
    return true;
  }
  else{
    return false;
  }
}

function isNumber(t){
  if (isDot(t) || isBam(t) || isChar(t) ||
      (isJoker(t) && t % 10 == 7)){
    return true;
  }
  else{
    return false;
  }
}

function isTerminal(t){
  if (isNumber(t) && (t % 10 == 0 || t % 10 == 8)){
    return true;
  }
  else{
    return false;
  }
}

function isWind(t){
  if (((Math.floor(t / 10) == 3) && (t % 10 < 4)) ||
      (isJoker(t) && t % 10 == 5)){
    return true;
  }
  else{
    return false;
  }
}

function isDragon(t){
  if (((Math.floor(t / 10) == 3) && (t % 10 >= 4)) ||
      (isJoker(t) && t % 10 == 6)){
    return true;
  }
  else{
    return false;
  }
}

function isHonor(t){
  if (isWind(t) || isDragon(t) ||
      (isJoker(t) && t % 10 == 8)){
    return true;
  }
  else{
    return false;
  }
}

function isFlower(t){
  if (((Math.floor(t / 10) == 4) || (Math.floor(t / 10) == 5)) ||
      (isJoker(t) && (t % 10 == 4))){
    return true;
  }
  else{
    return false;
  }
}

function copiesInHand(t){
  var copies = 0;
  
  for (const i of closedData){
    if (i == t){
      copies++;
    }
  }
  for (const i of openData){
    for (const j of i){
      if (j == t){
        copies++;
      }
    }
  }
  for (const i of flowerData){
    if (i == t){
      copies++;
    }
  }
  
  return copies;
}

function openCount(){
  var count = 0;
  
  for (const i of openData){
    for (const j of i){
      count++;
    }
  }
  
  return count;
}

function update(){
  //update tile buttons based on mode
	switch (mode){
    case HAND_MODE:
      if (closedData.length == 13 - (openData.length * 3)){
        for (const b of tileButtons){
          b.style.opacity = 1;
        }
      }
      else if (closedData.length == 14 - (openData.length * 3)){
        for (const b of tileButtons){
          b.style.opacity = 0.5;
        }
      }
      else{
        for (const b of tileButtons){
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
      if (closedData.length == 14 - (openCount())){
        for (const b of tileButtons){
          b.style.opacity = 0.5;
        }
      }
      else{
        for (const b of tileButtons){
          if (isFlower(Number(b.id)) || isHonor(Number(b.id))){
            b.style.opacity = 0.5;
          }
          else{
            b.style.opacity = 1;
          }
        }
      }
      break;
    case PUNG_MODE:
      if (closedData.length == 14 - (openCount())){
        for (const b of tileButtons){
          b.style.opacity = 0.5;
        }
      }
      else{
        for (const b of tileButtons){
          if (isFlower(Number(b.id))){
            b.style.opacity = 0.5;
          }
          else{
            b.style.opacity = 1;
          }
        }
      }
      break;
    case OPEN_QUAD_MODE:
    case CLOSED_QUAD_MODE:
      for (const b of tileButtons){
          if (isFlower(Number(b.id)) ||
              isJoker(Number(b.id))){
            b.style.opacity = 0.5;
          }
          else{
            b.style.opacity = 1;
          }
        }
      break;
    case FLOWER_MODE:
      for (const b of tileButtons){
        if (isFlower(Number(b.id)) || isJoker(Number(b.id))){
          b.style.opacity = 1;
        }
        else{
          b.style.opacity = 0.5;
        }
      }
      break;
    default:
      break;
  }
  
  //remove exhausted tiles
  for (const b of tileButtons){
    if ((copiesInHand(Number(b.id)) == 4) ||
        ((copiesInHand(Number(b.id)) > 0) &&
        (isJoker(Number(b.id)) || isFlower(Number(b.id))))){
      b.style.opacity = 0.5;
    }
  }
  
  //remove illegal tiles based on chow/pung content
  if (mode == CHOW_MODE && openData.length > 0){
    for (const t of openData[openData.length - 1])
    {
      if (isDot(t)){
        for (const b of tileButtons){
          //remove non-dots
          if (!(isDot(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 7)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (isBam(t)){
        for (const b of tileButtons){
          //remove non-bamboos
          if (!(isBam(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 7)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (isChar(t)){
        for (const b of tileButtons){
          //remove non-characters
          if (!(isChar(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 7)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (isNumber(t) && !isJoker(t)){
        for (const b of tileButtons){
          //remove distant numbers
          if (isNumber(Number(b.id))  && !isJoker(Number(b.id)) &&
              (Math.abs(Number(b.id) - t) > 2)){
            b.style.opacity = 0.5;
          }
          //remove identical tiles
          if (Number(b.id) == t){
            b.style.opacity = 0.5;
          }
        }
      }
    }
  }
  if (mode == PUNG_MODE && openData.length > 0){
    for (const t of openData[openData.length - 1])
    {
      if (isDot(t)){
        for (const b of tileButtons){
          //remove non-dots
          if (!(isDot(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 7)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (isBam(t)){
        for (const b of tileButtons){
          //remove non-bamboos
          if (!(isBam(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 7)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (isChar(t)){
        for (const b of tileButtons){
          //remove non-characters
          if (!(isChar(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 7)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (isWind(t)){
        for (const b of tileButtons){
          //remove non-characters
          if (!(isWind(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 8)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (isDragon(t)){
        for (const b of tileButtons){
          //remove non-characters
          if (!(isDragon(Number(b.id)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 0)) ||
              ((isJoker(Number(b.id))) && (Number(b.id) % 10 == 8)))){
            b.style.opacity = 0.5;
          }
        }
      }
      if (!isJoker(t)){
        for (const b of tileButtons){
          //remove non-identical tiles
          if (!isJoker(Number(b.id)) && (!(Number(b.id) == t))){
            b.style.opacity = 0.5;
          }
        }
      }
    }
  }
  
  
  //update mode buttons
  if ((closedData.length > 11 - (openData.length * 3)) ||
      (closedImages.length < 3)){
    if (mode == HAND_MODE || mode == FLOWER_MODE){
      chowButton.style.opacity = 0.5;
      pungButton.style.opacity = 0.5;
      openQuadButton.style.opacity = 0.5;
      closedQuadButton.style.opacity = 0.5;
    }
  }
  else{
    chowButton.style.opacity = 1;
    pungButton.style.opacity = 1;
    openQuadButton.style.opacity = 1;
    closedQuadButton.style.opacity = 1;
  }
  
  //update tile spacing
  for (const i of closedImages){
    i.style.marginLeft = "0";
  }
  closedImages[closedImages.length - 1].style.marginLeft = "5px";
  for (const i of openImages){
    for (const j of i){
      j.style.marginLeft = "0";
    }
    i[0].style.marginLeft = "5px";
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
    closedHand.appendChild(tile);
    closedImages.push(tile);
  }
  
  update();
}

function changeMode(m){
  //clear all buttons
  chowButton.style.background = "white";
  pungButton.style.background = "white";
  openQuadButton.style.background = "white";
  closedQuadButton.style.background = "white";
  flowerButton.style.background = "white";
  
  //change mode
  mode = m;

  //darken corresponding mode button
  switch(m){
    case CHOW_MODE:
      chowButton.style.background = "lightgrey";
      break;
    case PUNG_MODE:
      pungButton.style.background = "lightgrey";
      break;
    case OPEN_QUAD_MODE:
      openQuadButton.style.background = "lightgrey";
      break;
    case CLOSED_QUAD_MODE:
      closedQuadButton.style.background = "lightgrey";
      break;
    case FLOWER_MODE:
      flowerButton.style.background = "lightgrey";
      break;
    default:
      break;
  }
  
  //update tile spaces
  switch(m){
    case CHOW_MODE:
    case PUNG_MODE:
      //remove last three tiles from closed hand
      for (let i = 0; i < 3; i++){
        closedHand.removeChild(closedImages[closedImages.length - 1]);
        closedImages.pop();
      }
      
      //add three tiles to open hand
      openImages.push([]);
      openData.push([]);
      for (let i = 0; i < 3; i++){
        var tile = document.createElement("img");
        tile.src = "graphics/tilespace.png";
        tile.style.height = "26px";
        tile.style.width = "20px";
        tile.style.margin = "0";
        openHand.appendChild(tile);
        openImages[openImages.length - 1].push(tile);
      }
      break;
    case OPEN_QUAD_MODE:
    case CLOSED_QUAD_MODE:
      //remove last three tiles from closed hand
      for (let i = 0; i < 3; i++){
        closedHand.removeChild(closedImages[closedImages.length - 1]);
        closedImages.pop();
      }
      
      //add four tiles to open hand
      openImages.push([]);
      openData.push([]);
      for (let i = 0; i < 4; i++){
        var tile = document.createElement("img");
        tile.src = "graphics/tilespace.png";
        tile.style.height = "26px";
        tile.style.width = "20px";
        tile.style.margin = "0";
        openHand.appendChild(tile);
        openImages[openImages.length - 1].push(tile);
      }
      break;
    case FLOWER_MODE:
      flowerButton.style.background = "lightgrey";
      break;
    default:
      break;
  }
  
  
  
  update();
}

function backspace(){
  switch (mode){
    case HAND_MODE:
      if (closedData.length > 0){
        closedImages[closedData.length - 1].src = "graphics/tilespace.png";
        closedData.pop();
      }
      else if (openCount() > 0){
        abandonCurrent(true);
      }
      else{
        if (flowerData.length > 0){
          flowerHand.removeChild(flowerImages[flowerData.length - 1]);
          flowerImages.pop();
          flowerData.pop();
        }
      }
      break;
    case CHOW_MODE:
    case PUNG_MODE:
        if (openData[openData.length - 1].length > 0){
        openImages[openImages.length - 1][openData[openData.length - 1].length - 1].src =
            "graphics/tilespace.png";
        openData[openData.length - 1].pop();
      }
      else{
        abandonCurrent();
        changeMode(HAND_MODE);
      }
      break;
    case OPEN_QUAD_MODE:
    case CLOSED_QUAD_MODE:
      abandonCurrent();
      changeMode(HAND_MODE);
      break;
    case FLOWER_MODE:
      if (flowerData.length > 0){
        flowerHand.removeChild(flowerImages[flowerData.length - 1]);
        flowerImages.pop();
        flowerData.pop();
      }
      break;
    default:
      break;
  }
  
  update();
}

function abandonCurrent(force = false){
  if ((mode == CHOW_MODE || mode == PUNG_MODE ||
      mode == OPEN_QUAD_MODE || mode == CLOSED_QUAD_MODE) || force){
    if (openImages.length > 0){
      //remove last open group
      for (const i of openImages[openImages.length - 1]){
        openHand.removeChild(i);
      }
      openImages.length--;
      openData.length--;
      
      //add three tiles to closed hand
      for (let i = 0; i < 3; i++){
        var tile = document.createElement("img");
        tile.src = "graphics/tilespace.png";
        tile.style.height = "26px";
        tile.style.width = "20px";
        tile.style.margin = "0";
        closedHand.appendChild(tile);
        closedImages.push(tile);
      }
    }
  }
  
  update();
}

function addChow(){
  abandonCurrent();
  if (mode == CHOW_MODE){
    changeMode(HAND_MODE);
  }
  else{
    if (chowButton.style.opacity == 1){
      changeMode(CHOW_MODE);
    }
  }
}

function addPung(){
  abandonCurrent();
  if (mode == PUNG_MODE){
    changeMode(HAND_MODE);
  }
  else{
    if (pungButton.style.opacity == 1){
      changeMode(PUNG_MODE);
    }
  }
}

function addOpenQuad(){
  abandonCurrent();
  if (mode == OPEN_QUAD_MODE){
    changeMode(HAND_MODE);
  }
  else{
    if (openQuadButton.style.opacity == 1){
      changeMode(OPEN_QUAD_MODE);
    }
  }
}

function addClosedQuad(){
  abandonCurrent();
  if (mode == CLOSED_QUAD_MODE){
    changeMode(HAND_MODE);
  }
  else{
    if (closedQuadButton.style.opacity == 1){
      changeMode(CLOSED_QUAD_MODE);
    }
  }
}

function addFlowers(){
  abandonCurrent();
  if (mode == FLOWER_MODE){
    changeMode(HAND_MODE);
  }
  else{
    changeMode(FLOWER_MODE);
  }
}

function sendTile(t){
  if (document.getElementById(("0" + t).slice(-2)).style.opacity == 1){
    switch (mode){
      case HAND_MODE:
        closedImages[closedData.length].src = "graphics/" + ("0" + t).slice(-2) + ".png";
        closedData.push(t);
        break;
      case CHOW_MODE:
      case PUNG_MODE:
        openImages[openImages.length - 1][openData[openData.length - 1].length].src =
            "graphics/" + ("0" + t).slice(-2) + ".png";
        openData[openData.length - 1].push(t);
        if(openData[openData.length - 1].length == 3){
          changeMode(HAND_MODE);
        }
        break;
      case OPEN_QUAD_MODE:
        for (let i = 0; i < 4; i++){
          openImages[openImages.length - 1][openData[openData.length - 1].length].src =
            "graphics/" + ("0" + t).slice(-2) + ".png";
          openData[openData.length - 1].push(t);
        }
        changeMode(HAND_MODE);
        break;
      case CLOSED_QUAD_MODE:
        for (let i = 0; i < 4; i++){
          if (i == 2){
            openImages[openImages.length - 1][openData[openData.length - 1].length].src =
            "graphics/99.png";
          }
          else{
            openImages[openImages.length - 1][openData[openData.length - 1].length].src =
            "graphics/" + ("0" + t).slice(-2) + ".png";
          }
          openData[openData.length - 1].push(t);
        }
        changeMode(HAND_MODE);
        break;
      case FLOWER_MODE:
        var tile = document.createElement("img");
        tile.src = "graphics/" + ("0" + t).slice(-2) + ".png";
        tile.style.height = "26px";
        tile.style.width = "20px";
        tile.style.margin = "0";
        flowerHand.appendChild(tile);
        flowerImages.push(tile);
        flowerData.push(t);
        break;
      default:
        break;
    }
  }
  update();
}
