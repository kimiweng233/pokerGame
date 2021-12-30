import React, { useState, useEffect } from "react";
import services from '../services'
import { useNavigate } from "react-router-dom";
import SetUpDeck from "./cardGenerator";
import codeGenerator from './codeGenerator'

const Lobby = (props) => {
    const [roomCode, setRoomCode] = useState("")
    const [disabled, setDisabled] = useState(true)
    const navigate = useNavigate();

    const inputCode = e => {
        var input = e.target.value.toLowerCase()
        const val = input.charCodeAt(input.length-1)
        if (!(val >= 97 && val <= 122) && !(val >= 48 && val <= 57)) { input = input.slice(0, -1) }
        setRoomCode(input)    
    }

    function redirect(e) {
        e.preventDefault()
        const data = {
            "room_code": codeGenerator(6),
            "deck": SetUpDeck()
        }       
        services.createRoom(data).then(response => 
            navigate(`/game/${response.data['room_code']}`)
        )
    }

    function checkAndRedirect(e) {
        e.preventDefault()
        services.getRoom(roomCode).then(response => {
            navigate(`/game/${response.data['room_code']}`)
        }).catch(() => {
            alert("This room does not exsist, please check your room code!")
        })
    }

    useEffect(() => {
        setDisabled(!(roomCode.length === 6))
    }, [roomCode])

    return (
        <div>
            <form>
                <input value={roomCode} onChange={inputCode} maxLength="6" placeholder="Enter Room"></input>
                <button disabled={disabled} onClick={(e) => checkAndRedirect(e)}>Join</button>
                <p></p>
                <button onClick={(e) => redirect(e)}>Create Room</button>                
            </form>
        </div>
    )
}

export default Lobby;
