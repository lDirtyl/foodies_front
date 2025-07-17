import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import __UserBar_Dropdown_Profile_or_LogOut from './__UserBar_Dropdown_Profile_or_LogOut';
import styles from './UserBar.module.css';

const UserBar = () => {
  const user = useSelector(selectUser);
  return (
    <div className={styles.wrapper}>
      <__UserBar_Dropdown_Profile_or_LogOut user={user} />
    </div>
  );
};

export default UserBar;
