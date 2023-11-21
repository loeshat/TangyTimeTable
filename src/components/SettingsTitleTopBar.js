import React from 'react';
import { theme } from '../styles/Theme';
import { Appbar, PaperProvider } from 'react-native-paper';

/**
 * Top Navigation Bar for the Settings screen to access Profile 
 * @param {Function} backAction
 * @param {String} backActiontitle
 * @returns 
 */
const SettingsTitleTopBar = ({ backAction, backActionTitle }) => {
  return (
    <PaperProvider theme={theme}>
      <Appbar.Header
          style={{ 
            justifyContent: 'space-between' 
        }}
      >
        <Appbar.BackAction 
          onPress={backAction} 
          color={theme.colors.text} 
        />
        <Appbar.Content 
          title={backActionTitle}
          titleStyle={{ fontSize: 16 }}
          color={theme.colors.text}
          style={{ alignItems: 'flex-start' }}
        />
      </Appbar.Header>
    </PaperProvider>
  );
}

export default SettingsTitleTopBar;
