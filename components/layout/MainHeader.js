import Link from "next/link";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Ask Phill Assignment</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/">Homepage</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
