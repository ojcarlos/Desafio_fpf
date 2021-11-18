import {  useState } from 'react';
import { Button } from '../Button'
import { Container, Hour, Text, ContainerButton} from './styles'
import io from 'socket.io-client'


export function Greetings() {
  
  const [id, setId] = useState("")
  const [requestAllow, setRequestAllow] = useState(true);
  const [unlockAllow, setUnlockAllow] = useState(false);
  const [lockAllow, setLockAllow] = useState(false);
  const [hour, setHour] = useState("00:00:00")
  const [status, setStatus] = useState("Unlock")
  const socket = io("http://localhost:3333")

  function handleRequest() {
    socket.emit("access", {
      "command": "RequestAccess",
       "payload": {
       }
    })
  }

  function handleLock() {
    setStatus("Lock");
    socket.emit("lock", {
      "command": "RequestLock",
       "payload": {
         "token": id
       }
    })
  }

  function handleUnlock() {
    socket.emit("unlock", {
      "command": "UnlockService",
       "payload": {
        "token": id
       }
    })
  }
  
  socket.on("id", (data) =>{
    if (data.response === "RequestAccessOk"){
      setId(data.payload.token)
      setRequestAllow(false);
      setLockAllow(true);
      setUnlockAllow(false);
    }
  } )

  socket.on("time", (data) =>{
    if (data.response === "BitTimeEvent"){
      setHour(data.payload.time)
      
    }
  } )

  socket.on("lockOK", (data) =>{
    if (data.response === "RequestLockOk"){
      setRequestAllow(false);
      setLockAllow(false);
      setUnlockAllow(true);
      setStatus("Lock");
    }
  } )

  socket.on("unlockOK", (data) =>{
    if (data.response === "RequestUnlockOk"){
      setRequestAllow(false);
      setLockAllow(true);
      setUnlockAllow(false);
      setStatus("unLock");
    }
  } )

  socket.on("timeOut",(data) =>{
    if (data.response === "ConnectionTimedOut"){
      setId("")
      setStatus("Unlock")
      setRequestAllow(true)
      setLockAllow(false)
      setUnlockAllow(false)
    }
  })

  return (
    <Container>
      <Hour>
       {hour} 
      </Hour>
      <Text>id: {id}</Text>
      <Text>System: {status}</Text>
      <ContainerButton>
        <Button onClick={handleRequest} able={requestAllow}>Request Access!!!</Button>
        <Button onClick={handleLock} able={lockAllow}>Lock Service</Button>
        <Button onClick={handleUnlock} able={unlockAllow}>Unlock Service</Button>
      </ContainerButton>
    </Container>
  )
}
