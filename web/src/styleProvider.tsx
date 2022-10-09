import React, { useState, useEffect, useRef, ReactNode } from "react";
import InterVarWoff from '@fonts/Inter.var.woff2';
import InterItalicVarWoff from '@fonts/Inter-italic.var.woff2';
import FiraCodeVFWoff from '@fonts/FiraCode-VF.woff';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { subscribeWithSelector } from 'zustand/middleware';
import { createStitches, PropertyValue, ScaleValue } from "@stitches/react";


// interface ThemeState {
//   theme: 'light' | 'dark';
//   toggleTheme: () => void
// }


// export const useThemeStore = create<ThemeState>()(
//   devtools(
//   persist(
//   subscribeWithSelector(
//     set => ({
//       theme: 'dark',
//       toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
//     })
//   ),
//   {
//     name: 'theme-storage',
//     getStorage: () => localStorage,
//   }))
// );


// useThemeStore.subscribe(state => state.theme, (theme, _prevTheme) => changeTheme(theme), { fireImmediately: true });


export const { styled, css, keyframes, globalCss } = createStitches({
  theme: {
    colors: {
      blue000: '#070b21',
      blue050: '#0f1634',
      blue100: '#151d43',
      blue150: '#1c2552',
      blue200: '#242f68',
      blue250: '#2a387d',
      blue300: '#344493',
      blue350: '#3c4ea8',
      blue400: '#4558ba',
      blue500: '#4b60c8',
      blue500s: '#3f56cd',
      blue500ss: '#334dce',
      blue500sss: '#2a46d2',
      blue500ssss: '#2240d6',
      blue500sssss: '#1939dc',
      blue600: '#5267d1',
      blue650: '#5c70d6',
      blue700: '#697ddf',
      blue750: '#7285e6',
      blue800: '#8193ed',
      blue850: '#91a1ef',
      blue900: '#aeb8eb',
      blue950: '#ccd2f0',

      gray000: '#000000',
      gray050: '#161616',
      gray100: '#1e1e1e',
      gray150: '#252525',
      gray200: '#2b2b2b',
      gray250: '#3c3c3c',
      gray300: '#404040',
      gray400: '#4f4f4f',
      gray500: '#5d5d5d',
      gray550: '#656565',
      gray600: '#7b7b7b',
      gray650: '#8c8c8c',
      gray700: '#a2a2a2',
      gray750: '#b1b1b1',
      gray800: '#d0d0d0',
      gray850: '#f0f0f0',
      gray900: '#f8f8f8',
      gray950: '#fdfdfd',
      gray1000: '#ffffff',

      red300: '#7d232c',
      red400: '#942c36',
      red500: '#a43b45',
      red500sss: '#b92a38',
      red600: '#b44752',
      red700: '#c2545f',
      red700s: '#cb505c',
      red700ss: '#d64a58',
      red700sss: '#e14555',
    },
    fonts: {
      inter: 'Inter',
      firacode: 'FiraCode',
      ibmplexmono: 'IBM Plex Mono'
    },
  },
  utils: {
    flexbox: (value : PropertyValue<'flexDirection'>) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
      flexDirection: value,
    }),
  },
  media: {
    bp1: 'screen and (max-width: 480px)',
    bp2: 'screen and (max-width: 768px)',
    bp3: 'screen and (max-width: 1024px)',
    bp4: 'screen'
  },
});


const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    border: "none",
    margin: 0,
    padding: 0,
    outline: 'none',
  },
  html: {
    scrollBehavior: "smooth",
  },
  body: {
    fontFamily: "Inter",
    backgroundColor: "$gray850",
    transition: "background 0.8s",
  },
  'html, body, #root': {
    minHeight: "100vh",
  },
  ul: {
    listStyle: 'none'
  },
  a: {
    textDecoration: 'none'
  },
  '#root': {
    flexbox: 'column',
    // backgroundColor: "$gray850",  // somehow chakra makes #root white
  },
});


const StyleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  globalStyles();
  
  return (
    <>
      {children}
    </>
  );
};

export default StyleProvider;


// function changeTheme(theme: ThemeState['theme']) {
//   let style : {[k: string]: string};

//   switch(theme) {
//     case 'light':
//       style = {
//       };
//       break;
//     case 'dark':
//       style = {
//       };
//       break;
//   }

//   Object.entries(style).forEach(([k, v]) => {
//     document.documentElement.style.setProperty(k, v);
//   })
// }