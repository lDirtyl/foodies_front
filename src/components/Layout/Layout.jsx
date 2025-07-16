import React from 'react';
import Testimonials from '../Testimonials/Testimonials';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.mainContent}>
        {children}
      </main>
      
      {/* Common sections that appear on multiple pages */}
      <Testimonials />
      
      <footer className={styles.footer}>
        {/* Footer content */}
        <p>© {new Date().getFullYear()} Foodies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;