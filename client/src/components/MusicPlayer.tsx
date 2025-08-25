import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface MusicPlayerProps {
  fileName: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ fileName }) => {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const response = await axios.get<string>(
          `http://localhost:8083/api/music/stream/${fileName}`,
        );
        setAudioUrl(response.data);
      } catch (error) {
        console.error("Error upload music:", error);
      }
    };

    fetchAudioUrl();
  }, [fileName]);

  return (
    <div>
      {audioUrl && (
        <audio
          ref={audioRef}
          controls
          src={audioUrl}
          style={{ width: "100%", maxWidth: "400px" }}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
