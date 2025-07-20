import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { showModal } from '../../redux/common/slice';
import { MODALS, ROUTERS } from '../../const';
import styles from './Hero.module.css';

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleAddRecipeClick = () => {
    if (isLoggedIn) {
      navigate(ROUTERS.ADD_RECIPE);
    } else {
      dispatch(showModal({ modal: MODALS.AUTH, defaultValue: 'signIn' }));
    }
  };

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
          <button className={styles.button} onClick={handleAddRecipeClick}>Add recipe</button>
        </div>

        <div className={styles.images}>
          <picture>
            <source media="(min-width: 768px)" srcSet="/images/hero/tiramisu@1.webp" />
            <img className={styles.mainImage} src="/images/hero/tiramisu@2.webp" alt="Tiramisu dessert in a glass" />
          </picture>
          <picture>
            <source media="(min-width: 768px)" srcSet="/images/hero/sliced_beef@1.webp" />
            <img className={styles.secondaryImage} src="/images/hero/sliced_beef@2.webp" alt="Sliced beef Wellington" />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Hero;