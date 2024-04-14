import React, { useEffect, useRef } from 'react';


function VideoFeed() {


    const videoRef = useRef(null);
    let ws;

    useEffect(() => {
    // Establish WebSocket connection when component mounts
    ws = new WebSocket('ws://172.233.146.163:3000/read_frames');

    ws.onopen = () => {
      console.log('Connected to WebSocket server for reading frames');
    };

    ws.onmessage = (event) => {
      const arrayBuffer = event.data;
      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      videoRef.current.src = imageUrl;
    };

    return () => {
        // Close WebSocket connection when component unmounts
        ws.close();
      };
    }, []);



  return (
    <div>
      <h1>Live Video Stream</h1>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  )


}

export default VideoFeed