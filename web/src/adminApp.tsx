import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { BrowserRouter, Navigate, redirect, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Logger from 'js-logger';
import { useUser } from 'reactfire';
const Loading = React.lazy(() => import('@pages/loading'));
const AdminUserManagement = React.lazy(() => import('@pages/adminUserManagement'));
const Admin = React.lazy(() => import('@pages/admin'));
const AdminLayout = React.lazy(() => import('@layout/adminLayout'));
const NotFound = React.lazy(() => import('@pages/notFound'));
import { AnimatePresence } from 'framer-motion';


const AdminApp : FC<{}> = ({}) => {
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFetchingAuthClaim, setIsFetchingAuthClaim] = useState(true);

  const navigate = useNavigate();

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
        // setTimeout(() => setIsFetchingAuthClaim(false), 2000);
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
    return null;
  //   return <Loading/>;  // FIXME: Animate presence not waiting for this
  // return <Loading key="loading"/>;
  //   return (
  //     <Routes>
  //       <Route path="*" element={<Loading/>}/>
  //     </Routes>
  //   );

  // if (!isAdmin) {
  //   navigate('/login');
  //   return null;
  // }

  return (
    // Route not changing thus cannot rely on the top-level animate presence to do page transition for us
    // <AnimatePresence mode='wait'> 
    //   {isFetchingAuthClaim
    //   ? <Loading key='loading'/>
    //   : <Routes>
    //     <Route path="/" element={<AdminLayout/>}>
    //       <Route index element={<Admin/>}/>  
    //       <Route path="user-management" element={<AdminUserManagement/>}/>
    //     </Route>

    //     <Route path="*" element={<NotFound/>}/>
    //   </Routes>
    //   }
    // </AnimatePresence>
    // <Routes>
    //   <Route path="/" element={
    //     <AnimatePresence mode='wait'>
    //       {isFetchingAuthClaim
    //       ? <Loading key='loading'/>
    //       : <AdminLayout key='layout'/>
    //       }
    //     </AnimatePresence>
    //   }>
    //     <Route index element={<Admin/>}/>  
    //     {/* <Route path="user-management" element={<AdminUserManagement/>}/> */}
    //   </Route>

    //   <Route path="*" element={<NotFound/>}/>
    // </Routes>
    <Routes>
      <Route path="/" element={<AdminLayout/>}>
        <Route index element={<Admin/>}/>  
        {/* <Route path="user-management" element={<AdminUserManagement/>}/> */}
      </Route>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default AdminApp;