import './App.css';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://hplnxayyijxebyklpoiz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s");

function App() {
  const [player_stats, setPlayer] = useState([]);
  const [player_earned, setEarned] = useState(0.0);
    useEffect(() => {
      //getPlayer()
    }, []);

    useEffect(() => {
      //getPlayer();
      //Login('User2name2', 'Password2');
      //gameWin('Username3', 30.23)
      //getPlayer();
      Login('Username3', 'Password3', 'email3@gmail.com');
      
      gameWin('Username3', 30.23)
      Login('Username3', 'Password3', 'email3@gmail.com');
    }, []);
    

    useEffect(() => {
      //createPlayer('Username3', 'Password3', 'email3@gmail.com')
    }, [])
    useEffect(() => {
      //getPlayer()
      
    }, [])
    async function getPlayer() {
      const { data } = await supabase.from("player_stats").select()
      //const { data2 } = await supabase.from("player_stats").select();
      setPlayer(data);
    }

    async function Login(username, password) {
      const { data } = await supabase.from("player_stats").select().eq(`username`, username).eq('password', password);
      setPlayer(data);
      setEarned(player_stats.earnings)
      //const { data } = await supabase.from("player_stats").update({ earnings: winning }).eq(`username`, username);
      //const { data2 } = await supabase.from("player_stats").select().eq(`username`, username);
    }

    async function gameWin(username, winning) {
      const { data } = await supabase.from("player_stats").select().eq(`username`, username);    
      console.log(player_stats[0])
      const { data1 } = await supabase.from("player_stats").update({ earnings: player_stats[0].earnings + winning }).eq(`username`, username);
      setPlayer(data)
      
      //setPlayer(data2);
    }
    async function createPlayer(usename, passwd, eml) {
      const { error } = await supabase.from("player_stats").insert({username: usename, password: passwd, email: eml, name: "", wins: 0, earnings: 0.00});
      const { data } = await supabase.from("player_stats").select().eq(`username`, usename).eq('password', passwd);
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
            <li key={player.earnings}>earned: {player.earnings}</li>
          </ul></>
          
        ))}
      </ol>
    );
}

export default App;
