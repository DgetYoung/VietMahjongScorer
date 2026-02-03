const HAND_MODE = 0;
const CHOW_MODE = 1;
const PUNG_MODE = 2;
const OPEN_QUAD_MODE = 3;
const CLOSED_QUAD_MODE = 4;
const FLOWER_MODE = 5;

var mode = HAND_MODE;

var eastRoundButton = document.getElementById("eastround");
var southRoundButton = document.getElementById("southround");
var westRoundButton = document.getElementById("westround");
var northRoundButton = document.getElementById("northround");

var eastSeatButton = document.getElementById("eastseat");
var southSeatButton = document.getElementById("southseat");
var westSeatButton = document.getElementById("westseat");
var northSeatButton = document.getElementById("northseat");

var selfDrawButton = document.getElementById("selfdraw");
var dealInButton = document.getElementById("dealin");

var robbingButton = document.getElementById("robbing");
var replacementButton = document.getElementById("replacement");
var lastButton = document.getElementById("last");

var heavenButton = document.getElementById("heaven");
var earthButton = document.getElementById("earth");
var manButton = document.getElementById("man");

var flowerHand = document.getElementById("flowerhand");
var openHand = document.getElementById("openhand");
var closedHand = document.getElementById("closedhand");

var chowButton = document.getElementById("chowbutton");
var pungButton = document.getElementById("pungbutton");
var openQuadButton = document.getElementById("openquadbutton");
var closedQuadButton = document.getElementById("closedquadbutton");
var flowerButton = document.getElementById("flowerbutton");
var tileButtons = document.getElementsByClassName("tilebutton");

var scoreButton = document.getElementById("scorebutton");
var scoreLink = document.getElementById("scorelink");
var scoringContent = document.getElementById("scoringcontent");
var phanField = document.getElementById("phancount");
var payoutField = document.getElementById("payout");

var flowerImages = [];
var openImages = [];
var closedImages = [];

var flowerData = [];
var openData = [];
var closedData = [];

var roundWind = 0;
var seatWind = 0;
var selfDraw = true;


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

function copiesInGroup(t, g){
  var copies = 0;
  
  for (const i of g){
    if (i == t){
      copies++;
    }
  }
  
  return copies;
}

function copiesReplaced(t){
  var copies = 0;
  
  for (const i of flowerData){
    if (i == t){
      copies++;
    }
  }
  
  return copies;
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
  
  if (closedData.length + (3 * openData.length) == 14){
    scoreButton.style.opacity = 1;
    scoreLink.href = "#scoring";
  }
  else{
    scoreButton.style.opacity = 0.5;
    scoreLink.href = "#";
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

function handleSelfDraw(){
  robbingButton.checked = false;
  earthButton.checked = false;
}

function handleDealIn(){
  replacementButton.checked = false;
  heavenButton.checked = false;
  manButton.checked = false;
}

function handleRobbing(){
  if (robbingButton.checked){
    dealInButton.checked = true;
  }
  replacementButton.checked = false;
  lastButton.checked = false;
  heavenButton.checked = false;
  earthButton.checked = false;
  manButton.checked = false;
}

function handleReplacement(){
  if (replacementButton.checked){
    selfDrawButton.checked = true;
  }
  robbingButton.checked = false;
  lastButton.checked = false;
  heavenButton.checked = false;
  earthButton.checked = false;
  manButton.checked = false;
}

function handleLast(){
  robbingButton.checked = false;
  replacementButton.checked = false;
  heavenButton.checked = false;
  earthButton.checked = false;
  manButton.checked = false;
}

function handleHeaven(){
  if (heavenButton.checked){
    selfDrawButton.checked = true;
  }
  robbingButton.checked = false;
  replacementButton.checked = false;
  lastButton.checked = false;
  earthButton.checked = false;
  manButton.checked = false;
}

function handleEarth(){
  if (earthButton.checked){
    dealInButton.checked = true;
  }
  robbingButton.checked = false;
  replacementButton.checked = false;
  lastButton.checked = false;
  heavenButton.checked = false;
  manButton.checked = false;
}

function handleMan(){
  if (manButton.checked){
    selfDrawButton.checked = true;
  }
  robbingButton.checked = false;
  replacementButton.checked = false;
  lastButton.checked = false;
  heavenButton.checked = false;
  earthButton.checked = false;
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
      else{
        changeMode(HAND_MODE);
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

function sort(a){
  for (let i = 0; i < a.length; i++){
    for (let j = 0; j < a.length - i - 1; j++){
      if (a[j] > a[j + 1]){
        var temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }
}

function isPair(p){
  if (p.length != 2){return false;}
  if (p[0] == p[1]){return true;}
  if (isFlower(p[0]) || isFlower(p[1])){return true;}
  if (!isJoker(p[0]) && !isJoker(p[1])){return false;}
  if ((isJoker(p[0]) && p[0] % 10 == 0) ||
      (isJoker(p[1]) && p[1] % 10 == 0)){return true;}
  if ((isJoker(p[0]) && p[0] % 10 == 7) ||
      (isJoker(p[1]) && p[1] % 10 == 7)){
    if (isNumber(p[0]) && isNumber(p[1])){return true;}
  }
  if ((isJoker(p[0]) && p[0] % 10 == 8) ||
      (isJoker(p[1]) && p[1] % 10 == 8)){
    if (isHonor(p[0]) && isHonor(p[1])){return true;}
  }
  if ((isDot(p[0]) == isDot(p[1])) &&
      (isBam(p[0]) == isBam(p[1])) &&
      (isChar(p[0]) == isChar(p[1])) &&
      (isWind(p[0]) == isWind(p[1])) &&
      (isDragon(p[0]) == isDragon(p[1]))){return true;}
  return false;
}

function isRun(r){
  if (r.length != 3){return false;}
  sort(r);
  if(isHonor(r[0]) || isHonor(r[1]) || isHonor(r[2])){return false;}
  if (isJoker(r[1]) || isFlower(r[1])){
    return isTriplet(r);
  }
  else if (isJoker(r[2]) || isFlower(r[2])){
    if ((r[1] - r[0] == 1 || r[1] - r[0] == 2) && isPair(r.slice(1,3))){return true;}
  }
  else if (r[1] - r[0] == 1 && r[2] - r[1] == 1){return true;}
  
  return false;
}

function isTriplet(t){
  return t.length == 3 && isPair(t.slice(0,2)) && isPair(t.slice(1,3)) && isPair([t[0], t[2]]);
}

function isQuad(q){
  return q.length == 4;
}

function isSet(s){
  return isTriplet(s) || isQuad(s);
}

function isGroup(g){
  return isRun(g) || isSet(g);
}

function sortArrangement(a){
  var end = Math.floor(a.length / 3) * 3;
  
  for (let i = 0; i < end; i += 3){
    for (let j = 0; j < end - i - 3; j += 3){
      if(a[j] > a[j + 3]){
        var temp1 = a[j];
        var temp2 = a[j + 1];
        var temp3 = a[j + 2];
        a[j] = a[j + 3];
        a[j + 1] = a[j + 4];
        a[j + 2] = a[j + 5];
        a[j + 3] = temp1;
        a[j + 4] = temp2;
        a[j + 5] = temp3;
      }
    }
  }
}

function compareArrays(a, b){
  if (a.length != b.length){return false};
  for (let i = 0; i < a.length; i++)
  {
    if (a[i] != b[i]){return false};
  }
  
  return true;
}

function arrange(hand, arrangements, builder = [], start = 0){
  if (isPair(hand)){
    builder.push(...hand.slice());
    sortArrangement(builder);
    
    var unique = true;
    
    for (const i of arrangements){
      if (compareArrays(i, builder)){
        unique = false;
      }
    }
    var b = builder.slice();
    if (unique){arrangements.push(b);}
    return true;
  }
  else if (hand.length <= 2){return false;}
  for (let i = start; i < hand.length; i++){
    for (let j = i + 1; j < hand.length; j++){
      for (let k = j + 1; k < hand.length; k++){
        if (isGroup([hand[i], hand[j], hand[k]])){
          var h = hand.slice();
          var b = builder.slice();
          arrange(h, arrangements, b, i + 1);
          builder.push(...[hand[i], hand[j], hand[k]]);
          hand.splice(k, 1);
          hand.splice(j, 1);
          hand.splice(i, 1);
          
          var h = hand.slice();
          var b = builder.slice();
          if(!arrange(h, arrangements, b)){
            return false;
          }
        }
      }
    }
  }
}

function arrangeSevenPairs(hand, arrangements, builder = [], start = 0){
  if (isPair(hand)){
    builder.push(...hand.slice());
    
    var unique = true;
    
    for (const i of arrangements){
      if (compareArrays(i, builder)){
        unique = false;
      }
    }
    var b = builder.slice();
    if (unique){arrangements.push(b);}
    return true;
  }
  else if (hand.length <= 2){return false;}
  for (let i = start; i < hand.length; i++){
    for (let j = i + 1; j < hand.length; j++){
      if (isPair([hand[i], hand[j]])){
        var h = hand.slice();
        var b = builder.slice();
        builder.push(...[hand[i], hand[j]]);
        hand.splice(j, 1);
        hand.splice(i, 1);
        
        var h = hand.slice();
        var b = builder.slice();
        if(!arrangeSevenPairs(h, arrangements, b)){
          return false;
        }
      }
    }
  }
}

function checkValid(hand){
  var h = hand.slice();
  var arrangements = [];
  
  arrange(h, arrangements);
  
  return arrangements.length;
}

function isRobbingAQuad(){
  return robbingButton.checked;
}

function isReplacementTile(){
  return replacementButton.checked;
}

function isLastTile(){
  return lastButton.checked;
}

function isBlessingOfHeaven(){
  return heavenButton.checked;
}

function isBlessingOfEarth(){
  return earthButton.checked;
}

function isBlessingOfMan(){
  return manButton.checked;
}

function findWaits(hand){
  waits = [];
  
  if (hand.length % 3 == 1){
    for (const t of tileButtons){
      if (!isJoker(Number(t.id)) && !isFlower(Number(t.id))){
        var h = hand.slice();
      
        h.push(Number(t.id));
        sort(h);
        if (checkValid(h)){
          waits.push(Number(t.id));
        }
      }
    }
  }
  
  return waits;
}

function isSingleWait(hand){
  var single = false;
  var h = hand.slice();
  
  h.splice(h.indexOf(closedData[closedData.length - 1]), 1);
  
  if(findWaits(h).length == 1){
    single = true;
  }
  
  return single;
}

function isAllRuns(hand){
  var allRuns = true;
  
  for (const g of openData){
    if (!isRun(g)){allRuns = false;}
  }
  
  for (let i = 0; i < hand.length - 3; i += 3){
    if (!isRun(hand.slice(i, i + 3))){allRuns = false;}
  }
  
  return allRuns;
}

function isFullyClosed(hand){
  return (openData.length == 0) && selfDraw;
}

function isSingleRunsClosed(hand){
  return isSingleWait(hand) && isAllRuns(hand) && isFullyClosed(hand);
}

function countDragonSets(hand){
  var dragons = 0;
  
  for (const g of openData){
    if (isSet(g)){
      var dragonSet = true;
      
      for (const t of g){
        if (!isDragon(t) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 8))){
          dragonSet = false;
        }
      }
      
      if (dragonSet == true){dragons++;}
    }
  }
  
  for (let i = 0; i < hand.length - 3; i += 3){
    if (isSet(hand.slice(i, i + 3))){
      var dragonSet = true;
      
      for (const t of hand.slice(i, i + 3)){
        if (!isDragon(t) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 8))){
          dragonSet = false;
        }
      }
      
      if (dragonSet == true){dragons++;}
    }
  }
  
  if (isSevenPairs(hand)) dragons = 0;
  
  return dragons;
}

function countWindSets(hand){
  var winds = 0;
  
  for (const g of openData){
    if (isSet(g)){
      var windSet = true;
      
      for (const t of g){
        if (!isWind(t) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 8))){
          windSet = false;
        }
      }
      
      if (windSet == true){winds++;}
    }
  }
  
  for (let i = 0; i < hand.length - 3; i += 3){
    if (isSet(hand.slice(i, i + 3))){
      var windSet = true;
      
      for (const t of hand.slice(i, i + 3)){
        if (!isWind(t) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 8))){
          windSet = false;
        }
      }
      
      if (windSet == true){winds++;}
    }
  }
  
  if (isSevenPairs(hand)) winds = 0;
  
  return winds;
}

function isSeatWind(hand){
  var winds = 0;
  
  for (const g of openData){
    if (isSet(g)){
      var windSet = true;
      
      for (const t of g){
        if (!(isWind(t) && t % 10 == seatWind) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 5) || (isJoker(t) && t % 10 == 8))){
          windSet = false;
        }
      }
      
      if (windSet == true){winds++;}
    }
  }
  
  for (let i = 0; i < hand.length - 3; i += 3){
    if (isSet(hand.slice(i, i + 3))){
      var windSet = true;
      
      for (const t of hand.slice(i, i + 3)){
        if (!(isWind(t) && t % 10 == seatWind) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 5) || (isJoker(t) && t % 10 == 8))){
          windSet = false;
        }
      }
      
      if (windSet == true){winds++;}
    }
  }
  
  return winds;
}

function isRoundWind(hand){
  var winds = 0;
  
  for (const g of openData){
    if (isSet(g)){
      var windSet = true;
      
      for (const t of g){
        if (!(isWind(t) && t % 10 == roundWind) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 5) || (isJoker(t) && t % 10 == 8))){
          windSet = false;
        }
      }
      
      if (windSet == true){winds++;}
    }
  }
  
  for (let i = 0; i < hand.length - 3; i += 3){
    if (isSet(hand.slice(i, i + 3))){
      var windSet = true;
      
      for (const t of hand.slice(i, i + 3)){
        if (!(isWind(t) && t % 10 == roundWind) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 5) || (isJoker(t) && t % 10 == 8))){
          windSet = false;
        }
      }
      
      if (windSet == true){winds++;}
    }
  }
  
  return winds;
}

function countQuads(){
  var quads = 0;
  
  for (const g of openData){
    if (isQuad(g)){quads++;}
  }
  
  return quads;
}

function countClosedQuads(){
  var quads = 0;
  
  for (const i of openImages){
    for (const j of i){
      if (j.src.substring(j.src.lastIndexOf(".") - 2, j.src.lastIndexOf(".")) == 99){quads++;}
    }
  }
  
  return quads;
}

function isSevenPairs(hand){
  var h = hand.slice();
  var arrangements = [];
  
  arrangeSevenPairs(h, arrangements);
  
  return arrangements.length;
}

function isAllSets(hand){
  var allSets = true;
  
  for (const g of openData){
    if (!isSet(g)){allSets = false;}
  }
  
  for (let i = 0; i < hand.length - 3; i += 3){
    if (!isSet(hand.slice(i, i + 3))){allSets = false;}
  }
  
  return allSets;
}

function isAllCalled(hand){
  return openData.length == 4 && !selfDraw;
}

function isHalfFlush(hand){
  var halfFlush = true;
  var dots = 0;
  var bams = 0;
  var chars = 0;
  var suits = 0;
  var honors = 0;
  
  for (const g of openData){
    for (const t of g){
      if (isDot(t)){dots++;}
      if (isBam(t)){bams++;}
      if (isChar(t)){chars++;}
      if (isHonor(t)){honors++;}
    }
  }
  
  for (const t of hand){
    if (isDot(t)){dots++;}
    if (isBam(t)){bams++;}
    if (isChar(t)){chars++;}
    if (isHonor(t)){honors++;}
  }
  
  if (dots > 0){suits++;}
  if (bams > 0){suits++;}
  if (chars > 0){suits++;}
  
  if (suits != 1 || honors == 0){halfFlush = false;}
  
  return halfFlush;
}

function isFullFlush(hand){
  var fullFlush = true;
  var dots = 0;
  var bams = 0;
  var chars = 0;
  var suits = 0;
  var honors = 0;
  
  for (const g of openData){
    for (const t of g){
      if (isDot(t)){dots++;}
      if (isBam(t)){bams++;}
      if (isChar(t)){chars++;}
      if (isHonor(t)){honors++;}
    }
  }
  
  for (const t of hand){
    if (isDot(t)){dots++;}
    if (isBam(t)){bams++;}
    if (isChar(t)){chars++;}
    if (isHonor(t)){honors++;}
  }
  
  if (dots > 0){suits++;}
  if (bams > 0){suits++;}
  if (chars > 0){suits++;}
  
  if (suits != 1 || honors > 0){fullFlush = false;}
  
  return fullFlush;
}

function isAllTerminalsAndHonors(hand){
  var allTermHon = true;
  var term = false;
  var hon = false;
  
  for (const g of openData){
    for (const t of g){
      if (isTerminal(t)){term = true;}
      if (isHonor(t)){hon = true;}
      if (!isTerminal(t) && !isHonor(t) && !isJoker(t)){allTermHon = false;}
    }
  }
  
  for (const t of hand){
    if (isTerminal(t)){term = true;}
    if (isHonor(t)){hon = true;}
    if (!isTerminal(t) && !isHonor(t) && !isJoker(t) && !isFlower(t)){allTermHon = false;}
  }
  
  if (term == false || hon == false){allTermHon = false;}
  
  return allTermHon;
}

function isLittleThreeDragons(hand){
  var dragonPair = false;
  
  if (isPair(hand.slice(hand.length - 2, hand.length))){
    dragonPair = true;
    
    for (const t of hand.slice(hand.length - 2, hand.length)){
      if (!isDragon(t) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 8))){
        dragonPair = false;
      }
    }
  }
  
  return (countDragonSets(hand) == 2 && dragonPair);
}

function isBigThreeDragons(hand){
  return (countDragonSets(hand) == 3);
}

function isThirteenOrphans(hand){
  var orphans = true;
  var dots = 0;
  var onedot = 0;
  var ninedot = 0;
  var bams = 0;
  var onebam = 0;
  var ninebam = 0;
  var chars = 0;
  var onechar = 0;
  var ninechar = 0;
  var winds = 0;
  var east = 0;
  var south = 0;
  var west = 0;
  var north = 0;
  var dragons = 0;
  var red = 0;
  var green = 0;
  var white = 0;
  
  for (const t of hand){
    if (isDot(t)){dots++;}
    if (isBam(t)){bams++;}
    if (isChar(t)){chars++;}
    if (isWind(t)){winds++;}
    if (isDragon(t)){dragons++;}
    if (isDot(t) && (t % 10 == 0)){onedot++;}
    if (isDot(t) && (t % 10 == 8)){ninedot++;}
    if (isBam(t) && (t % 10 == 0)){onebam++;}
    if (isBam(t) && (t % 10 == 8)){ninebam++;}
    if (isChar(t) && (t % 10 == 0)){onechar++;}
    if (isChar(t) && (t % 10 == 8)){ninechar++;}
    if (isWind(t) && (t % 10 == 0)){east++;}
    if (isWind(t) && (t % 10 == 1)){south++;}
    if (isWind(t) && (t % 10 == 2)){west++;}
    if (isWind(t) && (t % 10 == 3)){north++;}
    if (isDragon(t) && (t % 10 == 4)){red++;}
    if (isDragon(t) && (t % 10 == 5)){green++;}
    if (isDragon(t) && (t % 10 == 6)){white++;}
  }
  
  dots = Math.max(0, dots - 2);
  bams = Math.max(0, bams - 2);
  chars = Math.max(0, chars - 2);
  winds = Math.max(0, winds - 4);
  dragons = Math.max(0, dragons - 3);
  
  onedot--;
  ninedot--;
  onebam--;
  ninebam--;
  onechar--;
  ninechar--;
  east--;
  south--;
  west--;
  north--;
  
  if (openData.length > 0){orphans = false;}
  if (!isAllTerminalsAndHonors(hand)){orphans = false;}
  if (dots + bams + chars + winds + dragons > 1){orphans = false;}
  if (onedot + ninedot + onebam + ninebam + onechar + ninechar +
      east + south + west + north > 1){orphans = false;}
  
  return orphans;
}

function isNineGates(hand){
  var nineGates = true;
  var nums = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  if (openData.length > 0){nineGates = false;}
  if (!isFullFlush(hand)){nineGates = false;}
  
  for (const t of hand){
    if (!isJoker(t) && !isFlower(t)){
      nums[t % 10]++;
    }
  }
  
  if (nums[0] > 3 && nums[8] > 3){nineGates = false;}
  
  var sum = 0;
  
  for (let i = 1; i < 8; i++){
    nums[i]--;
    if (nums[i] > 0){sum += nums[i];}
  }
  
  if (sum > 1){nineGates = false;}
  if (nums[0] > 3 && sum > 0){nineGates = false;}
  if (nums[8] > 3 && sum > 0){nineGates = false;}
  
  return nineGates;
}

function isAllTerminals(hand){
  var allTerminals = true;
  
  for (const g of openData){
    for (const t of g){
      if (!isJoker(t) && !isTerminal(t)){allTerminals = false;}
    }
  }
  
  for (const t of hand){
    if (!isJoker(t) && !isFlower(t) && !isTerminal(t)){allTerminals = false;}
  }
  
  return allTerminals;
}

function isFourClosedSets(hand){
  var fourClosed = true;
  
  if (!isAllSets(hand)){fourClosed = false;}
  
  if (countClosedQuads() != openData.length){fourClosed = false;}
  
  return fourClosed;
}

function isFourQuads(hand){
  var fourQuads = false;
  
  if (countQuads(hand) == 4){
    fourQuads = true;
  }
  
  return fourQuads;
}

function isFourClosedQuads(hand){
  return isFourClosedSets(hand) && isFourQuads(hand);
}

function isAllHonors(hand){
  var allHonors = true;
  
  for (const g of openData){
    for (const t of g){
      if (!(isJoker(t) && t % 10 == 0) && !isHonor(t)){allHonors = false;}
    }
  }
  
  for (const t of hand){
    if (!(isJoker(t) && t % 10 == 0) && !isFlower(t) && !isHonor(t)){allHonors = false;}
  }
  
  return allHonors;
}

function isLittleFourWinds(hand){
  var windPair = false;
  
  if (isPair(hand.slice(hand.length - 2, hand.length))){
    windPair = true;
    
    for (const t of hand.slice(hand.length - 2, hand.length)){
      if (!isWind(t) && !((isJoker(t) && t % 10 == 0) || (isJoker(t) && t % 10 == 8))){
        windPair = false;
      }
    }
  }
  
  return (countWindSets(hand) == 3 && windPair);
}

function isBigFourWinds(hand){
  return (countWindSets(hand) == 4);
}

function isNoFlowersNoLeaves(hand){
  var nfnl = true;
  
  if (flowerData.length > 0){nfnl = false;}
  
  for (const g of openData){
    for (const t of g){
      if (isJoker(t) || isFlower(t) || isHonor(t)){nfnl = false;}
    }
  }
  
  for (const t of hand){
    if (isJoker(t) || isFlower(t) || isHonor(t)){nfnl = false;}
  }
  
  return nfnl;
}

function isNoJokers(hand){
  var noJokers = true;
  
  for (const f of flowerData){
    if (isJoker(f)){noJokers = false;}
  }
  
  for (const g of openData){
    for (const t of g){
      if (isJoker(t)){noJokers = false;}
    }
  }
  
  for (const t of hand){
    if (isJoker(t) || isFlower(t)){noJokers = false;}
  }
  
  return noJokers;
}

function countBouquets(){
  var bouquets = 0;
  
  for (let i = 40; i < 60; i += 10){
    if (copiesReplaced(i) && copiesReplaced(i + 1) &&
        copiesInHand(i + 2) && copiesReplaced(i + 3)){bouquets++;}
    
    i += 4;
    if (copiesReplaced(i) && copiesReplaced(i + 1) &&
          copiesReplaced(i + 2) && copiesReplaced(i + 3)){bouquets++;}
    i -= 4;
  }
  
  return bouquets;
}

function countSeatFlowers(){
  var flowers = 0;
  
  for (const f of flowerData){
    if (!isJoker(f) && (f % 10) % 4 == seatWind){
      flowers++;
    }
  }
  
  flowers -= countBouquets();
  
  return flowers;
}
  
function countAnythingJokers(){
  var anythings = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 0){
      anythings++;
    }
  }
  
  return anythings;
}
  
function countDotJokers(){
  var dots = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 1){
      dots++;
    }
  }
  
  return dots;
}
  
function countBambooJokers(){
  var bams = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 2){
      bams++;
    }
  }
  
  return bams;
}
  
function countCharacterJokers(){
  var chars = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 3){
      chars++;
    }
  }
  
  return chars;
}
  
function countFlowerJokers(){
  var bigFlowers = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 4){
      bigFlowers++;
    }
  }
  
  return bigFlowers;
}
  
function countWindJokers(){
  var winds = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 5){
      winds++;
    }
  }
  
  return winds;
}
  
function countHonorJokers(){
  var honors = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 8){
      honors++;
    }
  }
  
  return honors;
}
  
function countDragonJokers(){
  var dragons = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 6){
      dragons++;
    }
  }
  
  return dragons;
}
  
function countNumberJokers(){
  var numbers = 0;
  
  for (const f of flowerData){
    if (isJoker(f) && (f % 10) == 7){
      numbers++;
    }
  }
  
  return numbers;
}
  
function countReplacedJokerSets(){
  var jokerSets = 0;
  
  for (let i = 60; i < 99; i += 10){
    if (copiesReplaced(i) && copiesReplaced(i + 1) &&
        copiesInHand(i + 2) && copiesReplaced(i + 3)){jokerSets++;}
    
    i += 4;
    if (copiesReplaced(i) && copiesReplaced(i + 1) &&
          copiesReplaced(i + 2) && copiesReplaced(i + 3)){jokerSets++;}
    i -= 4;
  }
  
  return jokerSets;
}
  
function countJokerSets(hand){
  var jokerSets = 0;
  
  for (let i = 60; i < 99; i += 10){
    if (copiesInHand(i) && copiesInHand(i + 1) &&
        copiesInHand(i + 2) && copiesInHand(i + 3)){jokerSets++;}
    i += 4;
    if (copiesInHand(i) && copiesInHand(i + 1) &&
        copiesInHand(i + 2) && copiesInHand(i + 3)){jokerSets++;}
    if (copiesInHand(i) && copiesInHand(i + 4) &&
        copiesInHand(i + 2) && copiesInHand(i + 3)){jokerSets++;}
    if (copiesInHand(i) && copiesInHand(i + 1) &&
        copiesInHand(i + 4) && copiesInHand(i + 3)){jokerSets++;}
    i -= 4;
  }
  
  return jokerSets;
}

function scoreHand(hand, out = []){
  var phan = 0;
  var big = 0;
  var med = 0;
  var special = false;
  out.length = 0;
  
  if (isBigFourWinds(hand)){
    big++;
	special = true;
    if (isNoJokers(hand)){
      phan += 54;
      out.push(["Big Four Winds (no jokers)", "9 mủn"]);
    }
    else{
      phan += 48;
      out.push(["Big Four Winds", "8 mủn"]);
    }
  }
  
  if (isFourClosedQuads(hand)){
    big++;
	special = true;
    phan += 30;
    out.push(["Four Closed Quads", "5 mủn"]);
  }
  
  if (isLittleFourWinds(hand)){
    big++;
	special = true;
    if (isNoJokers(hand)){
      phan += 30;
      out.push(["Little Four Winds (no jokers)", "5 mủn"]);
    }
    else{
      phan += 24;
      out.push(["Little Four Winds", "4 mủn"]);
    }
  }
  
  if (isAllHonors(hand)){
    big++;
	special = true;
    if (isNoJokers(hand)){
      phan += 30;
      out.push(["All Honors (no jokers)", "5 mủn"]);
    }
    else{
      phan += 24;
      out.push(["All Honors", "4 mủn"]);
    }
  }

  if (!isFourClosedQuads(hand)){
    if (isFourQuads(hand)){
      big++;
	  special = true;
      phan += 24;
      out.push(["Four Quads", "4 mủn"]);
    }
  }

  if (isAllTerminals(hand)){
    big++;
	special = true;
    if (isNoJokers(hand)){
      phan += 30;
      out.push(["All Terminals (no jokers)", "5 mủn"]);
    }
    else{
      phan += 24;
      out.push(["All Terminals", "4 mủn"]);
    }
  }
	
  if (!isFourClosedQuads(hand)){
    if (isFourClosedSets(hand)){
      big++;
	  special = true;
      if (isNoJokers(hand)){
        phan += 24;
        out.push(["Four Closed Sets (no jokers)", "4 mủn"]);
      }
      else{
        phan += 18;
        out.push(["Four Closed Sets", "3 mủn"]);
      }
    }
  }
	
  if (isNineGates(hand)){
    big++;
	special = true;
    if (isNoJokers(hand)){
      phan += 24;
      out.push(["Nine Gates (no jokers)", "4 mủn"]);
    }
    else{
      phan += 18;
      out.push(["Nine Gates", "3 mủn"]);
    }
  }
  
  if (isThirteenOrphans(hand)){
    big++;
	special = true;
    if (isNoJokers(hand)){
      phan += 19;
      out.push(["Thirteen Orphans (no jokers)", "19 phán"]);
    }
    else{
      phan += 13;
      out.push(["Thirteen Orphans", "13 phán"]);
    }
  }
  
  if (isBigThreeDragons(hand)){
    med += 1;
    if (isNoJokers(hand)){
      phan += 15;
      out.push(["Big Three Dragons (no jokers)", "15 phán"]);
    }
    else{
      phan += 9;
      out.push(["Big Three Dragons", "9 phán"]);
    }
  }

  if(special && isFullyClosed() && isSingleWait()){
	phan += 6;
    out.push(["+Single Wait-Fully Closed", "1 mủn"]);
  }
  
  if (isNoFlowersNoLeaves(hand)){
    big++;
    phan += 6;
    out.push(["No Flowers, No Leaves", "1 mủn"]);
  }
  
  if (isLittleThreeDragons(hand)){
    if (isNoJokers(hand)){
      phan += 12;
      out.push(["Little Three Dragons (no jokers)", "2 mủn"]);
    }
    else{
      phan += 6;
      out.push(["Little Three Dragons", "1 mủn"]);
    }
  }
  
  if (!isThirteenOrphans(hand)){
    if (isAllTerminalsAndHonors(hand)){
      big++;
      phan += 6;
      out.push(["All Terminals and Honors", "1 mủn"]);
    }
  }
  
  if(!isNineGates(hand)){
    if (isFullFlush(hand)){
      big++;
      if (isNoJokers(hand)){
        phan += 12;
        out.push(["Full Flush (no jokers)", "2 mủn"]);
      }
      else{
        phan += 6;
        out.push(["Full Flush", "1 mủn"]);
      }
    }
  }
  
  if (isHalfFlush(hand)){
    med++;
    phan += 3;
    out.push(["Half Flush", "3 phán"]);
  }
  
  if (isAllCalled(hand)){
    med++;
    if (isNoJokers(hand)){
      phan += 4;
      out.push(["All Called (no jokers)", "4 phán"]);
    }
    else{
      phan += 3;
      out.push(["All Called", "3 phán"]);
    }
  }
  
  if (!isFourClosedSets(hand) && !isFourQuads(hand)){
    if (isAllSets(hand)){
      med++;
      if (isNoJokers(hand)){
        phan += 4;
        out.push(["All Sets (no jokers)", "4 phán"]);
      }
      else{
        phan += 3;
        out.push(["All Sets", "3 phán"]);
      }
    }
  }
  
  if (isSingleRunsClosed(hand)){
    med++;
    phan += 3;
    out.push(["Single Wait-All Runs-<br>&nbsp;&nbsp;&nbsp;&nbsp;Fully Closed Hand", "3 phán"]);
  }
  
  if (big > 0 && med > 0){
    var bonus = 3 * med;
    out.push(["+Progressive Counting", bonus + " phán"]);
  }
  else if (med > 2){
    var bonus = 3 * (med - 2);
    out.push(["+Progressive Counting", bonus + " phán"]);
  }
  
  if (!isSingleRunsClosed(hand)){
    if (isSingleWait(hand)){
      phan += 1;
      out.push(["Single Wait", "1 phán"]);
    }
    
    if (isAllRuns(hand)){
      phan += 1;
      out.push(["All Runs", "1 phán"]);
    }
    
    if (isFullyClosed(hand)){
      phan += 1;
      out.push(["Fully Closed Hand", "1 phán"]);
    }
  }
  
  if (isSevenPairs(hand)){
    phan += 1;
    out.push(["Seven Pairs", "1 phán"]);
  }
  
  if (!isBigFourWinds(hand) && !isLittleFourWinds(hand)){
    if (isRoundWind(hand)){
      phan += 1;
      out.push(["Round Wind Set", "1 phán"]);
    }
    
    if (isSeatWind(hand)){
      phan += 1;
      out.push(["Seat Wind Set", "1 phán"]);
    }
  }
  
  var dragons = countDragonSets(hand);
  if (!isBigThreeDragons(hand) && !isLittleThreeDragons(hand)){
    phan += dragons;
    if (dragons > 1){
      out.push(["Dragon Set x" + dragons, dragons + " phán"]);
    }
    else if (dragons == 1){
      out.push(["Dragon Set", "1 phán"]);
    }
  }
  
  if (!isFourQuads(hand)){
    var quads = countQuads(hand);
    phan += quads;
    if (quads > 1){
      out.push(["Quad x" + quads, quads + " phán"]);
    }
    else if (quads == 1){
      out.push(["Quad", "1 phán"]);
    }
  }

  if (isBlessingOfHeaven()){
    phan += 12;
    out.push(["Blessing of Heaven", "2 mủn"]);
  }
  
  if (isBlessingOfEarth()){
    phan += 12;
    out.push(["Blessing of Earth", "2 mủn"]);
  }
  
  if (isBlessingOfMan()){
    phan += 12;
    out.push(["Blessing of Man", "2 mủn"]);
  }
  
  if (isRobbingAQuad()){
    phan += 1;
    out.push(["Robbing a Quad", "1 phán"]);
  }
  
  if (isReplacementTile()){
    phan += 1;
    out.push(["Win on Replacement Tile", "1 phán"]);
  }
  
  if (isLastTile()){
    phan += 1;
    out.push(["Win on Last Tile", "1 phán"]);
  }
  
  var bouquets = countBouquets(hand);
  phan += 6 * bouquets;
  if (bouquets > 1){
    out.push(["Bouquet x" + bouquets, bouquets + " mủn"]);
  }
  else if (bouquets == 1){
    out.push(["Bouquet", "1 mủn"]);
  }
  
  var flowers = countSeatFlowers();
  phan += flowers;
  if (flowers > 1){
    out.push(["Seat Flower x" + flowers, flowers + " phán"]);
  }
  else if (flowers == 1){
    out.push(["Seat Flower", "1 phán"]);
  }
  
  var replacedJokerSets = countReplacedJokerSets();
  phan += 12 * replacedJokerSets;
  if (replacedJokerSets > 1){
    out.push(["Joker Set (all replaced) x" + replacedJokerSets, (2 * replacedJokerSets) + " mủn"]);
  }
  else if (replacedJokerSets == 1){
    out.push(["Joker Set (all replaced)", "2 mủn"]);
  }
  
  var jokerSets = countJokerSets() - replacedJokerSets;
  phan += 6 * jokerSets;
  if (jokerSets > 1){
    out.push(["Joker Set x" + jokerSets, jokerSets + " mủn"]);
  }
  else if (jokerSets == 1){
    out.push(["Joker Set", "1 mủn"]);
  }
  
  var anythings = countAnythingJokers();
  if (seatWind == 0){
    phan += 3 * anythings;
    if (anythings > 1){
      out.push(["Anything Joker (East) x" + anythings, (3 * anythings) + " phán"]);
    }
    else if (anythings == 1){
      out.push(["Anything Joker (East)", "3 phán"]);
    }
  }
  else{
    phan += 2 * anythings;
    if (anythings > 1){
      out.push(["Anything Joker x" + anythings, (2 * anythings) + " phán"]);
    }
    else if (anythings == 1){
      out.push(["Anything Joker", "2 phán"]);
    }
  }
  
  var dots = countDotJokers();
  if (seatWind == 1){
    phan += 2 * dots;
    if (dots > 1){
      out.push(["Dot Joker (South) x" + dots, (2 * dots) + " phán"]);
    }
    else if (dots == 1){
      out.push(["Dot Joker (South)", "2 phán"]);
    }
  }
  else{
    phan += dots;
    if (dots > 1){
      out.push(["Dot Joker x" + dots, dots + " phán"]);
    }
    else if (dots == 1){
      out.push(["Dot Joker", "1 phán"]);
    }
  }
  
  var bams = countBambooJokers();
  if (seatWind == 2){
    phan += 2 * bams;
    if (bams > 1){
      out.push(["Bamboo Joker (South) x" + bams, (2 * bams) + " phán"]);
    }
    else if (bams == 1){
      out.push(["Bamboo Joker (South)", "2 phán"]);
    }
  }
  else{
    phan += bams;
    if (bams > 1){
      out.push(["Bamboo Joker x" + bams, bams + " phán"]);
    }
    else if (bams == 1){
      out.push(["Bamboo Joker", "1 phán"]);
    }
  }
  
  var chars = countCharacterJokers();
  if (seatWind == 3){
    phan += 2 * chars;
    if (chars > 1){
      out.push(["Character Joker (North) x" + chars, (2 * chars) + " phán"]);
    }
    else if (chars == 1){
      out.push(["Character Joker (North)", "2 phán"]);
    }
  }
  else{
    phan += chars;
    if (chars > 1){
      out.push(["Character Joker x" + chars, chars + " phán"]);
    }
    else if (chars == 1){
      out.push(["Character Joker", "1 phán"]);
    }
  }
  
  var bigFlowers = countFlowerJokers();
  phan += 2 * bigFlowers;
  if (bigFlowers > 1){
    out.push(["Big Flower x" + bigFlowers, (2 * bigFlowers) + " phán"]);
  }
  else if (bigFlowers == 1){
    out.push(["Big Flower", "2 phán"]);
  }
  
  var winds = countWindJokers();
  if (seatWind == 1){
    phan += 2 * winds;
    if (winds > 1){
      out.push(["Wind Joker (South) x" + winds, (2 * winds) + " phán"]);
    }
    else if (winds == 1){
      out.push(["Wind Joker (South)", "2 phán"]);
    }
  }
  else{
    phan += winds;
    if (winds > 1){
      out.push(["Wind Joker x" + winds, winds + " phán"]);
    }
    else if (winds == 1){
      out.push(["Wind Joker", "1 phán"]);
    }
  }
  
  var honors = countHonorJokers();
  if (seatWind == 1){
    phan += 2 * honors;
    if (honors > 1){
      out.push(["Honor Joker (South) x" + honors, (2 * honors) + " phán"]);
    }
    else if (honors == 1){
      out.push(["Honor Joker (South)", "2 phán"]);
    }
  }
  else if (seatWind == 2){
    phan += 2 * honors;
    if (honors > 1){
      out.push(["Honor Joker (West) x" + honors, (2 * honors) + " phán"]);
    }
    else if (honors == 1){
      out.push(["Honor Joker (West)", "2 phán"]);
    }
  }
  else{
    phan += honors;
    if (honors > 1){
      out.push(["Honor Joker x" + honors, honors + " phán"]);
    }
    else if (honors == 1){
      out.push(["Honor Joker", "1 phán"]);
    }
  }
  
  var dragons = countDragonJokers();
  if (seatWind == 2){
    phan += 2 * dragons;
    if (dragons > 1){
      out.push(["Dragon Joker (West) x" + dragons, (2 * dragons) + " phán"]);
    }
    else if (dragons == 1){
      out.push(["Dragon Joker (West)", "2 phán"]);
    }
  }
  else{
    phan += dragons;
    if (dragons > 1){
      out.push(["Dragon Joker x" + dragons, dragons + " phán"]);
    }
    else if (dragons == 1){
      out.push(["Dragon Joker", "1 phán"]);
    }
  }
  
  var numbers = countNumberJokers();
  if (seatWind == 3){
    phan += 3 * numbers;
    if (numbers > 1){
      out.push(["Number Joker (North) x" + numbers, (3 * numbers) + " phán"]);
    }
    else if (numbers == 1){
      out.push(["Number Joker (North)", "3 phán"]);
    }
  }
  else{
    phan += 2 * numbers;
    if (numbers > 1){
      out.push(["Number Joker x" + numbers, (2 * numbers) + " phán"]);
    }
    else if (numbers == 1){
      out.push(["Number Joker", "2 phán"]);
    }
  }
  
  if (phan == 0){
    out.push(["Chicken Hand", "0 phán"]);
  }
  
  if (!selfDraw && (isFlower(closedData[closedData.length - 1]) || isJoker(closedData[closedData.length - 1]))){
    phan += 6;
    out.push(["+Win on Discarded Flower/Joker", "1 mủn"]);
  }
  
  return phan;
}

function printScoring(out, phan){
  var content = "";
  var phantext = "";
  var payDouble = 1;
  var paySingle = 0.5;
  
  for(const i of out){
    var font = "";
    if (i[0].length > 25 || i[0].charAt(0) == '+'){font = " style=\"font-size: 0.75em\"";}
    content += "<div class=\"container\"><div" + font + ">" + i[0] + "</div><div>" + i[1] + "</div></div>";
  }
  
  if (phan >= 6){
    payDouble = Math.floor(phan / 6) * 64;
    paySingle = Math.floor(phan / 6) * 32;
    phantext += Math.floor(phan / 6) + " mủn";
    if (phan % 6 > 0){
      payDouble += 6 * (phan % 6);
      paySingle += 6 * (phan % 6);
      phantext += " " + phan % 6 + " phán";
    }
  }
  else{
    for (let i = 0; i < phan; i++){
      payDouble *= 2;
      paySingle *= 2;
    }
    phantext += phan + " phán";
  }
  
  if (paySingle < 1){paySingle = 1};
  
  scoringContent.innerHTML = content;
  phanField.innerHTML = phantext;
  if (selfDraw || phan == 0){
    payoutField.innerHTML = payDouble + " all (" + (3 * payDouble) + ")";
  }
  else{
    payoutField.innerHTML = payDouble + " / " + paySingle + " (" + (payDouble + 2 * paySingle) + ")";
  }
}

function printError(){
  scoringContent.innerHTML = "Invalid hand";
  phanField.innerHTML = "";
  payoutField.innerHTML = "";
}

function score(){
  if (scoreButton.style.opacity == 1){
    var hand = closedData.slice();
    var arrangements = [];
    
    if (eastRoundButton.checked){roundWind = 0;}
    if (southRoundButton.checked){roundWind = 1;}
    if (westRoundButton.checked){roundWind = 2;}
    if (northRoundButton.checked){roundWind = 3;}
    if (eastSeatButton.checked){seatWind = 0;}
    if (southSeatButton.checked){seatWind = 1;}
    if (westSeatButton.checked){seatWind = 2;}
    if (northSeatButton.checked){seatWind = 3;}
    if (selfDrawButton.checked){selfDraw = true;}
    if (dealInButton.checked){selfDraw = false;}
    
    sort(hand);
    console.clear();
    if (isThirteenOrphans(hand)){arrangements.push(hand);}
    arrange(hand, arrangements);
    
    var h = closedData.slice();
    arrangeSevenPairs(h, arrangements);
    
    var best = 0;
    
    for (let i = 0; i < arrangements.length; i++){
      console.log(arrangements[i]);
      
      var a = arrangements[i].slice()
      a.splice(a.indexOf(closedData[closedData.length - 1]), 1);
      
      console.log(findWaits(a))
      console.log(scoreHand(arrangements[i]));
      
      if(scoreHand(arrangements[i]) > scoreHand(arrangements[best])){
        best = i;
      }
    }
    
    if (arrangements.length > 0){
      var out = [];
      var phan = scoreHand(arrangements[best], out);
      printScoring(out, phan);
    }
    else{
      printError();
    }
  }
}
