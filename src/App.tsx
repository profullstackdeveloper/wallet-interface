import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateWallet, { CreateNew, ImportWallet, Main, SetPassword } from './pages/CreateWallet';
import LoginWallet from './pages/LoginWallet';
import WalletContextProvider from './context/walletContext';
import Layout from './layout/Layout';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='create' element={<CreateWallet />}>
              <Route path="" element={<Main />} />
              <Route path="/create/new" element={<CreateNew />} />
              <Route path='/create/import' element={<ImportWallet />} />
              <Route path="/create/set-password" element={<SetPassword />} />
            </Route>
            <Route path='/login' element={<LoginWallet />} />
            <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='*' element={<LoginWallet />} />
          </Routes>
        </Layout>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
