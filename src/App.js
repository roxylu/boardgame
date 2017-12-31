import Client from 'boardgame.io/client';
import Game from 'boardgame.io/game';

import {TicTacToeBoard} from './board';


function IsVictory(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return {...G, cells};
    }
  },

  victory: (G, ctx) => {
    return IsVictory(G.cells) ? ctx.currentPlayer : null;
  }
});

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard
});

export default App;
