import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Movie.css";
import "../../assets/bootstrap-5.3.2-dist/css/bootstrap.min.css";

const Movie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/repertoire/movies/${movieId}/`
        );

        setMovie(response.data);
      } catch (error) {
        // Handle error
        console.error("Error:", error);
      }
    };

    void fetchMovie();
  }, [movieId]);

  return (
    <div className="repertoire">
      {movie && (
        <div className="details">
          <p>Title:{movie.name}</p>
          <p>Description: {movie.description}</p>
          <p>Genre: {movie.genre}</p>
          <img
            className="image"
            src={`http://localhost:8000${movie.image}`}
            alt="img"
          />
        </div>
      )}
      <button onClick={() => navigate(-1)} className="button">
        Go back
      </button>
    </div>
  );
};

export default Movie;
