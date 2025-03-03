import { useParams } from "react-router-dom";
import styles from "./Basegames.module.scss";
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_RWAG_API_KEY;

const Basegames = () => {
  const [loading, setLoading] = useState(true);
  const [getData, setGetData] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  const { id } = useParams();
  console.log(id, "gameId");
  
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        setGetData(data);
        
        // Fetch achievements if they exist (check if the game has achievements)
        if (data.achievements_count > 0) {
          const achievementsResponse = await fetch(
            `https://api.rawg.io/api/games/${id}/achievements?key=${API_KEY}`
          );
          if (achievementsResponse.ok) {
            const achievementsData = await achievementsResponse.json();
            setAchievements(achievementsData.results || []);
          }
        }
      } catch (err) {
        setError("Error fetching game data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameData();
  }, [id]);
  
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  
  console.log(getData, "data");
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Calculate achievement stats
  const achievementStats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.percent > 0).length,
    rareAchievements: achievements.filter(a => a.percent < 10).length,
    averageCompletion: achievements.length > 0 
      ? (achievements.reduce((sum, a) => sum + a.percent, 0) / achievements.length).toFixed(1) 
      : 0
  };
  
  return (
    <div className={styles.Discription}>
      <div className={styles.base}>
        {getData && (
          <>
            <div className={styles.header}>
              <h1>{getData.name}</h1>
            </div>
            
            <div className={styles.span}>
              <span 
                className={activeTab === "overview" ? styles.active : ""}
                onClick={() => handleTabChange("overview")}
              >
                Overview
              </span>
              <span 
                className={activeTab === "achievements" ? styles.active : ""}
                onClick={() => handleTabChange("achievements")}
              >
                Achievements
              </span>
            </div>
            
            {/* Overview Section */}
            <div className={`${styles.contentSection} ${styles.overviewSection} ${activeTab !== "overview" ? styles.hidden : ""}`}>
              <div className={styles.Image}>
                <img src={getData.background_image} alt={getData.name} />
              </div>
              
              <div className={styles.text}>
                <div dangerouslySetInnerHTML={{ __html: getData.description }} />
              </div>
              
              <div className={styles.type}>
                <h1>Genre</h1>
                <div className={styles.genre}>
                  {getData.genres?.map((genre) => (
                    <button key={genre.id} className={styles.genrebutton}>
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Achievements Section */}
            <div className={`${styles.contentSection} ${styles.achievementSection} ${activeTab !== "achievements" ? styles.hidden : ""}`}>
              {achievements.length > 0 ? (
                <>
                  <div className={styles.achievementStats}>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{achievementStats.total}</div>
                      <div className={styles.statLabel}>Total Achievements</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{achievementStats.unlocked}</div>
                      <div className={styles.statLabel}>Global Unlocks</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{achievementStats.rareAchievements}</div>
                      <div className={styles.statLabel}>Rare Achievements</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{achievementStats.averageCompletion}%</div>
                      <div className={styles.statLabel}>Average Completion</div>
                    </div>
                  </div>
                  
                  <div className={styles.achievementList}>
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`${styles.achievement} ${achievement.percent > 50 ? styles.unlocked : ''} ${achievement.percent < 10 ? styles.rare : ''}`}
                      >
                        <div className={styles.achievementIcon}>
                          <img src={achievement.image} alt={achievement.name} />
                        </div>
                        <div className={styles.achievementInfo}>
                          <h3>{achievement.name}</h3>
                          <p>{achievement.description || "Complete a hidden challenge"}</p>
                          <div className={styles.achievementProgress}>
                            <div 
                              className={styles.progressBar} 
                              style={{ width: `${achievement.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.text}>
                  <p>No achievements found for this game.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Basegames;