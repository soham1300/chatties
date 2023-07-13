import React, { memo } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

function Friends({ userData, setOpenChat, setId }) {
    const [friends, setFriends] = useState([]);
    // const navigate = useNavigate();


    useEffect(() => {
        async function friendDoc() {

            const friendsArr = userData.friends;

            const newFriends = [];
            for (let i = 0; i < friendsArr.length; i++) {
                const uid = friendsArr[i];
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                const friendData = docSnap.data();
                newFriends.push(friendData);
            }
            setFriends(newFriends);
        }
        friendDoc();
    }, [userData.friends]);
    return (
        <div className="friends">
            {friends.map((data) =>
                <div className="friend" key={data.uid} onClick={() => {
                    setId(data.uid);
                    setOpenChat(true);
                }}>
                    <img src={data.photoURL} alt="" srcset="" height={40} width={40} style={{
                        borderRadius: '50%'
                    }} />
                    <p style={{ fontSize: '18px', margin: 5 }}>{data.displayName}</p>
                </div>
            )
            }
        </div >
    );
}


export default memo(Friends);
