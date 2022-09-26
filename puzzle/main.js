let pieces = [];
let tray, box, winNote;

function initiate(){
  tray = document.getElementById("tray");
  box = document.getElementById("box");
  winNote = document.getElementById("winNote");

  createPieces();
}

function createPieces(){
  for(let i = 1; i<26; i++){
    let tempImg = document.createElement('img');
    tempImg.src = "images/pieces/"+i+".png";
    tempImg.id = i;

    tempImg.style.width = "120px";
    tempImg.style.height = "120px";
    
    tempImg.draggable="true";
    tempImg.ondragstart= drag;
    tempImg.droppble = "false";
    
    pieces.push(tempImg);
  }
  for(let i =0; i<pieces.length; i++){
    let num1 = Math.floor(Math.random()*pieces.length);
    let num2 = Math.floor(Math.random()*pieces.length);
    
    let temp = pieces[num1];
    pieces[num1] = pieces[num2];
    pieces[num2] = temp;
  }
  for(let i = 0; i<pieces.length; i++){
    tray.appendChild(pieces[i]);
  }
}

function allowDrop(event){
  event.preventDefault();
}
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  if(event.target.id == "tray" || event.target.id =="box"){
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    
    winNote.style.visibility = checkWin() ? "visible": "hidden" ;
  }
}

function checkWin(){
  let array = box.childNodes;
  if(box.childElementCount == 25){
    for(let i=1; i<26; i++){
      if(parseInt(array[array.length -i].id) != i)
        return false;
    }
    return true;
  }
  return false;
}


