// var arr = [
//     {name: "Petals of roses", image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=3786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
//     {name: "Animals of town", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     {name: "the crowd of city", image: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     {name: "fruits of planet", image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=3764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     {name: "orange peeled", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=3337&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
//     {name: "web design", image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
//     {name: "apple juice", image: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
// ]

// function showTheCards(){
//     var clutter = "";
//     arr.forEach(function(obj){
//         clutter += `<div class="box">
//         <img class="cursor-pointer" src="${obj.image}" alt="image">
//         <div class="caption">Lorem ipsum </div>
//     </div>`;
//     })

//     document.querySelector(".game-board")
//     .innerHTML = clutter;
// }

// function handleSearchFunctionality(){
//     var input = document.querySelector("#searchinput");

//     input
//     .addEventListener("focus", function(){
//         document.querySelector(".overlay").style.display = "block";
//     })

//     input
//     .addEventListener("blur", function(){
//         document.querySelector(".overlay").style.display = "none";
//     })

//     input
//     .addEventListener("input", function(){
//         const filteredArray = arr.filter(obj => obj.name.toLowerCase().startsWith(input.value));
//         var clutter = "";
//         filteredArray.forEach(function(obj){
//             clutter += `<div class="res flex px-8 py-3">
//             <i class="ri-search-line font-semibold mr-5"></i>
//             <h3 class="font-semibold">${obj.name}</h3>
//         </div>`
//         })
//     document.querySelector(".searchdata").style.display = "block";
//         document.querySelector(".searchdata").innerHTML = clutter;
//     })
// }

// handleSearchFunctionality();
// showTheCards();

// ------------------------------------------------------------------------
let gameboard = document.querySelector(".game-board");
let playBtn = document.querySelector(".play_btn");
let resetBtn = document.querySelector(".restart_btn");
const tiles = document.getElementsByClassName("btn");
let columns = 1;
let rows = 1;
let number = 1;
let randomTile;
let opacity = 40;

gameboard.style.display = "none";
resetBtn.style.display = "none";

playBtn.addEventListener("click", () => {
  gameStart();
  nextRound();
});

resetBtn.addEventListener("click", () => {
  gameboard.replaceChildren();
  columns = 1;
  rows = 1;
  number = 1;
  opacity = 40;
  gameboard.style.display = "none";
  playBtn.style.display = "block";
});

function gameStart() {
  gameboard.style.display = "grid";
  playBtn.style.display = "none";
  resetBtn.style.display = "block";
}

function gridChecker() {
  if (columns < 10 && rows < 10) {
    gameboard.style.gridTemplateColumns = `repeat(${++columns},1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${++rows},1fr)`;
  }
}

function tileSelect() {
  document.body.addEventListener("click", tileEventListenerAdder);
}

const tileEventListenerAdder = (e) => {
  if (e.target.matches(".btn")) {
    if (randomTile === e.target) nextRound();
    else {
      document.body.removeEventListener("click", tileEventListenerAdder);
      alert("You selected Wrong Tile!");
      gameRestart();
    }
  }
};

function nextRound() {
  if (gameboard.hasChildNodes()) gameboard.replaceChildren();
  gridChecker();
  tileGenerator();
  pickTileRandom();
  tileSelect();
}

function pickTileRandom() {
  let tileNo = Math.floor(Math.random() * number);
  if (0 === tileNo) tileNo++;
  randomTile = document.getElementById(`${tileNo}`);

  const allTileColor = `${pickColor()}`;
  for (const tile of tiles) tile.style.backgroundColor = `${allTileColor}`;

  if (opacity <= 85) randomTile.style.opacity = `${(opacity += 5)}%`;
  else randomTile.style.opacity = `${opacity}%`;

  gameboard.style.backgroundColor = `${pickColor()}`;
  gameboard.style.boxShadow = `0px 0px 100px 0px ${allTileColor}`;
}

const pickColor = () => {
  const hex = "0123456789ABCDEF";
  let color = "#";
  for (let i = 1; i <= 6; i++) color += hex[Math.floor(Math.random() * 16)];
  return color;
};

const tileGenerator = () => {
  let btn;
  for (number = 1; number <= columns * rows; ++number) {
    btn = document.createElement("div");
    btn.setAttribute("id", `${number}`);
    btn.classList.toggle("btn");
    gameboard.appendChild(btn);
  }
};

const gameRestart = () => {
  columns = 1;
  rows = 1;
  number = 1;
  randomTile;
  opacity = 40;
  gameboard.style.display = "none";
  resetBtn.style.display = "none";
  playBtn.style.display = "block";
};
