import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from "@components/navbar";
import Logo from '@components/navbar/logo';
import Footer from '@components/footer';


interface Props {
  
};

const Layout: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  );
};

export default Layout;