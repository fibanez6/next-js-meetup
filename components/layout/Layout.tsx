import { ReactElement } from "react";
import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

type Props = {
  children: ReactElement
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <MainNavigation />
      <main className={styles.main}>
        { children }
      </main>
    </div>
  );
}

export default Layout;