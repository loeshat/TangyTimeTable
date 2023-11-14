import React from 'react';
import { theme } from '../styles/Theme';
import { Appbar, PaperProvider } from 'react-native-paper';

/**
 * Top Navigation Bar which contains return action,return button's text, 
 * @param {Function} backAction
 * @param {String} backActiontitle
 * @param {Function} forwardAction
 * @returns 
 */
const DoubleTitleTopBar = ({ backAction, backActionTitle, forwardAction }) => {
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
        <Appbar.Action
          icon='cog'
          size={35}
          color={theme.colors.text}
          onPress={forwardAction}
        />
      </Appbar.Header>
    </PaperProvider>
  );
}

export default DoubleTitleTopBar;
