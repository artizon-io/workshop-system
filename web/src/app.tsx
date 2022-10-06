import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
const Loading = React.lazy(() => import('@pages/loading'));
const Landing = React.lazy(() => import('@pages/landing'));
const Workshops = React.lazy(() => import('@pages/workshops'));
const WorkshopEnroll = React.lazy(() => import('@pages/workshopEnroll'));
const WorkshopEnrollComplete = React.lazy(() => import('@pages/workshopEnrollComplete'));
const NotFound = React.lazy(() => import('@pages/notFound'));
const Layout = React.lazy(() => import('@layout/layout'));
const Login = React.lazy(() => import('@pages/login'));
const Error = React.lazy(() => import('@pages/error'));
import { AnimatePresence } from 'framer-motion';
import AdminApp from './adminApp';
const Support = React.lazy(() => import('@pages/support'));


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
        
        {(import.meta.env.DEV || import.meta.env.VITE_IS_DEMO_MODE) && <>
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