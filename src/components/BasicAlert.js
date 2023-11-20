import React from 'react';
import { theme } from '../styles/Theme';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

/**
 * Warning alert component for error prevention
 * @param {String} description: Warning message to be displayed on alert 
 * @param {String} affirmText: Text display of affirm button
 * @param {Function} affirmAction: Action taken place when 'affirm' button is clicked on
 * @param {Object} affirmContentStyle: To modify the width/height of affirm button
 * @param {Boolean} visible: Display logic for pop-up warning alert 
 * @returns 
 */

const BasicAlert = ({
  description,
  affirmText, 
  affirmAction,
  affirmContentStyle,
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

export default BasicAlert;
