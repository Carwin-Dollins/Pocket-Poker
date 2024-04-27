
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://hplnxayyijxebyklpoiz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s");
export const Home = (props) => {
    try {
    const session = supabase.auth.getSession()
    console.log(session)
    } catch(e) {
        console.log(e)
    }
    return(
        <div>
            
        </div>
    )
}

export default Home;