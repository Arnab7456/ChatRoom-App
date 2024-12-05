import { Link } from "react-router-dom";
import { FlipWords } from "../components/ui/FlipWord.tsx";

export default function Body() {
    const words = ["real-time", "interactive", "WebSocket"];

    return (
        <div className="flex flex-col justify-center items-center h-[35rem] px-4">
            <div className="text-4xl font-normal text-neutral-600 dark:text-neutral-400 text-center">
                Welcome to <FlipWords words={words} /> <br />
                ChatApp  using for seamless communication
            </div>
            <Link to="/chat">
                <button className="mt-8 text-xl font-sans font-medium bg-blue-600 px-20 py-3 rounded-lg text-white hover:bg-blue-800   transition">
                    Let's Chat
                </button>
            </Link>
        </div>
    );
}
