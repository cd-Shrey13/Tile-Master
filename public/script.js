document.addEventListener("contextmenu", (event) => event.preventDefault());

const gameboard = document.querySelector(".game-board");
const playBtn = document.querySelector(".play_btn");
const resetBtn = document.querySelector(".restart_btn");
const tiles = document.getElementsByClassName("btn");
const scoreBtn = document.querySelector(".scoreBtn");
let score = 0;
let columns = 1;
let rows = 1;
let number = 1;
let randomTile;
let opacity = 40;

gameboard.style.display = "none";
resetBtn.style.display = "none";
scoreBtn.style.display = "none";

playBtn.addEventListener("click", () => {
  gameStart();
  nextRound();
});

resetBtn.addEventListener("click", () => {
  gameboard.replaceChildren();
  score = 0;
  scoreBtn.textContent = `Score: ${score}`;
  columns = 1;
  rows = 1;
  number = 1;
  opacity = 40;
  gameboard.style.display = "none";
  playBtn.style.display = "block";
});

const gameStart = () => {
  gameboard.style.display = "grid";
  playBtn.style.display = "none";
  resetBtn.style.display = "block";
  scoreBtn.style.display = "block";
};

const gridChecker = () => {
  if (columns < 10 && rows < 10) {
    gameboard.style.gridTemplateColumns = `repeat(${++columns},1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${++rows},1fr)`;
  }
};

const tileSelect = () => {
  document.body.addEventListener("click", tileEventListenerAdder);
};

const tileEventListenerAdder = (e) => {
  if (e.target.matches(".btn")) {
    if (randomTile === e.target) {
      scoreBtn.textContent = `Score: ${(score += 100)}`;
      nextRound();
    } else {
      score = 0;
      scoreBtn.textContent = `Score: ${score}`;
      document.body.removeEventListener("click", tileEventListenerAdder);
      alert("You selected Wrong Tile!");
      gameRestart();
    }
  }
};

const nextRound = () => {
  if (gameboard.hasChildNodes()) gameboard.replaceChildren();
  gridChecker();
  tileGenerator();
  pickTileRandom();
  tileSelect();
};

const pickTileRandom = () => {
  let tileNo = Math.floor(Math.random() * number);
  if (0 === tileNo) tileNo++;
  randomTile = document.getElementById(`${tileNo}`);

  const allTileColor = `${pickColor()}`;
  for (const tile of tiles) tile.style.backgroundColor = `${allTileColor}`;

  if (opacity <= 85) randomTile.style.opacity = `${(opacity += 5)}%`;
  else randomTile.style.opacity = `${opacity}%`;

  gameboard.style.backgroundColor = `${pickColor()}`;
  gameboard.style.boxShadow = `0px 0px 100px 0px ${allTileColor}`;
};

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
