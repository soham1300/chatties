import { useState } from 'react';
import { db } from '../FirebaseConfig'
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

function Search({ userData }) {

    const [searchUser, setSearchUser] = useState('');

    const handelSearchUser = async () => {
        try {
            const citiesRef = collection(db, "users");
            const q = await query(citiesRef, where("displayName", "==", searchUser));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (user) => {
                // doc.data() is never undefined for query doc snapshots
                try {
                    console.log(user.id, " => ", user.data());
                    await updateDoc(doc(db, 'users', userData.uid), {
                        friends: arrayUnion(user.id)
                    });
                    await updateDoc(doc(db, 'users', user.id), {
                        friends: arrayUnion(userData.uid)
                    });
                    const combinedId = userData.uid > user.id ? userData.uid + user.id : user.id + userData.uid;
                    await setDoc(doc(db, 'userChats', combinedId), {
                        message: []
                    })
                }
                catch (err) {
                    alert(err + 1)
                }

            });
        }
        catch (err) {
            alert(err + 2)
        }

    }

    const handleOnEnter = async (e) => {
        e.code === 'Enter' && handelSearchUser()
    }
    return (
        <div className='search'>
            <input type="search" name="Search" id="" className='searchBox' placeholder={'Find a user'} autoComplete='off' onChange={(e) => setSearchUser(e.target.value)} onKeyDown={handleOnEnter} />
        </div>
    )
}

export default Search