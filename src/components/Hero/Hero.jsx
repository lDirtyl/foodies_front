import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div>
        <h1 className={styles.title}>Improve Your Culinary Talents</h1>
        <div>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.
          </p>
        </div>
        <div>
          <button className={styles.button}>Add recipe</button>
        </div>

        <div className={styles.images}>
          <picture>
            <source media="(min-width: 768px)" srcSet="public/images/hero/tiramisu@1.webp" />
            <img className={styles.mainImage} src="public/images/hero/tiramisu@2.webp" alt="Tiramisu dessert in a glass" />
          </picture>
          <picture>
            <source media="(min-width: 768px)" srcSet="public/images/hero/sliced_beef@1.webp" />
            <img className={styles.secondaryImage} src="public/images/hero/sliced_beef@2.webp" alt="Sliced beef Wellington" />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Hero;