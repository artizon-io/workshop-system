import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from "@components/navbar";


interface Props {
  
};

const AdminLayout: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <NavBar adminMode/>
      <Outlet/>
    </>
  );
};

export default AdminLayout;