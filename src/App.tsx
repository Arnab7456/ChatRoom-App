import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomChatClient from './components/JoinRoomPage';
import Navbar from "./landing/Navbar.tsx";
import { motion } from 'framer-motion';
import Body from "./landing/Body.tsx";
import Footer from "./landing/Footer.tsx";

function App() {
    return (
        <Router>
            <motion.div
                className="min-h-screen flex flex-col justify-between"
                transition={{ duration: 0.5 }}
            >
                <div className="overflow-hidden bg-hero-bg-dark bg-cover flex-1">
                    <Navbar />
                    <Routes>
                        <Route path="/chat" element={<RoomChatClient />} />
                        <Route path="/" element={<Body />} />
                    </Routes>
                </div>
                <Footer />
            </motion.div>
        </Router>
    );
}

export default App;
