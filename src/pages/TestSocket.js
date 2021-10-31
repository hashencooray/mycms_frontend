import React, { useEffect, useRef, useState } from 'react';
import MsgSnackBar from '../components/basic/MsgSnackbar';
import {createConnnection} from '../services/wsService';

export default function TestSocket() {

    const socket = useRef();
    const [snackPack, setSnackPack] = useState([]);

    useEffect( () => {
        socket.current = createConnnection();
        getMessages();
    },[]);

    const getMessages = async () => {
        socket.current.onmessage = (event) => {
            setSnackPack( (prev) => [...prev, { message: event.data, key: new Date().getTime() }])
        }
        console.log(socket.current.onmessage)
    }

    return (
        <div>
            TestSockect - please look console
            <MsgSnackBar snackPack={snackPack} setSnackPack={setSnackPack} />
        </div>
    )
}
