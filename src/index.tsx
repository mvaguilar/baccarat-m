import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import Table from './components/Table';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Table name="TypeScript"/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
