import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1>The page does not exist</h1>
      <p className={styles["main-text"]}>
      This page has been deleted or never existed
      </p>
    </div>
  );
};

export default NotFoundBlock;
