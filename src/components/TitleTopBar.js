import React from 'react';
import { theme } from '../styles/Theme';
import { Appbar, PaperProvider } from 'react-native-paper';

const TitleTopBar = ({ backAction, title }) => {
  return (
    <PaperProvider theme={theme}>
      <Appbar.Header>
        <Appbar.BackAction 
          onPress={backAction} 
          color={theme.colors.text} 
        />
        <Appbar.Content 
          title={title}
          titleStyle={{ fontSize: 16 }}
          color={theme.colors.text}
          style={{ alignItems: 'flex-start' }} 
        />
      </Appbar.Header>
    </PaperProvider>
  );
}

export default TitleTopBar;
