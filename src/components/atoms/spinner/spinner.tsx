import classes from './styles.module.css';

export function Spinner() {
  return (
    <div className={classes.loader}>
      <div className={classes.outer}></div>
      <div className={classes.middle}></div>
      <div className={classes.inner}></div>
    </div>
  );
}
