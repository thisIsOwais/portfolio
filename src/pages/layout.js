// // src/components/Layout.jsx
import React from 'react';
import './layout.scss'; // SCSS for layout styling

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {children}
    </div>
  );
};

export default Layout;
