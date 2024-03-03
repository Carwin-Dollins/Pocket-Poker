import './App.css';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://hplnxayyijxebyklpoiz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s");

function App() {
  const [player_stats, setPlayer] = useState([]);

    useEffect(() => {
      getPlayer();
    }, []);

    async function getPlayer() {
      const { data } = await supabase.from("player_stats").select();
      setPlayer(data);
    }

    return (
      <ol>
        {player_stats.map((player) => (
          <><li key={player.username}>{player.username}</li><ul>
            <li key={player.name}>name: {player.name}</li>
            <li key={player.email}>email: {player.email}</li>
            <li key={player.id}>id: {player.id}</li>
            <li key={player.wins}>wins: {player.wins}</li>
          </ul></>
          
        ))}
      </ol>
    );
}

export default App;
