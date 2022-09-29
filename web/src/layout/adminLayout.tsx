import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from "@components/navbar";
import profileIcon from '@assets/profileIcon.jpg';


interface Props {
  
};

const AdminLayout: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <NavBar img={profileIcon}/>
      <Outlet/>
    </>
  );
};

export default AdminLayout;