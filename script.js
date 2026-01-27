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
    var closedhand = document.getElementById("closedhand");
    closedhand.appendChild(tile);
  }
}
