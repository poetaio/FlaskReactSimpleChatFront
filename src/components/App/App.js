import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { AllChatsPage, HomePage, LoginPage } from '../pages';

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/chats" element={<AllChatsPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;
