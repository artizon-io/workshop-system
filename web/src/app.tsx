import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Loading from '@pages/loading';
import Landing from '@pages/landing';
import Workshops from '@pages/workshops';
import WorkshopEnroll from '@pages/workshopEnroll';
import WorkshopEnrollComplete from '@pages/workshopEnrollComplete';
import NotFound from '@pages/notFound';
import Layout from '@layout/layout';
import Login from '@pages/login';
import Error from '@pages/error';
import { AnimatePresence } from 'framer-motion';
import AdminApp from './adminApp';
import Support from '@pages/support';


const App : FC<{}> = ({}) => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Landing/>}/>

        <Route path="/workshop" element={<Layout/>}>
          <Route index element={<Workshops/>}/>
          {/* <Route path=":workshopId/enroll">
            <Route index element={<WorkshopEnroll/>}/>
            <Route path="complete" element={<WorkshopEnrollComplete/>}/>
          </Route> */}
        </Route>

        <Route path="/admin/*" element={<AdminApp/>}/>
        
        {import.meta.env.DEV && <>
          <Route path="/login" element={<Login/>}/>
          <Route path="/loading" element={<Loading/>}/>
          <Route path="/notfound" element={<NotFound/>}/>
          <Route path="/error" element={<Error/>}/>
          {/* <Route path="/support" element={<Support/>}/> */}
        </>}

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;