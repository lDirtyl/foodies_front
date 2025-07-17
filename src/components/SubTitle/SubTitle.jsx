import css from './SubTitle.module.css';

const SubTitle = ({ subTitle }) => {
  return <p className={css.subTitle}>{subTitle}</p>;
};

export default SubTitle;
