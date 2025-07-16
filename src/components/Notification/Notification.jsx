import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, type = 'info', onClose }) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default Notification;