import { useRef, useState, useEffect } from "react";
import styles from "./Topgmes.module.scss";
import { useNavigate } from "react-router-dom";

// import FontAwesomeIcon from '@fortawesome/free-solid-svg-icons'

const API_KEY = import.meta.env.VITE_RWAG_API_KEY;

const Topgames = () => {
  const sliderRef = useRef(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json(); 
        setGames(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      if (error) {
        return <div>Error:{error} </div>;
      }
    };
    fetchGames();
  }, [error]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const handleCardClick = (gameID) => {
    navigate(`/game/${gameID}`);
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.discoverSection}>
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>
          Discover Something New
          <span className={styles.headerArrow}>›</span>
        </h2>
        <div className={styles.navButtons}>
          <button
            className={`${styles.navArrow} ${styles.leftArrow}`}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            &lt;
          </button>
          <button
            className={`${styles.navArrow} ${styles.rightArrow}`}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            {">"}
          </button>
        </div>
      </div>

      <div className={styles.gameSlider} ref={sliderRef}>
        {games.map((game, index) => (
          <div
            className={styles.gameCard}
            key={index}
            onClick={() => handleCardClick(game.id)}
          >
            <div className={styles.imageContainer}>
              <img src={game.background_image} alt={game.name} />
            </div>
            <div className={styles.gameInfo}>
              <span className={styles.gameType}>Base Game</span>
              <h3 className={styles.gameTitle}>{game.name}</h3>
              <span className={styles.gamePrice}>
                {game.price || "Price not available"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topgames;
