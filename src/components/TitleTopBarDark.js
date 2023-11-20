import React from 'react';
import { theme, invertedTheme } from '../styles/Theme';
import { Appbar, PaperProvider } from 'react-native-paper';

/**
 * Top Navigation Bar which only contains return action and the return button's text
 * @param {Function} backAction
 * @param {String} title
 * @returns 
 */
const TitleTopBarDark = ({ backAction, title, darkTheme }) => {
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
