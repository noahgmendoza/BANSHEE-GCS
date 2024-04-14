import React, { useEffect, useRef } from 'react';
import '../styles/VideoFeed.css';

function VideoFeed() {


    const videoRef = useRef(null);
    const wsRef = useRef(null);

    useEffect(() => {
        // Establish WebSocket connection when component mounts
        wsRef.current = new WebSocket('ws://172.233.146.163:3000/read_frames');

        wsRef.current.onopen = () => {
            console.log('Connected to WebSocket server for reading frames');
        };

        wsRef.current.onmessage = (event) => {
            const arrayBuffer = event.data;
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            videoRef.current.src = imageUrl;
        };

        return () => {
            // Close WebSocket connection when component unmounts
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);



  return (
    <div className='live-vid-container'>
        <h1>Live Video Stream</h1>
        <div>
            {/* <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }} /> */}
            <img ref={videoRef} alt='vid'/>
        </div>
    </div>
  )


}

export default VideoFeed