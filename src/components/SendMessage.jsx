import React, { useRef, useState } from 'react'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from '../FirebaseConfig';

import sendMsg from '../images/send.png'

function SendMessage({ activeFrnd, userData }) {

    const [message, setMessgae] = useState();
    const inputRef = useRef(null);

    const handleSendMsg = async () => {
        const combinedId = userData.uid > activeFrnd.uid ? userData.uid + activeFrnd.uid : activeFrnd.uid + userData.uid;

        const sendMessage = doc(db, "userChats", combinedId);
        await updateDoc(sendMessage, {
            message: arrayUnion({
                senderId: userData.uid,
                message: message,
                time: Timestamp.now(),

            })
        });
        inputRef.current.value = "";
    }

    return (
        <div className='sendMessages'>
            <form className='sendMessagesForm'>
                <input
                    type="text"
                    placeholder='Enter Message'
                    className='sendMessagesInput'
                    ref={inputRef}
                    onChange={(e) => {
                        setMessgae(e.target.value);
                    }}
                />
                <button onClick={(e) => {
                    e.preventDefault();
                    handleSendMsg();
                }} className='sendMessagesButton'>
                    <img src={sendMsg} alt="pgYB25XTSf" height={30} />
                </button>
            </form>


        </div>
    )
}

export default SendMessage