import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Report.css';
import globalWinRate from '../api/globalWinRates.png';
import handWinRate from '../api/globalHandWinRate.png';
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://hplnxayyijxebyklpoiz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s")


function Report({uid}) {
    const [getPlayerReport, setPlayerReport] = useState(0);
    const [getDBReport, setDBReport] = useState(0);
    const effectRef = useRef(false);
    const player_id = null;

    // Fetches the player's id
    const grabUserID = useCallback(async(player_id) => {
        try {
            const {data: userData} = await supabase.auth.getSession()
            const supabase_user_id = await userData.session.user.id
            const player_id_query = await supabase.from('player_stats').select('id').eq('user_id', supabase_user_id)
            player_id = player_id_query.data[0].id
            console.log(userData.session.user.id)
        }
        catch
        {
            player_id = 0;
        }
    }, [])

    useEffect(() => {
        if (!effectRef.current) {
            grabUserID();
            fetch('/analysis/user/' + player_id).then(data => {
                setPlayerReport(data.t_games);
            })
            fetch('/analysis/database').then(data => {
                setDBReport(data.t_games);
            });
        }
        return () => effectRef.current = true;
    }, [grabUserID]);

    return (
        <div className = "Report">
            <div className = "Split-Pane">
                <div className = "Left-Pane">
                    <img src = {globalWinRate} alt = "Pie Chart of Global Wins" width = "100%" className='img-thumbnail' />
                </div>
                <div className = "Right-Pane">
                    <img src = {handWinRate} alt = "Bar Chart of Global Wins" width = "100%" className='img-thumbnail' />
                </div>
            </div>
            <br></br>
            <div className = "GlobalWinDescription">
                <p className = "GlobalWinText">
                    Global Win Rates shown above contain the information for all users that have played. 
                    <br></br>
                </p>
            </div>
        </div>
    );
}

export default Report;