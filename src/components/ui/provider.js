'use client'
import { ChakraProvider, createSystem, defaultConfig, defaultSystem, defineConfig, defineTextStyles } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { persist, store } from '../persist';
import { PersistGate } from 'redux-persist/integration/react';
import './fonts.css'

import { Provider as ReduxProvider } from 'react-redux'

const textStyles = defineTextStyles({
  theme1: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Gill Sans",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
  theme2: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Roboto",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
  theme3: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
});

const config = defineConfig({
  theme: {
    textStyles
  }
})

const system = createSystem(defaultConfig, config);

export function Provider({ children, ...props }) {

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <ChakraProvider value={system} >
          <ColorModeProvider {...props} >
            {children}
          </ColorModeProvider>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
