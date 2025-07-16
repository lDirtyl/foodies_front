import React, { useRef, useState, useEffect } from 'react';
import styles from './QuestWidget.module.css';

// Для иконок FontAwesome
const fontAwesomeLink =
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';

const githubPagesUrl = 'https://essencemaks.github.io/Quests_Board/';

export default function QuestWidget() {
  const [subButtonsActive, setSubButtonsActive] = useState(false);
  const [iframeActive, setIframeActive] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const widgetMainButtonRef = useRef(null);
  const widgetSubButtonsRef = useRef(null);

  // Подключаем FontAwesome только один раз
  useEffect(() => {
    if (!document.querySelector(`link[href='${fontAwesomeLink}']`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontAwesomeLink;
      document.head.appendChild(link);
    }
  }, []);

  // Закрытие подкнопок при клике вне
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        widgetMainButtonRef.current &&
        widgetSubButtonsRef.current &&
        !widgetMainButtonRef.current.contains(event.target) &&
        !widgetSubButtonsRef.current.contains(event.target)
      ) {
        setSubButtonsActive(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Открыть iframe с нужным режимом
  const openIframe = mode => {
    let url = githubPagesUrl;
    if (mode === 'add') {
      url = `${githubPagesUrl}?action=add-quest`;
    }
    setIframeUrl(url);
    setIframeActive(true);
    setSubButtonsActive(false);
  };

  // Закрыть iframe
  const closeIframe = () => {
    setIframeActive(false);
    setTimeout(() => setIframeUrl(''), 300); // Очищаем src после анимации
  };

  // Закрытие iframe при клике вне контейнера
  const handleOverlayClick = event => {
    if (event.target.classList.contains(styles.iframeOverlay)) {
      closeIframe();
    }
  };

  return (
    <div className={styles.questWidgetContainer}>
      <button
        ref={widgetMainButtonRef}
        className={styles.widgetMainButton}
        onClick={() => setSubButtonsActive(v => !v)}
        aria-label="Открыть меню квестов"
      >
        <img src="/q3.svg" alt="Quests Icon" className={styles.widgetIconQ} />
      </button>
      <div
        ref={widgetSubButtonsRef}
        className={
          subButtonsActive
            ? `${styles.widgetSubButtonsContainer} ${styles.widgetSubButtonsContainerActive}`
            : styles.widgetSubButtonsContainer
        }
      >
        <button
          className={styles.widgetSubButton}
          onClick={() => openIframe('board')}
        >
          <i className="fas fa-clipboard-list"></i> Quests Board
        </button>
        <button
          className={styles.widgetSubButton}
          onClick={() => openIframe('add')}
        >
          <i className="fas fa-plus-circle"></i> Add Quest
        </button>
      </div>
      <div
        className={
          iframeActive
            ? `${styles.iframeOverlay} ${styles.iframeOverlayActive}`
            : styles.iframeOverlay
        }
        onClick={handleOverlayClick}
      >
        <div className={styles.iframeContainer}>
          <button
            className={styles.iframeCloseButton}
            onClick={closeIframe}
            aria-label="Закрыть квесты"
          >
            &times;
          </button>
          {iframeUrl && (
            <iframe
              className={styles.iframeContent}
              src={iframeUrl}
              title="Quests Board"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
