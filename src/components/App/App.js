import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { AllChatsPage, ChatPage, HomePage, LoginPage } from '../pages';

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/chats" element={<AllChatsPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;
