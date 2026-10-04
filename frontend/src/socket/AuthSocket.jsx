import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "./socket";

const AuthSocket = ()=>{
    const {user} = useSelector((state)=>state.auth);
    useEffect(()=>{
        if(!user?._id){
            if(socket.connected) socket.disconnect()
                return
        }
        if(!socket.connected) socket.connect()
            return ()=>socket.disconnect();
    },[user?._id])
}