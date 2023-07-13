import React, { useEffect, useState } from 'react'
import ShowChats from './ShowChats'
import SendMessage from './SendMessage'
// import { useParams } from 'react-router'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

function Chat({ userData, setOpenChat, id }) {
    // const { id } = useParams();
    const [activeFrnd, setActiveFrnd] = useState();
    useEffect(() => {
        const frndData = async () => {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            // const friendData = docSnap.data();
            setActiveFrnd(docSnap.data());
        }
        frndData();
    }, [id])

    return (
        (id && activeFrnd) &&
        <div className='chat'>
            <div className='frndName'>
                <img src="https://imgbox.io/ib/QxjDyXDqYv.png" alt="QxjDyXDqYv" height={25} width={25} className='backArrow' onClick={setOpenChat(false)} />
                <img src={activeFrnd.photoURL} alt="9M1XLOwYWt" height={35} width={35} style={{ margin: '5px', borderRadius: '50%' }} />
                <p style={{ fontSize: '20px', margin: '0', color: 'white' }}>{activeFrnd.displayName}</p>
            </div>
            <ShowChats activeFrnd={activeFrnd} userData={userData} />
            <SendMessage activeFrnd={activeFrnd} userData={userData} />
        </div>
    )
}

export default Chat