import React from 'react';
import { theme } from '../styles/Theme';
import { Appbar, PaperProvider } from 'react-native-paper';

/**
 * Top Navigation Bar which only contains return action and the return button's text
 * @param {Function} backAction
 * @param {String} title
 * @returns 
 */
const InvertedTitleTopBar = ({ backAction, title }) => {
  return (
    <PaperProvider theme={theme}>
      <Appbar.Header style={{ backgroundColor: "#4B4848"}}>
        <Appbar.BackAction 
          onPress={backAction} 
          color={theme.colors.surface} 
        />
        <Appbar.Content 
          title={title}
          titleStyle={{ fontSize: 16 }}
          color={theme.colors.surface}
          style={{ alignItems: 'flex-start' }} 
        />
      </Appbar.Header>
    </PaperProvider>
  );
}

export default InvertedTitleTopBar;
