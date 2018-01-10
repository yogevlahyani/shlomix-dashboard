import * as React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.SFC = () => {
  return (
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
          <li className="sidebar-brand">
              <Link to="/dash">
                <i className="fa fa-home" aria-hidden="true" />
                דף ראשי
              </Link>
          </li>
          <li>
            <Link to="/dash/categories">
              <i className="fa fa-bars" aria-hidden="true" />
              ניהול קטגוריות
            </Link>
          </li>
          <li>
            <Link to="/dash/rests">
              <i className="fa fa-cutlery" aria-hidden="true" />
            ניהול מסעדות
            </Link>
          </li>
          <li>
            <Link to="/dash/orders">
              <i className="fa fa-bicycle" />
              ניהול הזמנות
            </Link>
          </li>
      </ul>
  </div>
  );
};

export default Sidebar;
