
import Link from "next/link"
import styles from "../styles/Nav.module.css"

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
          <a>Home</a>
          </Link>
        </li>

        <li>
          <Link href="/about">
          <a>about</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;