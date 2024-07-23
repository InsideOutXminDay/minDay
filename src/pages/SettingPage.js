import React from 'react';
import SettingAccount from '../components/Setting/SettingAccount';
import Header from '../components/Header';
import '../styles/Setting/SettingPage.css';

const SettingPage = ({ logout }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Header logout={logout} />
      <div className="setting-page">
        <SettingAccount />
      </div>
    </div>
  );
};

export default SettingPage;
