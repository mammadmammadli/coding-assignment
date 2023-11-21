import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import YoutubePlayer from "../YoutubePlayer";
import { AnimatePresence } from "framer-motion";
import moviesSlice from "../../data/moviesSlice";
import Spinner from "../Spinner";

const renderBody = (selectedMovie, status) => {
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <div>Something went wrong</div>;
  }
  return <YoutubePlayer videoKey={selectedMovie.data.videoKey} />;
};

const MovieVideo = () => {
  const { selectedMovie } = useSelector((state) => state.movies);
  const { removeSelectedMovie } = moviesSlice.actions;
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {!!selectedMovie && (
        <Modal onClose={() => dispatch(removeSelectedMovie())}>
          {renderBody(selectedMovie, selectedMovie.fetchStatus)}
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default MovieVideo;
