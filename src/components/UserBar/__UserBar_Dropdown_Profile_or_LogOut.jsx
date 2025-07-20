import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/auth/selectors';
import styles from './__UserBar_Dropdown_Profile_or_LogOut.module.css';
import Avatar from '../Avatar/Avatar';
import LogOutModal from '../LogOutModal/LogOutModal';

const UserBarDropdownProfileOrLogOut = ({ user, onProfile }) => {
  const authUser = useSelector(selectUser);
  const userId = authUser?.id;
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
        className={clsx(styles.profileButton, styles.placeholder)}
        onClick={handleToggle}
      >
        <Avatar src={user?.avatarURL} alt={user?.name} size={'small'} />
        <span className={styles.userName}>{user?.name}</span>
        <img
          className={styles.arrowIcon}
          src={open ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}
          alt={open ? 'Close menu' : 'Open menu'}
          width="18"
          height="18"
        />
      </button>
      {open && (
        <div className={styles.dropdownMenu}>
          <Link
            to={userId ? `/user/${userId}` : '/profile'}
            className={styles.profileMenuItem}
            onClick={handleProfile}
            tabIndex={0}
          >
            PROFILE
          </Link>
          <button className={styles.logoutMenuItem} onClick={handleLogout}>
            LOG OUT
            <img
              className={styles.arrowUpRight}
              src="/icons/arrow-up-right-white.svg"
              alt="Log out"
              width="14"
              height="14"
            />
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

export default UserBarDropdownProfileOrLogOut;
