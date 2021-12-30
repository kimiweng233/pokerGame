import Game from './components/game.js'
import Lobby from './components/lobby.js'
import { Route, Routes} from "react-router-dom";

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/game/:room_name" element={<Game />} />
        </Routes>
      </div>
  );
}

export default App;