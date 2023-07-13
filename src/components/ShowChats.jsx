import React, { useEffect, useState, useRef } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../FirebaseConfig';
function ShowChats({ activeFrnd, userData }) {
    const [updateChat, setUpdateChat] = useState();
    const chatRef = useRef(null);
    const combinedId = userData.uid > activeFrnd.uid ? userData.uid + activeFrnd.uid : activeFrnd.uid + userData.uid;


    useEffect(() => {

        onSnapshot(doc(db, "userChats", combinedId), (doc) => {
            setUpdateChat(doc.data().message)
        });

        // if (chatRef.current) {
        //     chatRef.current.scrollIntoView({ behavior: 'smooth' });
        // }
    }, [userData.uid, activeFrnd.uid, combinedId]);

    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: 'smooth' });
    })

    return (
        <div className='showChats'>
            {updateChat && updateChat.map((data) =>
                <div className={data.senderId === userData.uid ? 'userChat' : 'senderChat'}>
                    <p className={data.senderId === userData.uid ? 'userChatP' : 'senderChatP'}>{data.message}</p>
                </div>
            )}
            <div ref={chatRef} />
        </div>
    );
}

export default ShowChats;
