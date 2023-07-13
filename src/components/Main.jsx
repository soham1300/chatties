import UpperSection from './UpperSection'
import LeftSideSection from './LeftSideSection'
import Chat from './Chat'
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../FirebaseConfig'


function Main({ userUid }) {
    const [userData, setUserData] = useState()
    const [openChat, setOpenChat] = useState(false);
    const [id, setId] = useState();
    useEffect(() => {
        async function friendDoc() {
            await onSnapshot(doc(db, "users", userUid), async (document) => {
                setUserData(document.data())
            });
        }
        friendDoc();
    }, [userUid]);

    return (
        <>
            {userData &&
                <div className='main'>
                    <UpperSection />
                    <div style={{ display: 'flex' }}>

                        <div>
                            <LeftSideSection userData={userData} setOpenChat={setOpenChat} setId={setId} openChat={openChat} />
                        </div>

                        <div>
                            <Chat userData={userData} setOpenChat={setOpenChat} id={id} />
                        </div>

                    </div>

                </div >
            }
        </>

    )
}

export default Main
