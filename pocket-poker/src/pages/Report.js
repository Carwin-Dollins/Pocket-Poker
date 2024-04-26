import React, { useState, useEffect } from 'react';

function Report() {
    const [getPlayerReport, setPlayerReport] = useState(0);
    const [getDBReport, setDBReport] = useState(0);

    useEffect(() => {
        fetch("/analysis/database").then(data => {setDBReport(data.getDBReport)})
    }, [])

    return (
        <div className="Report">
            <p>
                Output: blahblahblah
            </p>
            <br></br>
            <br></br>
            <p>
                more talking
            </p>
        </div>
    );
}

export default Report;