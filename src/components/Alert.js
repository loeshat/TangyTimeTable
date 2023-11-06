import React from 'react';
import { theme } from '../styles/Theme';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const WarningAlert = ({ 
  description, 
  affirmText, 
  affirmAction,
  affirmContentStyle,
  cancelAction, 
  closeAction, 
  visible 
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible} 
        onDismiss={closeAction}
        style={{
          backgroundColor: theme.colors.background
        }}
      >
        <Dialog.Title
          style={{
            color: theme.colors.primary,
            fontWeight: '500'
          }}
        >
          Warning
        </Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyLarge'>
            {description}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode='outlined'
            textColor={theme.colors.text}
            style={{
              borderColor: theme.colors.text
            }}
            contentStyle={{
              width: 80
            }}
            onPress={cancelAction}
          >
            Cancel
          </Button>
          <Button
            mode='contained'
            contentStyle={affirmContentStyle}
            onPress={affirmAction}
          >
            {affirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default WarningAlert;
