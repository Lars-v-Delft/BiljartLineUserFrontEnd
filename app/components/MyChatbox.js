'use client'
import { Client, Message } from '@stomp/stompjs';

export default function MyChatbox() {

    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/billiards-chat'
    });

    stompClient.onConnect = (frame) => {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat', (greeting) => {
            showGreeting(JSON.parse(greeting.body).content);
        });
    };

    stompClient.onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    function setConnected(connected) {
        $("#connect").prop("disabled", connected);
        $("#disconnect").prop("disabled", !connected);
        if (connected) {
            $("#conversation").show();
        }
        else {
            $("#conversation").hide();
        }
        $("#greetings").html("");
    }

    function connect() {
        stompClient.activate();
    }

    function disconnect() {
        stompClient.deactivate();
        setConnected(false);
        console.log("Disconnected");
    }

    function sendName() {
        stompClient.publish({
            destination: "/app/send",
            body: JSON.stringify({ 'content': $("#name").val() })
        });
    }

    function showGreeting(message) {
        $("#greetings").append("<tr><td>" + message + "</td></tr>");
    }

    // $(function () {
    //     $("form").on('submit', (e) => e.preventDefault());
    //     // $("#connect").click(() => connect());
    //     // $("#disconnect").click(() => disconnect());
    //     // $("#send").click(() => sendName());
    // });

    return (
        <div id="main-content" class="container">
            <div class="row">
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="connect">WebSocket connection:</label>
                            <button id="connect" class="btn btn-default" type="submit" onClick={connect}>Connect</button>
                            <button id="disconnect" class="btn btn-default" type="submit" onClick={disconnect} disabled="disabled">Disconnect
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="name">What is your name?</label>
                            <input type="text" id="name" class="form-control" placeholder="Your name here..." />
                        </div>
                        <button id="send" class="btn btn-default" type="submit" onClick={sendName}>Send</button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table id="conversation" class="table table-striped">
                        <thead>
                            <tr>
                                <th>Greetings</th>
                            </tr>
                        </thead>
                        <tbody id="greetings">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}