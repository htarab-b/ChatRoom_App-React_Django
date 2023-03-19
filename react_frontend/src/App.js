import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Chatroom from './components/Chatroom';
import CreateRoom from './components/CreateRoom';

function App() {
  return (
    <Routes>
      <Route path='login/' element={<Login />}></Route>
      <Route path='signup/' element={<Signup />}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='chatroom/' element={<Chatroom />}></Route>
      <Route path='createchatroom/' element={<CreateRoom />}></Route>
    </Routes>
  );
}

export default App;
