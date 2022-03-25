import React from 'react';
import App from '~/containers/App';
import './index.css';
import UploadFiles from "../../components/upLoad/UploadFiles"

const Invitation = () => (
  <App>
      <h1>Invitation</h1>
      <UploadFiles />
  </App>
);

export default Invitation;
