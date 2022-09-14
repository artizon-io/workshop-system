import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChakraProvider, useToast, Text } from '@chakra-ui/react';
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from 'pages/login';
import { Home } from 'pages/home';
import { Admin } from 'pages/admin';
import { AdminManagement } from 'pages/adminManagement';
import Logger from 'js-logger';
import { Enroll } from 'pages/enroll';
import { useConfigedToast } from 'hooks/useConfigedToast';
import { Loading } from 'pages/loading';
import { useUser } from 'reactfire';


// To be make Logger.OFF at production
Logger.useDefaults({
  defaultLevel: Logger.TRACE,
  formatter: function (messages, context) {
    messages.unshift(`[${context.level.name}]`)
  }
});


const App : FC<{}> = ({}) => {
  const user = useUser();
  const toast = useConfigedToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      switch (user.status) {
        case 'error':
          toast({
            status: "error",
            description: "Error occurred when fetching user status"
          })
          Logger.error(user.error)
          setIsLoading(false);
          break;
        case 'loading':
          setIsLoading(true);
          break;
        case 'success':
          await checkIsAdmin(user.data);
          setIsLoading(false);
          break;
      }
    })();
  }, [user]);

  const checkIsAdmin = async (user : User) : Promise<void> => {
    const idToken = await user.getIdTokenResult(true);  // force refresh
    if (idToken.claims.admin)
      setIsAdmin(true);
  }

  const adminConditionalRender = (elem : ReactElement) : ReactNode => {
    if (isLoading)
      return <Loading/>;

    else if (!isAdmin)
      return <Navigate to="/admin/login"/>;

    else
      return elem;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="workshop/:workshopId/enroll/:enrollId">
            <Route index element={<Enroll/>}/>
            <Route path="confirmation" element={<Enroll/>}/>
          </Route>
        </Route>

        <Route path="/admin">
          <Route index element={adminConditionalRender(<Admin/>)}/>  
          <Route path="login" element={adminConditionalRender(<Login/>)}/>
          <Route path="admin-management" element={adminConditionalRender(<AdminManagement/>)}/>
        </Route>

        <Route path="*" element={<Text>Not Found</Text>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;