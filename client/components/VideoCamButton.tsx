import { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa";

function VideoCamButton() {
    const [recording, setRecording] = useState(false);  

    function startCam() {
        
    }

    return (
        <button onClick={startCam} className='text-lg rounded bg-green-800 px-4 py-2 mx-auto text-white flex gap-4 justify-center items-center'>
            <FaVideo />
            <span>Open Camera</span>
        </button>
    )
}

export default VideoCamButton