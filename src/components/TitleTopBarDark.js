import React from 'react';
import { theme, invertedTheme } from '../styles/Theme';
import { Appbar, PaperProvider } from 'react-native-paper';

/**
 * Top Navigation Bar to return to settings screen with
 * theme adaptability (toggling between default and high contrast modes)
 * @param {Function} backAction
 * @param {String} title
 * @param {Boolean} darkTheme
 * @returns 
 */
const TitleTopBarDark = ({ backAction, title, darkTheme }) => {
  // If HC mode is toggled, choose invertedTheme, otherwise, choose default
  const display = darkTheme ? invertedTheme : theme;

  return (
    
    <PaperProvider theme={display}>
      <Appbar.Header>
        <Appbar.BackAction 
          onPress={backAction} 
          color={display.colors.text} 
        />
        <Appbar.Content 
          title={title}
          titleStyle={{ fontSize: 16 }}
          color={display.colors.text}
          style={{ alignItems: 'flex-start' }} 
        />
      </Appbar.Header>
    </PaperProvider>
  );
}

export default TitleTopBarDark;
