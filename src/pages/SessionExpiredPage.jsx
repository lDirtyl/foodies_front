import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../redux/common/slice';
import { MODALS } from '../const';

const SessionExpiredPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showModal(MODALS.SIGN_IN));
  }, [dispatch]);

  const handleLoginClick = () => {
    dispatch(showModal(MODALS.SIGN_IN));
  };

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <h1>Session Expired</h1>
      <p>
        Your session has expired or you have been logged out. Please log in
        again to continue.
      </p>
      <button
        onClick={handleLoginClick}
        style={{
          marginTop: 24,
          padding: '10px 24px',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        Log In
      </button>
    </div>
  );
};

export default SessionExpiredPage;
