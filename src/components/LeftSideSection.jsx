
import Search from './Search'
import Friends from './Friends'
import { signOut } from "firebase/auth";
import { auth } from '../FirebaseConfig'
import { useNavigate } from 'react-router';

function LeftSideSection({ userData, setOpenChat, setId}) {
    const navigate = useNavigate();
    return (
        <div className='leftSideSection'>
            <div className='userData'>
                <div className='userName'>
                    <img src={userData.photoURL} alt="9M1XLOwYWt" height={35} width={35} style={{ margin: '5px', borderRadius: '50%' }} />
                    <p style={{ fontSize: '20px', margin: '0', color: 'white' }}>{userData.displayName}</p>
                </div>
                <div>
                    <input type="button" value="Logout" className='logout' onClick={() => {
                        signOut(auth);
                        localStorage.removeItem('email');
                        localStorage.removeItem('password');
                        navigate('/')
                    }} />
                </div>
            </div>
            <Search userData={userData} />
            <Friends userData={userData} setOpenChat={setOpenChat} setId={setId} />
        </div>
    )
}

export default LeftSideSection