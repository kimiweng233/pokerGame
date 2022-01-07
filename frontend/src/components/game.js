import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import services from '../services'
import codeGenerator from './codeGenerator'
import '../statics/css/general.css';
import Profile from './profile'

function Game() {
    const {room_name} = useParams()
    const gameSocket = useRef(null)
    const game = useRef()
    const [name, setName] = useState("testing")
    const [wager, setWager] = useState(0)

    const [pfp1, setPfp1] = useState([])
    const [pfp2, setPfp2] = useState([])
    const [pfp3, setPfp3] = useState([])
    const [pfp4, setPfp4] = useState([])
    const [pfp5, setPfp5] = useState([])
    const [pfp6, setPfp6] = useState([])
    const [pfp7, setPfp7] = useState([])
    const [pfp8, setPfp8] = useState([])

    const [card1, setCard1] = useState([1, "hearts"])
    const [card2, setCard2] = useState([11, "hearts"])
    const [card3, setCard3] = useState([])
    const [card4, setCard4] = useState([])
    const [card5, setCard5] = useState([])
    const [card6, setCard6] = useState([])
    const [card7, setCard7] = useState([])
    const [card8, setCard8] = useState([])
    const [card9, setCard9] = useState([])
    const [card10, setCard10] = useState([])
    const [card11, setCard11] = useState([])
    const [card12, setCard12] = useState([])
    const [card13, setCard13] = useState([])
    const [card14, setCard14] = useState([])
    const [card15, setCard15] = useState([])
    const [card16, setCard16] = useState([])
    const [card17, setCard17] = useState([])
    const [card18, setCard18] = useState([])
    const [card19, setCard19] = useState([])
    const [card20, setCard20] = useState([])
    const [card21, setCard21] = useState([])
    const [card22, setCard22] = useState([])

    const toggleSeat = (message) => {
        console.log(message)
    }

    const maxHeight = window.screen.availHeight
    const maxWidth = window.screen.availWidth

    function reportWindowSize(){
        var heightProportion = window.innerHeight / maxHeight
        var widthProportion = window.innerWidth / maxWidth
        game.current.style.transform = "translate(-50%, -50%)scale("+Math.min(heightProportion, widthProportion).toString()+")"
    }

    useEffect(() => {
        game.current.style.height = maxHeight.toString() + "px"
        game.current.style.width = maxWidth.toString() + "px"
        reportWindowSize()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', reportWindowSize);
    }, [])

    useEffect(() => {
        gameSocket.current = new WebSocket('ws://' + '127.0.0.1:8000' + '/ws/' + room_name + '/')
        gameSocket.current.onopen = function open() { 

        }
        gameSocket.current.onmessage = function(e) {
            var data = JSON.parse(e.data)
            data = data['message']
            var action = data['action']
            switch(action) {
                case 'register':
                    if (localStorage.getItem(room_name) == null) {
                        localStorage.setItem(room_name, JSON.stringify([]))
                    }
                    var key_db = data['players']
                    var key_local = JSON.parse(localStorage.getItem(room_name))
                    var payload
                    const intersections = key_db.filter(element => {
                        var local_keys = []
                        for (var i=0; i<key_local.length; i++) {
                            local_keys.push(key_local[i][0])
                        }
                        return local_keys.includes(element['key']) && element['present'] === false
                    });
                    if (intersections.length === 0) {
                        var players = JSON.parse(localStorage.getItem(room_name))
                        players.push([data['player'],[]])
                        localStorage.setItem(room_name, JSON.stringify(players))
                        payload = { 'action':'new player' }
                    } else {
                        payload = {
                            'action':'returning player',
                            'key':intersections[0]['key']
                        }
                    }
                    gameSocket.current.send(JSON.stringify({ 'message': payload })); 
                    break
                case "set session key":
                    sessionStorage.setItem("identification", data["key"])
                    break
                case "fill hand":                   
                    var storage = JSON.parse(localStorage.getItem(room_name))
                    for (var i=0; i<4; i++) {
                        if (storage[i][0] === data['player']) {
                            storage[i][1] = data['hand']                         
                            break
                        }
                    }                   
                    localStorage.setItem(room_name, JSON.stringify(storage))
                    break;
                default:
                    alert("error")
            }
        }
        return () => {
            gameSocket.current.close()        
        }
    }, [])

    return (
        <div className="game" ref={game}>
            <img src={window.location.origin + '/resources/tabledemo.png'} alt="error" className="tabu"></img>

            <div className="card card1" style={{backgroundImage:`url(${window.location.origin}/resources/cards/${card1[0]}_of_${card1[1]}.png)`}}></div>
            <div className="card card2" style={{backgroundImage:`url(${window.location.origin}/resources/cards/${card2[0]}_of_${card2[1]}.png)`}}></div>
            
            <Profile buttonStyle="button1" pfpStyle="profile1" profile={pfp1} func={() => setPfp1([name, wager])}/>

            <div className="profile profile2">
                <div className="flexcontainer">
                    <h3 className="nameTag">{name}</h3>
                    <p className="wagerText">wager: {wager}</p>
                </div>
            </div>
            <div className="profile profile3">
                <div className="flexcontainer">
                    <h3 className="nameTag">{name}</h3>
                    <p className="wagerText">wager: {wager}</p>
                </div>
            </div>
            <div className="profile profile4">
                <div className="flexcontainer">
                    <h3 className="nameTag">{name}</h3>
                    <p className="wagerText">wager: {wager}</p>
                </div>
            </div>
            <div className="profile profile5">
                <div className="flexcontainer">
                    <h3 className="nameTag">{name}</h3>
                    <p className="wagerText">wager: {wager}</p>
                </div>
            </div>
            <div className="profile profile6">
                <div className="flexcontainer">
                    <h3 className="nameTag">{name}</h3>
                    <p className="wagerText">wager: {wager}</p>
                </div>
            </div>
            <div className="profile profile7">
                <div className="flexcontainer">
                    <h3 className="nameTag">{name}</h3>
                    <p className="wagerText">wager: {wager}</p>
                </div>
            </div>
            <div className="profile profile8">
                <div className="flexcontainer">
                    <h3 className="nameTag">{name}</h3>
                    <p className="wagerText">wager: {wager}</p>
                </div>
            </div>
        </div>
    )
}

export default Game;
