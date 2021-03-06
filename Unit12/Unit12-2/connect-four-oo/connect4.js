"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {
  constructor(height, width) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.currPlayer = 1; // active player: 1 or 2
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.firstGame = true;
    this.endGameFlag = false;
    this.x = undefined;
    this.p1 = undefined;
    this.p2 = undefined;
    this.makePlayers();
    this.makeBoard();
    this.makeHtmlBoard();
    this.makeStartButton();
    this.addChangeColors();
  }
  //^^^^^^^^^^^^^^^^^^^^^^END CONSTRUCTOR^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  addChangeColors() {
    const form = document.querySelector("#input-form");
    //* arrow function used here allows correct this binding
    form.addEventListener("click", (event) => {
      event.preventDefault();
      if (!(event.target.id === "ply1" || event.target.id === "ply2")) {
        this.p1.color = form.player1color.value;
        this.p2.color = form.player2color.value;
      }
    });
  }

  /** makeStartButton: create Start Button on top of game board*/
  makeStartButton() {
    const startBtn = document.createElement("button");
    startBtn.setAttribute("id", "start-button");
    startBtn.innerText = "Click to start game";
    startBtn.style.marginBottom = "7px";
    const body = document.querySelector("body");
    body.prepend(startBtn);
    startBtn.addEventListener("click", this.handleStartClick.bind(this));
  }
  /** handle click of start button*/
  handleStartClick() {
    /** add event listener to top row of selector cells */
    const top = document.querySelector("#column-top");
    /** only bind event listener once (firstGame) otherwise
     * a single click will process twice 2nd game, 3 times
     * third game, etc.
     */
    if (this.firstGame || this.endGameFlag) {
      this.x = this.handleClick.bind(this);
      top.addEventListener("click", this.x);

      this.firstGame = false;
    }

    this.currPlayer = this.p1;

    /** remove spots form html board */
    const allSpots = document.querySelectorAll("td>div");
    // console.log("allSpots", allSpots);
    for (let spot of allSpots) {
      spot.remove();
    }

    /** empty internal board*/
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        this.board[y][x] = undefined;
      }
    }
  }
  /** make players */
  makePlayers() {
    this.p1 = new Player(1);
    this.p2 = new Player(2);
    this.currPlayer = this.p1;
  }

  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    const board = document.getElementById("board");

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add(`p${this.currPlayer.player}`);
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = this.currPlayer.color;
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    alert(msg);
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", this.x);
    this.endGameFlag = true;
  }

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin.call(this)) {
      return this.endGame(`Player ${this.currPlayer.player} won!`);
    }

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    // switch players
    this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (
          _win.call(this, horiz) ||
          _win.call(this, vert) ||
          _win.call(this, diagDR) ||
          _win.call(this, diagDL)
        ) {
          return true;
        }
      }
    }
  }

  // // makeBoard();
  // // makeHtmlBoard();
  //!end of Game class
}
class Player {
  constructor(player) {
    this.color = undefined;
    this.player = player;
  }
}
new Game(6, 7);
