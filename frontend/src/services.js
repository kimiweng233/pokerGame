import http from "./http-common";
import axios from 'axios';

const getPlayers = room_code => {
  return http.get(`players-in-room/${room_code}/`);
};

const createRoom = data => {
  // --v
  return http.post("/create-room/", data);
};

const getRoom = key => {
  return http.get(`/get-room/${key}/`)
}

const createPlayer = data => {
  return http.post("/create-player/", data)
}

const getPlayer = key => {
  return http.get(`/get-player/${key}/`)
}

const getPlayerByCurrentID = id => {
  return http.get(`/get-player-by-current-id/${id}/`)
}

const updatePlayer = (key, data) => {
  return http.put(`/update-player/${key}/`, data);
};

const updatePlayerByCurrentID = (id, data) => {
  return http.put(`/update-player-by-current-id/${id}/`, data);
};

// const remove = id => {
//   return http.delete(`/tutorials/${id}`);
// };

// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };

// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };

const functions = {
    getPlayers,
    createRoom,
    getRoom,
    createPlayer,
    getPlayer,
    getPlayerByCurrentID,
    updatePlayer,
    updatePlayerByCurrentID,
};
export default functions