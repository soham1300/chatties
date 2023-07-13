
import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import LeftSideSection from './components/LeftSideSection';
// import LeftSideSection from './components/LeftSideSection';
import LoginSignup from './components/LoginSignup';
import Main from './components/Main'
import { Route, Routes } from 'react-router-dom';

function App() {
  const [userUid, setUserUid] = useState();
  // console.log(uid)
  return (

    <Routes>
      <Route index element={<LoginSignup title="Login" setUserUid={setUserUid} />} />
      <Route path='/signin' element={<LoginSignup title="Sign In" setUserUid={setUserUid} />} />
      <Route path='/chat' element={<Main userUid={userUid} />} >
        <Route index element={<LeftSideSection />} />
        <Route index element={<Chat />} />
      </Route>
      <Route path='*' element={<LoginSignup title="Login" setUserUid={setUserUid} />} />
    </Routes>
  );
}

export default App;