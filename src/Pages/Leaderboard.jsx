import { useEffect, useState } from "react";
import { getLeaderboard,updateScore } from "../Api/api";


const Leaderboard = () => {
    const [players, setPlayers] = useState([]); 
    const [error, setError] = useState(""); 
    const [editScore, setEditScore] = useState({});
    const userRole = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
   
  
    useEffect(() => {
      const fetchLeaderboard = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view the leaderboard.");
          return;
        }
  
        try {
          const response = await getLeaderboard(token);
          setPlayers(response.data);
        } catch (err) {
          setError("Error fetching leaderboard.");
        }
      };
  
      fetchLeaderboard();
    }, []);
  
    
    const handleUpdateScore = async (id) => {
      const token = localStorage.getItem("token");
      try {
        await updateScore(id, editScore[id], token);
        setEditScore({ ...editScore, [id]: "" }); 
       
        const response = await getLeaderboard(token);
        setPlayers(response.data);
      } catch (error) {
        setError("Failed to update score");
      }
    };
  
  
  return (
    <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-7xl mx-auto p-5 bg-white rounded-lg shadow-xl">
      <h2 className="text-4xl font-semibold text-center text-gray-700 mb-6">Leaderboard</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-lg text-gray-600">Rank</th>
            <th className="py-2 px-4 text-left text-lg text-gray-600">Name</th>
            <th className="py-2 px-4 text-left text-lg text-gray-600">Score</th>
            <th className="py-2 px-4 text-left text-lg text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player._id} className="border-t">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{player.name}</td>
              <td className="py-2 px-4">{player.score}</td>
              <td className="py-2 px-4">
               
                {(userRole === "admin" || userId === player._id) && (
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={editScore[player._id] || ""}
                      onChange={(e) =>
                        setEditScore({ ...editScore, [player._id]: e.target.value })
                      }
                      className="border rounded px-2 py-1 mr-2"
                      placeholder="New score"
                    />
                    <button
                      onClick={() => handleUpdateScore(player._id)}
                      className="px-4 py-1 bg-blue-500 text-white rounded"
                    >
                      Update
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Leaderboard