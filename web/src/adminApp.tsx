import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Logger from 'js-logger';
import { useUser } from 'reactfire';
import Loading from '@pages/loading';
import AdminUserManagement from '@pages/adminUserManagement';
import Admin from '@pages/admin';
import AdminLayout from '@layout/adminLayout';


const AdminApp : FC<{}> = ({}) => {
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFetchingAuthClaim, setIsFetchingAuthClaim] = useState(true);

  const location = useLocation();

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
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<AdminLayout/>}>
        <Route index element={<Admin/>}/>  
        <Route path="user-management" element={<AdminUserManagement/>}/>
      </Route>
    </Routes>
  );
}

export default AdminApp;