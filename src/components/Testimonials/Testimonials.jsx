import React, { useEffect, useState } from 'react';
import { testimonialsService } from '../../services/api';
import styles from './Testimonials.module.css';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

// Author names
const AUTHORS = ['Allison Parc', 'John Jameson', 'Jack Daniels', 'Abisola Abidemi'];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await testimonialsService.getAll();
        
        const testimonialsArray = Array.isArray(data) 
          ? data 
          : (data.testimonials || data.rows || []);
        
        // Map the data and assign random author names
        const formattedTestimonials = testimonialsArray.map(item => ({
          id: item.id,
          text: item.testimonial,
          name: item.owner,

          author: AUTHORS[item.id.charCodeAt(0) % AUTHORS.length]
        }));
        
        setTestimonials(formattedTestimonials);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto slider
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        return prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) return <LoadingIndicator />;
  
  if (error) {
    console.error("Testimonials error:", error);
  }
  

  // Default comment
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className={styles.testimonialsSection}>
        <p className={styles.testimonialsSubheading}>What our customer say</p>
        <h2 className={styles.testimonialsHeading}>TESTIMONIALS</h2>
        <p>No testimonials available at the moment.</p>
      </section>
    );
  }

  const safeIndex = Math.min(currentIndex, testimonials.length - 1);
  const currentTestimonial = testimonials[safeIndex];

  return (
    <section className={styles.testimonialsSection}>
      <p className={styles.testimonialsSubheading}>What our customer say</p>
      <h2 className={styles.testimonialsHeading}>TESTIMONIALS</h2>
      
      <div className={styles.testimonialContainer}>
        <div className={styles.quoteIcon}>"</div>
        <div className={styles.testimonialContent}>
          <p className={styles.testimonialText}>
            {currentTestimonial.text}
          </p>
          <p className={styles.testimonialAuthor}>
            {currentTestimonial.author}
          </p>
        </div>
        
        <div className={styles.testimonialDots}>
          {testimonials.map((_, index) => (
            <button 
              key={`testimonial-dot-${index}`}
              className={`${styles.dotButton} ${index === safeIndex ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`View testimonial ${index + 1}`}
              aria-pressed={index === safeIndex}
            >
              <span className={styles.dotIndicator}></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;