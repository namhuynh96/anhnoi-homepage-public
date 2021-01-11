import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const FooterNav = ({ className, ...props }) => {
  const classes = classNames("footer-nav", className);

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <Link to="partner">Trở thành đối tác</Link>
        </li>
        <li>
          <a href="mailto:hotro.anhnoi@gmail.com">
            Email: hotro.anhnoi@gmail.com
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;
