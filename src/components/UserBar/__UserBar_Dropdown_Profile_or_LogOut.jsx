import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './__UserBar_Dropdown_Profile_or_LogOut.module.css';
import Avatar from '../Avatar/Avatar';
import LogOutModal from '../LogOutModal/LogOutModal';

const __UserBar_Dropdown_Profile_or_LogOut = ({
  user,
  onProfile,
  onLogout,
}) => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setOpen(prev => !prev);
  const handleProfile = () => {
    setOpen(false);
    onProfile && onProfile();
  };
  const handleLogout = () => {
    setOpen(false);
    setShowLogoutModal(true);
  };

  return (
    <div className={styles.profileDropdownWrapper} ref={dropdownRef}>
      <button
        className={clsx(styles.profileButton, '_placeholder_xo6oc_35')}
        onClick={handleToggle}
      >
        <Avatar src={user?.avatarURL} alt={user?.name} size={'small'} />
        <span className={styles.userName}>{user?.name}</span>
        <svg
          className={styles.arrowIcon}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11L11 7M11 7H7M11 7V11"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className={styles.dropdownMenu}>
          <Link
            to={user?.id ? `/user/${user.id}` : '/profile'}
            className={styles.profileMenuItem}
            onClick={handleProfile}
            tabIndex={0}
          >
            PROFILE
          </Link>
          <button className={styles.logoutMenuItem} onClick={handleLogout}>
            LOG OUT
            <svg
              className={styles.arrowUpRight}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11L11 7M11 7H7M11 7V11"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      {showLogoutModal && (
        <LogOutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default __UserBar_Dropdown_Profile_or_LogOut;
