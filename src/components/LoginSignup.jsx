import React, { useEffect, useState } from 'react'
import '../App.css'
import { auth, storage, db } from '../FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

import logoImg from '../images/login.png'
import userImg from '../images/user.png'


function LoginSignup({ title, setUserUid }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const autoLogin = async () => {
            const autoEmail = localStorage.getItem('email');
            const autoPassword = localStorage.getItem('password');
            const autoUserUid = localStorage.getItem('userUid');
            if (autoEmail && autoPassword && autoUserUid) {
                await signInWithEmailAndPassword(auth, autoEmail, autoPassword)
                    .then((userCredential) => {
                        setUserUid(autoUserUid)
                        // const user = userCredential.user;
                        navigate(`/chat`);
                    })
                    .catch((error) => {
                        alert(error.message)
                    });
            }

        }
        autoLogin();

    }, [email, password, navigate, setUserUid]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };

    const checkUsername = async () => {

        const usersRef = collection(db, "users");
        const q = await query(usersRef, where('displayName', '==', displayName));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const saveLogin = (e) => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    }

    async function Signin() {
        const usernameTaken = await checkUsername(displayName);
        if (usernameTaken) {
            alert('Username already taken!');
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        let downloadURL = '';
                        if (file) {
                            const storageRef = ref(storage, email);
                            await uploadBytesResumable(storageRef, file).then(
                                () => {
                                    getDownloadURL(storageRef).then((url) => {
                                        downloadURL = url;
                                    });
                                }
                            )
                        } else {
                            // Default image URL here
                            downloadURL = "https://firebasestorage.googleapis.com/v0/b/messenger-c4b78.appspot.com/o/user.png?alt=media&token=36f39902-bc70-48ca-b58a-218914059934";
                        }

                        //Update User Data
                        await updateProfile(auth.currentUser, {
                            displayName,
                            photoURL: downloadURL,
                        }).then(() => {
                            console.log('Success')
                        }).catch((error) => {
                            alert(error)
                        });

                        //Add User on DB 
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            displayName,
                            photoURL: downloadURL,
                            email,
                        });
                        saveLogin();
                        localStorage.setItem('userUid', user.uid);
                        // Navigate
                        navigate(`/chat`);
                        setUserUid(user.uid);
                    })
                    .catch((error) => {
                        alert(error)
                    });


            }
            catch (err) {
                alert(err)
            }
        }
    }

    //Login
    async function Login() {
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                saveLogin();
                localStorage.setItem('userUid', user.uid);
                // Navigate
                // navigate('friends');
                navigate(`/chat`);
                setUserUid(user.uid);
            })
            .catch((error) => {
                alert(error.message)
            });

    }


    return (
        <div className='loginSignup'>
            <div className='innerLoginDiv'>
                <div className='loginImg'>
                    <div className='loginImgMid'>
                        <img src={logoImg} alt="logoImg" className='LImg' />
                    </div>
                </div>
                <div className='loginSignupForm'>
                    <div className='loginSignupFormMid'>
                        <div className='title'>
                            <h1>{title}</h1>
                        </div>
                        <div >
                            <form className='form'>
                                {/*Username */}
                                {title === "Sign In" && <input type="text" placeholder='Username' className='loginSignupInput' onChange={(e) => {
                                    setDisplayName(e.target.value)
                                }} required />}

                                {/* Email */}
                                <input type="email" placeholder='Email' className='loginSignupInput' onChange={(e) => {
                                    setEmail(e.target.value)
                                }} required />

                                {/* Password */}
                                <input type="password" placeholder='Password' className='loginSignupInput' onChange={(e) => {
                                    setPassword(e.target.value)
                                }} required />

                                {/* File */}
                                <input type="file" src="" alt="" onChange={handleFileChange} id='file' style={{ display: 'none' }} accept="image/*" />

                                {title === "Sign In" && <label htmlFor="file" className='file'>
                                    {image ?
                                        <img src={image} alt="mU99dd3IFo" height={40} /> :
                                        <img src={userImg} alt="mU99dd3IFo" height={40} />
                                    }
                                    <p>Add Avatar</p>
                                </label>}

                                {/* button */}
                                <div>
                                    <input
                                        type="submit"
                                        value={title}
                                        className="loginSignupButton"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            title === "Sign In" ? Signin() : Login();
                                        }}
                                    />
                                </div>
                            </form>

                        </div>
                        <div className='switch'>
                            {title === "Sign In" ?
                                <div className='switchDiv'>
                                    {/* <p className='switchClick'>Already have a account ? Login</p> */}
                                    <Link to='/' className='switchClick'>Already have a account ? Login</Link>
                                </div> :
                                <div className='switchDiv'>
                                    {/* <p>Don't have a account ? Sign In</p> */}
                                    <Link to='/signin' className='switchClick'>Don't have a account ? Sign In</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
