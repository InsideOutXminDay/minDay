import React from 'react';
import SettingAccount from '../components/SettingAccount';
import Header from '../components/Header';
import '../styles/SettingPage.css';

const SettingPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <div className="setting-page">
        <SettingAccount />
      </div>
    </div>
  );
};

export default SettingPage;
