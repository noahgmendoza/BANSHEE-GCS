import React, { useEffect, useRef } from 'react';


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
    <div style={{background: 'rgb(54, 58, 69)'}} className='container'>
        <h1 style={{textAlign: 'center' , color: 'rgb(214, 214, 214)'}}>Live Video Stream</h1>
        <div style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
            {/* <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }} /> */}
            <img ref={videoRef} alt='vid' style={{ width: '100%', height: 'auto' }}/>
        </div>
    </div>
  )


}

export default VideoFeed