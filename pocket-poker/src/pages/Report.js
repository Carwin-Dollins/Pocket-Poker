import React, { useState, useEffect, useRef } from 'react';
import './Report.css';
import globalWinRate from '../api/globalWinRates.png';
import handWinRate from '../api/globalHandWinRate.png';

function Report({uid}) {
    const [getPlayerReport, setPlayerReport] = useState(0);
    const [getDBReport, setDBReport] = useState(0);
    const effectRef = useRef(false);

    useEffect(() => {
        if (!effectRef.current) {
            fetch('/analysis/database').then(res => res.json()).then(data => {
                setDBReport(data.time);
            });
        }
        return () => effectRef.current = true;
    }, []);

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
                    Total number of games played: {getDBReport}
                </p>
            </div>
        </div>
    );
}

export default Report;