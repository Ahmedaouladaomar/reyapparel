import React from "react";
import classes from "./styles.module.css";

export default function CustomLoader() {
  return (
    <div className="flex items-center gap-4 h-[50px]">
      <div className={classes.dot1} />
      <div className={classes.dot2} />
      <div className={classes.dot3} />
    </div>
  );
}
