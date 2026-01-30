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

var flowerHand = document.getElementById("flowerhand");
var openHand = document.getElementById("openhand");
var closedHand = document.getElementById("closedhand");

var chowButton = document.getElementById("chowbutton");
var pungButton = document.getElementById("pungbutton");
var openQuadButton = document.getElementById("openquadbutton");
var closedQuadButton = document.getElementById("closedquadbutton");
var flowerButton = document.getElementById("flowerbutton");
var tileButtons = document.getElementsByClassName("tilebutton");

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
  return isPair(t.slice(0,2)) && isPair(t.slice(1,3)) && isPair([t[0], t[2]]);
}

function isGroup(g){
  return isRun(g) || isTriplet(g);
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

function checkValid(hand){
  var h = hand.slice();
  var arrangements = [];
  
  arrange(h, arrangements);
  
  return arrangements.length;
}

function findWaits(hand){
  waits = [];
  
  if (hand.length % 3 == 1){
    for (const t of tileButtons){
      if (!isJoker(Number(t.id)) && !isFlower(Number(t.id))){
        var h = hand.slice();
      
        h.push(Number(t.id));
        if (checkValid(h)){
          waits.push(Number(t.id));
        }
      }
    }
  }
  
  return waits;
}

function isRobbingAQuad(){
  return false;
}

function isReplacementTile(){
  return false;
}

function isLastTile(){
  return false;
}

function isBlessingOfHeaven(){
  return false;
}

function isBlessingOfEarth(){
  return false;
}

function isBlessingOfMan(){
  return false;
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
  return false;
}

function isFullyClosed(hand){
  return false;
}

function isSingleRunsClosed(hand){
  return isSingleWait(hand) && isAllRuns(hand) && isFullyClosed(hand);
}

function countDragonSets(hand){
  var dragons = 0;
  
  return dragons;
}

function isSeatWind(hand){
  return false;
}

function isRoundWind(hand){
  return false;
}

function countQuads(hand){
  var quads = 0;
  
  return quads;
}

function isSevenPairs(hand){
  return false;
}

function isAllSets(hand){
  return false;
}

function isAllCalled(hand){
  return false;
}

function isHalfFlush(hand){
  return false;
}

function isFullFlush(hand){
  return false;
}

function isAllTerminalsAndHonors(hand){
  return false;
}

function isLittleThreeDragons(hand){
  return false;
}

function isBigThreeDragons(hand){
  return false;
}

function isThirteenOrphans(hand){
  return false;
}

function isNineGates(hand){
  return false;
}

function isAllTerminals(hand){
  return false;
}

function isFourClosedSets(hand){
  return false;
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
  return false;
}

function isLittleFourWinds(hand){
  return false;
}

function isBigFourWinds(hand){
  return false;
}

function isNoFlowersNoLeaves(hand){
  return false;
}

function isNoJokers(hand){
  return false;
}

function countSeatFlowers(){
  var flowers = 0;
  
  for (const f of flowerData){
    if (!isJoker(f) && (f % 10) % 4 == seatWind){
      flowers++;
    }
  }
  
  return flowers;
}
  
function countBouquets(hand){
  var bouquets = 0;
  
  return bouquets;
}
  
function countAnythingJokers(hand){
  var anythings = 0;
  
  return anythings;
}
  
function countDotJokers(hand){
  var dots = 0;
  
  return dots;
}
  
function countBambooJokers(hand){
  var bams = 0;
  
  return bams;
}
  
function countCharacterJokers(hand){
  var chars = 0;
  
  return chars;
}
  
function countFlowerJokers(hand){
  var bigFlowers = 0;
  
  return bigFlowers;
}
  
function countWindJokers(hand){
  var winds = 0;
  
  return winds;
}
  
function countHonorJokers(hand){
  var honors = 0;
  
  return honors;
}
  
function countDragonJokers(hand){
  var dragons = 0;
  
  return dragons;
}
  
function countNumberJokers(hand){
  var numbers = 0;
  
  return numbers;
}
  
function countJokerSets(hand){
  var jokerSets = 0;
  
  return jokerSets;
}

function scoreHand(hand, out = []){
  var phan = 0;
  var big = 0;
  var bonus = 0;
  out.length = 0;
  
  if (isBigFourWinds(hand)){
    big += 1;
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
    big += 1;
    phan += 30;
    out.push(["Four Closed Quads", "5 mủn"]);
  }
  
  if (isLittleFourWinds(hand)){
    big += 1;
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
    big += 1;
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
      big += 1;
      phan += 24;
      out.push(["Four Quads", "4 mủn"]);
    }
    if (isFourClosedSets(hand)){
      big += 1;
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
  
  if (isAllTerminals(hand)){
    big += 1;
    if (isNoJokers(hand)){
      phan += 24;
      out.push(["All Terminals (no jokers)", "4 mủn"]);
    }
    else{
      phan += 18;
      out.push(["All Terminals", "3 mủn"]);
    }
  }
  
  if (isNineGates(hand)){
    big += 1;
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
    big += 1;
    bonus -= 1;
    if (isNoJokers(hand)){
      phan += 19;
      out.push(["Thirteen Orphans (no jokers)", "19 phán"]);
    }
    else{
      phan += 13;
      out.push(["Thirteen Orphans", "13 phán"]);
    }
  }
  
  if (isBlessingOfHeaven()){
    big += 1;
    phan += 12;
    out.push(["Blessing of Heaven", "2 mủn"]);
  }
  
  if (isBlessingOfEarth()){
    big += 1;
    phan += 12;
    out.push(["Blessing of Earth", "2 mủn"]);
  }
  
  if (isBlessingOfMan()){
    big += 1;
    phan += 12;
    out.push(["Blessing of Man", "2 mủn"]);
  }
  
  if (isBigThreeDragons(hand)){
    big += 1;
    bonus += 3;
    if (isNoJokers(hand)){
      phan += 15;
      out.push(["Big Three Dragons (no jokers)", "15 phán"]);
    }
    else{
      phan += 9;
      out.push(["Big Three Dragons", "9 phán"]);
    }
  }
  
  if (isNoFlowersNoLeaves(hand)){
    big += 1;
    phan += 6;
    out.push(["No Flowers, No Leaves", "1 mủn"]);
  }
  
  if (isLittleThreeDragons(hand)){
    big += 1;
    if (isNoJokers(hand)){
      phan += 12;
      out.push(["Little Three Dragons (no jokers)", "2 mủn"]);
    }
    else{
      phan += 6;
      out.push(["Little Three Dragons", "1 mủn"]);
    }
  }
  
  if (isAllTerminalsAndHonors(hand)){
    big += 1;
    phan += 6;
    out.push(["All Terminals and Honors", "1 mủn"]);
  }
  
  if (isFullFlush(hand)){
    big += 1;
    if (isNoJokers(hand)){
      phan += 12;
      out.push(["Full Flush (no jokers)", "2 mủn"]);
    }
    else{
      phan += 6;
      out.push(["Full Flush", "1 mủn"]);
    }
  }
  
  if (isHalfFlush(hand)){
    big += 1;
    bonus += 3;
    phan += 3;
  }
  
  if (isAllCalled(hand)){
    big += 1;
    if (isNoJokers(hand)){
      bonus += 2;
      phan += 4;
      out.push(["All Called (no jokers)", "4 phán"]);
    }
    else{
      bonus += 3;
      phan += 3;
      out.push(["All Called", "3 phán"]);
    }
  }
  
  if (isAllSets(hand)){
    big += 1;
    if (isNoJokers(hand)){
      bonus += 2;
      phan += 4;
      out.push(["All Sets (no jokers)", "4 phán"]);
    }
    else{
      bonus += 3;
      phan += 3;
      out.push(["All Sets", "3 phán"]);
    }
  }
  
  if (isSingleRunsClosed(hand)){
    big += 1;
    bonus += 3;
    phan += 3;
    out.push(["Single Wait-All Runs-Fully Closed Hand", "3 phán"]);
  }
  
  if (big > 1){
    phan += bonus;
    out.push(["+Rounding Bonus", bonus + " phán"]);
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
  
  if (isRoundWind(hand)){
    phan += 1;
    out.push(["Round Wind Set", "1 phán"]);
  }
  
  if (isSeatWind(hand)){
    phan += 1;
    out.push(["Seat Wind Set", "1 phán"]);
  }
  
  var dragons = countDragonSets(hand);
  for (let i = 0; i < dragons; i++){
    phan += 1;
    out.push(["Dragon Set", "1 phán"]);
  }
  
  var quads = countQuads(hand);
  for (let i = 0; i < quads; i++){
    phan += 1;
    out.push(["Quad", "1 phán"]);
  }
  
  if (isSevenPairs(hand)){
    phan += 1;
    out.push(["Seven Pairs", "1 phán"]);
  }
  
  var bouquets = countBouquets(hand);
  for (let i = 0; i < bouquets; i++){
    phan += 6;
    out.push(["Bouquet", "1 mủn"]);
  }
  
  var flowers = countSeatFlowers();
  for (let i = 0; i < flowers; i++){
    phan += 1;  
    out.push(["Seat Flower", "1 phán"]);
  }
  
  var jokerSets = countJokerSets();
  for (let i = 0; i < jokerSets; i++){
    phan += 6;
    out.push(["Joker Set", "1 mủn"]);
  }
  
  var anythings = countAnythingJokers();
  for (let i = 0; i < anythings; i++){
    if (seatWind == 0){
      phan += 2;
      out.push(["Anything Joker (East)", "3 phán"]);
    }
    else{
      phan += 2;
      out.push(["Anything Joker", "2 phán"]);
    }
  }
  
  var dots = countDotJokers();
  for (let i = 0; i < dots; i++){
    phan += 1;
    out.push(["Dot Joker", "1 phán"]);
  }
  
  var bams = countBambooJokers();
  for (let i = 0; i < bams; i++){
    phan += 1;
    out.push(["Bam Joker", "1 phán"]);
  }
  
  var chars = countCharacterJokers();
  for (let i = 0; i < anythings; i++){
    phan += 1;
    out.push(["Char Joker", "1 phán"]);
  }
  
  var bigFlowers = countFlowerJokers();
  for (let i = 0; i < bigFlowers; i++){
    phan += 2;
    out.push(["Big Flower", "2 phán"]);
  }
  
  var winds = countWindJokers();
  for (let i = 0; i < winds; i++){
    phan += 1;
    out.push(["Wind Joker", "1 phán"]);
  }
  
  var honors = countHonorJokers();
  for (let i = 0; i < honors; i++){
    phan += 1;
    out.push(["Honor Joker", "1 phán"]);
  }
  
  var dragons = countDragonJokers();
  for (let i = 0; i < dragons; i++){
    phan += 1;
    out.push(["Dragon Joker", "1 phán"]);
  }
  
  var numbers = countNumberJokers();
  for (let i = 0; i < dragons; i++){
    phan += 2;
    out.push(["Number Joker", "1 phán"]);
  }
  
  if (phan == 0){
    out.push(["Chicken Hand", "0 phán"]);
  }
  
  return phan;
}

function printScoring(out){
  var content = "";
  
  for(const i of out){
    content += "<div class=\"container\"><div>" + i[0] + "</div><div>" + i[1] + "</div></div>";
    content += "<div class=\"container\"><div>" + i[0] + "</div><div>" + i[1] + "</div></div>";
  }
  
  scoringContent.innerHTML = content;
}

function score(){
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
  
  //log waits
  /* var h = hand.slice();
  h.splice(h.indexOf(closedData[closedData.length - 1]), 1);
  
  console.log(findWaits(h)); */
  
  arrange(hand, arrangements);
  
  var best = 0;
  
  for (let i = 0; i < arrangements.length; i++){
    console.log(arrangements[i]);
    console.log(scoreHand(arrangements[i]));
    
    if(scoreHand(arrangements[i]) > scoreHand(arrangements[best])){
      best = i;
    }
  }
  
  var out = [];
  scoreHand(arrangements[best], out);
  
  console.log(out);
  printScoring(out);
}
