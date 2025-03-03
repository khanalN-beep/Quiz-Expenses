
import styles from './Store.module.scss';

const Stores = () => {
  const promos = [
    {
      id: 1,
      title: 'Fortnite',
      description: 'Pawline will always rise to the occasion. Have a "bunderful" day with the Cuddle Buns Pack!',
      image: 'pack.jpg',
      price: '$18.49',
      hasShopButton: true
    },
    {
      id: 2,
      title: 'Fortnite',
      description: 'BANG! Take your shot with bounty hunters Spike Spiegel and Faye Valentine from COWBOY BEBOP.',
      image: 'bebop.jpg',
      hasShopButton: true
    },
    {
      id: 3,
      title: 'Fortnite',
      description: 'My Hero Academia\'s League of Villains emerges in Fortnite!',
      image: 'academia.jpg',
      hasShopButton: true
    }
  ];

  return (
    <div className={styles.fortnitePromosContainer}>
      {promos.map(promo => (
        <div key={promo.id} className={styles.promoCard}>
          <div className={styles.promoImageContainer}>
            <img src={promo.image} alt={promo.title} className={styles.promoImage} />
          </div>
          <div className={styles.promoContent}>
            <h2 className={styles.promoTitle}>{promo.title}</h2>
            <p className={styles.promoDescription}>{promo.description}</p>
            
            <div className={styles.promoFooter}>
              {promo.price && <span className={styles.promoPrice}>{promo.price}</span>}
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stores;