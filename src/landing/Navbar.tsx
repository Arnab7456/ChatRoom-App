import {Link} from "react-router-dom";


export default function Navbar() {
    return (
        <div className="sticky top-5 z-10 font-sans font-medium flex items-center justify-center gap-8 border rounded-lg p-5 mx-auto w-full  max-w-screen-sm bg-transparent mb-3 ">

                <div className="hover:text-blue-600">
                    <Link to="/">
                        Home
                    </Link>

                </div>
            <div hover:text-blue-600>
                Real-Time App
            </div>

        </div>

    );
}
