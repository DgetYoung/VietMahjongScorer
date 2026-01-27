function initialize(){
  for (let i = 0; i < 14; i++){
    var tile = document.createElement("img");
    tile.src = "graphics/99.png";
    tile.style.height = "26px";
    tile.style.width = "20px";
    tile.style.margin = "5px";
    var closedhand = document.getElementById("closedhand");
    closedhand.appendChild(tile);
  }
}
