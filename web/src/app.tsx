import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Logger from 'js-logger';
import { useUser } from 'reactfire';
import Loading from '@pages/loading';
import Landing from '@pages/landing';
import Workshops from '@pages/workshops';
import WorkshopEnroll from '@pages/workshopEnroll';
import WorkshopEnrollComplete from '@pages/workshopEnrollComplete';
import AdminUserManagement from '@pages/adminUserManagement';
import Admin from '@pages/admin';
import NotFound from '@pages/notFound';
import AdminLayout from '@layout/adminLayout';
import Layout from '@layout/layout';
import Login from '@pages/login';
import { AnimatePresence } from 'framer-motion';


const App : FC<{}> = ({}) => {
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFetchingAuthClaim, setIsFetchingAuthClaim] = useState(true);

  useEffect(() => {
    switch (user.status) {
      case 'loading':
        Logger.info('Fetching user auth claim');
        setIsFetchingAuthClaim(true);
        break;
      case 'error':
        Logger.info('Fail to fetch user', user.error)
        setIsFetchingAuthClaim(false);
        break;
      case 'success':  // success !== hasUser
        if (user.data) {
          Logger.info("User data", user.data);
          checkIsAdmin(user.data)
            .then(() => setIsAdmin(true))
            .catch(err => Logger.info(err));
        }
        setIsFetchingAuthClaim(false);
        break;
    }
  }, [user]);

  const checkIsAdmin = async (user : User) : Promise<void> => {
    const idToken = await user.getIdTokenResult(true);  // force refresh
    if (!idToken.claims.admin)
      throw Error('User isn\' admin');
  }

  if (isFetchingAuthClaim)
    return <Loading/>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing/>}/>

          <Route path="workshop" element={<Layout/>}>
            <Route index element={<Workshops/>}/>
            <Route path=":workshopId/enroll">
              <Route index element={<WorkshopEnroll/>}/>
              <Route path="complete" element={<WorkshopEnrollComplete/>}/>
            </Route>
          </Route>

          {isAdmin &&
          <Route path="admin" element={<AdminLayout/>}>
            <Route index element={<Admin/>}/>  
            <Route path="user-management" element={<AdminUserManagement/>}/>
          </Route>
          }

          <Route path="*" element={<NotFound/>}/>
        </Route>

        {/* For testing */}
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;