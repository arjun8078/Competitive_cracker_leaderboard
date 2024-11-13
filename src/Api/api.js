
import axios from "axios";


const API_URL = "http://localhost:5000/api";


const api = axios.create({
  baseURL: API_URL,
});


export const register = (data) => api.post("/auth/register", data);


export const login = (data) => api.post("/auth/login", data);



export const getLeaderboard = (token) =>
  api.get("/auth/leaderboard", {
    headers: { Authorization: `Bearer ${token}` },
  });


export const updateScore = (id, score, token) =>
  api.patch(`/player/${id}/score`, { score }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  
