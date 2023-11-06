// import ReactPlayer from "react-player";
import ReactPlayer from "react-player";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import styles from "../../page/ToeicExamPage.module.scss";
import { useRef, useState, useEffect } from "react";

const AudioToeic = (props) => {
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.seekTo(props.seekTo, "seconds");
  }, [props.count]);

  return (
    <div className={styles["audio-container"]}>
      <ReactPlayer
        url={"https://e2i-server.managestore.io.vn" + props.src}
        controls
        height="60px"
        ref={audioRef}
        // playing={true}
        // muted={true}
        // playbackRate={1.5}
      />
    </div>
  );
};

export default AudioToeic;
