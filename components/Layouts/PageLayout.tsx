import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import React from 'react';
import { ModalProvider } from 'components/Modal/Provider';

const PageLayout: React.FC = ({ children }) => (
  <ModalProvider>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </ModalProvider>
);

export default PageLayout;
