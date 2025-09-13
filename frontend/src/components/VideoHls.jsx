import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

export default function HlsPlayer({ myKey, src, className }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls({
                maxBufferLength: 10,
                maxMaxBufferLength: 10,
                backBufferLength: 30,
            });

            hls.loadSource(src);
            hls.attachMedia(video);
            hls.startLoad(0);
            
            return () => hls.destroy();
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari/iOS có HLS native
            video.src = src;
        } else {
            console.error("HLS not supported in this browser");
        }
    }, [src]);

    return <video ref={videoRef} key={myKey} controls className={className} />;
}
