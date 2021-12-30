import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import services from '../services'
import codeGenerator from './codeGenerator'

function Game() {
    const {room_name} = useParams()
    const gameSocket = useRef(null)
    
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
                    console.log("No valid message received, weird dude")
            }
        }
        return () => {
            gameSocket.current.close()        
        }
    }, [])

    return (
        <div>
            <h1>Game Page</h1>
        </div>
    )
}

export default Game;
