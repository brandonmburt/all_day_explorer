
import React from "react";
import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Not Found Test</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};
