import ReactPlayer from "react-player";
import '../styles/player.scss';
const YoutubePlayer = ({ videoKey }) => (
  <ReactPlayer
    className="video-player"
    url={`https://www.youtube.com/watch?v=${videoKey}`}
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />
);

export default YoutubePlayer;
