import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
const Admin: React.FC = () => {
  const [allRepertoires, setAllRepertoires] = useState<any[]>([]);
  const [allMovies, setAllMovies] = useState<any[]>([]);

  // REPERTOIRE
  const [movieId, setMovieId] = useState<string>("");
  const [venueId, setVenueId] = useState<string>("");
  const [showtime, setShowtime] = useState<string>("");
  const [repertoireId, setRepertoireId] = useState<string>("");

  // MOVIE
  const [movieName, setMovieName] = useState<string>("");
  const [movieGenre, setMovieGenre] = useState<string>("");
  const [movieDescription, setMovieDescription] = useState<string>("");
  const [movieImage, setMovieImage] = useState<any>(null);
  const [movieImageName, setMovieImageName] = useState<string>("");

  const fetchAllMovies = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/movie/all_movies");
      if (response.ok) {
        const movies = await response.json();
        setAllMovies(movies);
      } else {
        console.error("Error fetching movies:", response.status);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchAllRepertoires = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/repertoire/all_repertoires/"
      );
      if (response.ok) {
        const repertoires = await response.json();
        setAllRepertoires(repertoires);
      } else {
        console.error("Error fetching repertoires:", response.status);
      }
    } catch (error) {
      console.error("Error fetching repertoires:", error);
    }
  };

  useEffect(() => {
    // Fetch all repertoires when the component mounts
    fetchAllRepertoires();
    fetchAllMovies();
  }, []);

  const handleCreateMovie = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", movieName);
      formData.append("description", movieDescription);
      formData.append("genre", movieGenre);
      formData.append("image", movieImage);

      const response = await axios.post(
        "http://127.0.0.1:8000/movie/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Movie created successfully");
        fetchAllMovies();
      } else {
        console.error("Error creating movie:", response.status);
      }
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  const handleCreateRepertoire = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/repertoire/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie: movieId,
          venue: venueId,
          showtime: showtime,
        }),
      });

      if (response.status === 201) {
        console.log("Repertoire created successfully");
        fetchAllRepertoires();
      } else {
        console.error("Error creating repertoire:", response.status);
      }
    } catch (error) {
      console.error("Error creating repertoire:", error);
    }
  };
  const handleDeleteMovie = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/movie/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie: movieId,
        }),
      });

      if (response.status === 200) {
        console.log("Movie delete successfully");
        fetchAllMovies();
      } else {
        console.error("Error delete movie:", response.status);
      }
    } catch (error) {
      console.error("Error delete movie:", error);
    }
  };

  const handleDeleteRepertoire = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/repertoire/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repertoire: repertoireId,
        }),
      });

      if (response.status === 200) {
        console.log("Repertoire delete successfully");
        fetchAllRepertoires();
      } else {
        console.error("Error delete repertoire:", response.status);
      }
    } catch (error) {
      console.error("Error delete repertoire:", error);
    }
  };

  return (
    <div>
      <div className="admin">
        <div className="repertoires">
          <h2>All Repertoires:</h2>
          <ul>
            {allRepertoires.map((repertoire: any) => (
              <li key={repertoire.id}>
                {`ID: ${repertoire.id} - Movie: ${repertoire.movie} - Venue: ${repertoire.venue} - Showtime: ${repertoire.showtime}`}
              </li>
            ))}
          </ul>
        </div>
        <form className="create" onSubmit={handleCreateRepertoire}>
          <h2>Create Repertoire:</h2>
          <label>Movie ID:</label>
          <input
            type="text"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
          />
          <label>Venue ID:</label>
          <input
            type="text"
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
          />
          <label>Showtime:</label>
          <input
            type="text"
            value={showtime}
            onChange={(e) => setShowtime(e.target.value)}
          />
          <button type="submit">Create Repertoire</button>
        </form>
        <form className="delete" onSubmit={handleDeleteRepertoire}>
          <h2>Delete Repertoire:</h2>
          <label>Repertoire ID:</label>
          <input
            type="text"
            value={repertoireId}
            onChange={(e) => setRepertoireId(e.target.value)}
          />
          <button className="deletebutton" type="submit">
            DeleteRepertoire
          </button>
        </form>
      </div>
      <div className="admin">
        <div className="movies">
          <h2>All Movies:</h2>
          <ul>
            {allMovies.map((movie: any) => (
              <li key={movie.id}>
                {`ID: ${movie.id} - Name: ${movie.name} - Description: ${movie.description} - Genre: ${movie.genre}
              - Image: `}
                <a href={`http://localhost:8000${movie.image}`}>image</a>
              </li>
            ))}
          </ul>
        </div>
        <form className="create" onSubmit={handleCreateMovie}>
          <h2>Create Movie:</h2>
          <label>Movie NAME:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
          />
          <label>Movie Description:</label>
          <input
            type="text"
            value={movieDescription}
            onChange={(e) => setMovieDescription(e.target.value)}
          />
          <label>Genre:</label>
          <input
            type="text"
            value={movieGenre}
            onChange={(e) => setMovieGenre(e.target.value)}
          />
          <label>Image:</label>
          <input
            type="file"
            value={movieImageName}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                setMovieImage(file);
                setMovieImageName(e.target.value);
              }
            }}
          />
          <button type="submit">Create Movie</button>
        </form>
        <form className="delete" onSubmit={handleDeleteMovie}>
          <h2>Delete Movie:</h2>
          <label>Movie ID:</label>
          <input
            type="text"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
          />
          <button className="deletebutton" type="submit">
            Delete Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
