import classes from "./Pagination.module.css";

const Pagination = (props) => {
  return (
    <div className={classes.paginationButtons}>
      <button className={classes.btn} onClick={() => props.onClick("previous")}>
        {props.textPrevious}
      </button>
      <button className={classes.btn} onClick={() => props.onClick("next")}>
        {props.textNext}
      </button>
    </div>
  );
};

export default Pagination;
