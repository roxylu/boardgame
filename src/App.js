import Client from 'boardgame.io/client';
import Game from 'boardgame.io/game';

import {TicTacToeBoard} from './board';


function IsVictory(cells) {
  // TODO: Add victory condition
  return true;
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
