import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./homepage.module.scss";
import Topgames from "../Topgames/Topgames";

const API_KEY = import.meta.env.VITE_RWAG_API_KEY;
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const Homepage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGames, setSelectedGames] = useState(null);

  const fetchGames = () => {
    setLoading(true);
    axios
      .get(`${API_URL}&page_size=7${`&search=${searchQuery}`}`)
      .then((response) => {
        setGames(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchGames(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Featured game is the first game in the list
  const featuredGame = games.length > 0 ? games[0] : null;
  // Sidebar games are the rest
  const sidebarGames = games.length > 1 ? games.slice(1, 7) : [];


  console.log(featuredGame, "featured game")

  return (
    <>
      <div className={styles.container}>
        <header className={styles.navbar}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
          <nav className={styles.navLinks}>
            <span className={styles.active}>Discover</span>
            <span>Browse</span>
            <span>News</span>
          </nav>
        </header>

        <main className={styles.mainContent}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <>
              {featuredGame && (
                <section className={styles.featuredGame}>
                  <img
                    src={(selectedGames || featuredGame).background_image}
                    alt={(selectedGames || featuredGame).name}
                    className={styles.featuredImage}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.gameTitle}>
                      <h1>{(selectedGames || featuredGame).name}</h1>
                    </div>
                    <div className={styles.gameInfo}>
                      <div className={styles.releaseInfo}>
                        <h2>COMING MARCH 6</h2>
                        <p>
                          Jump into the worlds of{" "}
                          {(selectedGames || featuredGame).name}, a
                          boundary-pushing co-op adventure.
                        </p>
                      </div>
                      <div className={styles.priceInfo}>
                        <span className={styles.price}>$49.99</span>
                        <div className={styles.actions}>
                          <button className={styles.primaryButton}>
                            Pre-Purchase Now
                          </button>
                          <button className={styles.wishlistButton}>
                            <span className={styles.plusIcon}>+</span> Add to
                            Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              <aside className={styles.sidebar}>
                {sidebarGames.map((game) => (
                  <div
                    key={game.id}
                    className={styles.gameItem}
                    onClick={() => setSelectedGames(game)}
                  >
                    <img src={game.background_image} alt={game.name} />
                    <span>{game.name}</span>
                  </div>
                ))}
              </aside>
            </>
          )}
        </main>
      </div>
      <section>
        <Topgames />
      </section>
     
    </>
  );
};

export default Homepage;
