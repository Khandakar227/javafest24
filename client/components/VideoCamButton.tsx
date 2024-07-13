import { modelServerUrl } from "@/lib/const";
import { useEffect, useRef, useState } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { io, Socket } from "socket.io-client";


function VideoCamButton() {
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null as MediaStream | null);
    const [socket, setSocket] = useState({} as Socket);
    const [interval, _setInterval] = useState(null as NodeJS.Timeout | null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const s = io(modelServerUrl, {
            autoConnect: false
        });
        s.on('connect', onSocketConnect);
        s.on('word', onWordRecieved);
        s.on('disconnect', onSocketDisconnect);

        setSocket(s);

        return () => {
            s.off('connect', onSocketConnect)
            s.off('disconnect', onSocketDisconnect);
            s.off('word', onWordRecieved);
            s.disconnect();
            if(interval != null) clearInterval(interval);
        }
    },[])

    useEffect(() => {
        if(!recording && interval != null) {
            clearInterval(interval);
        }
    }, [recording])

    useEffect(() => {
        if (recording && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }
        if (!recording && mediaStream != null) {
            videoRef.current?.pause();
            if(videoRef.current) videoRef.current.src = "";
            mediaStream.getTracks().forEach(track => {
                track.stop();
            });

        }
        return () => {
            mediaStream?.getTracks().forEach(track => {
                track.stop();
            });
        }
    }, [recording, mediaStream])

    function onSocketConnect() {
        console.log('Socket Connected');
    }
    function onSocketDisconnect() {
        console.log('Socket Disconnected');
    }

    function startCam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setRecording(true);
                setMediaStream(stream);

                if(socket == null) return;

                socket.connect();
                processVideo();
            })
            .catch(err => {
                console.error(err);
            })
    }

    function processVideo() {
        const frameRate = 20;
        const captureFrame = () => {
            const video = videoRef.current;
            if(!video) return;

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                const canvas = document.createElement('canvas') as HTMLCanvasElement;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/jpeg');
                const base64Data = dataURL.split(',')[1];
                socket.emit('frame', base64Data);
            }
        };
        _setInterval(setInterval(captureFrame, 1000 / frameRate));
    }

    function onWordRecieved(word: string) {
        console.log('Word Recieved:', word);
    }
    return (
        <>
            {
                mediaStream != null && (
                    <video ref={videoRef} width={384*16/9} height={384} controls autoPlay muted className='w-full h-96 mb-8 aspect-video rounded-lg bg-black'></video>
                )
            }
            {
                recording ?
                    <button onClick={() => setRecording(false)} className='text-lg rounded bg-red-800 px-4 py-2 mx-auto text-white flex gap-4 justify-center items-center'>
                        <FaVideoSlash />
                        <span>Close Camera</span>
                    </button>
                    :
                    <button onClick={startCam} className='text-lg rounded bg-green-800 px-4 py-2 mx-auto text-white flex gap-4 justify-center items-center'>
                        <FaVideo />
                        <span>Open Camera</span>
                    </button>
            }
        </>
    )
}

export default VideoCamButton