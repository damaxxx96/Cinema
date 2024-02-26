import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Repertoire.css";

const Repertoire = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [repertoire, setRepertoire] = useState<any>(null);

  useEffect(() => {
    const fetchRepertoire = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/repertoire/get_repertoire_by_venue/${venueId}/`
        );

        setRepertoire(response.data.repertoire);
      } catch (error) {
        // Handle error
        console.error("Error:", error);
      }
    };

    fetchRepertoire();
  }, [venueId]);

  return (
    <div className="repertoire">
      <p className="text">Repertoire for Venue {venueId}</p>
      <div className="content">
        {repertoire &&
          repertoire.map((entry: any, index: number) => (
            <Link
              to={`/repertoire/movie/${entry.movie_id}`}
              className="moviename"
            >
              <div className="movie" key={index}>
                <p>Name: {entry.movie_name}</p>
                <p>Venue: {entry.venue_name}</p>
                <p>Showtime: {entry.showtime}</p>
                <p>{entry.image}</p>
              </div>
            </Link>
          ))}
      </div>
      <Link to="/" className="button">
        Back to Home
      </Link>
    </div>
  );
};

export default Repertoire;
