import React from 'react';
import { theme } from '../styles/Theme';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

/**
 * Warning alert component for error prevention
 * @param {String} description: Warning message to be displayed on alert 
 * @param {String} affirmText: Text display of affirm button
 * @param {Function} affirmAction: Action taken place when 'affirm' button is clicked on
 * @param {Object} affirmContentStyle: To modify the width/height of affirm button
 * @param {String} cancelText: Text display of affirm button
 * @param {Function} cancelAction: Action taken place when user clicks on cancel button
 * @param {String} closeAction: To dismiss/close the alert popup
 * @param {Boolean} visible: Display logic for pop-up warning alert 
 * @returns 
 */
const WarningAlertTranslate = ({ 
  description, 
  affirmText, 
  affirmAction,
  affirmContentStyle,
  cancelText,
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
            accessibilityLabel='cancel-button'
            textColor={theme.colors.text}
            style={{
              borderColor: theme.colors.text,
              borderRadius: 12,
            }}
            contentStyle={{
              width: 80
            }}
            onPress={cancelAction}
          >
            {cancelText}
          </Button>
          <Button
            mode='contained'
            accessibilityLabel='alert-affirm-action-button'
            contentStyle={affirmContentStyle}
            onPress={affirmAction}
            style={{
              borderRadius: 12,
            }}
          >
            {affirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default WarningAlertTranslate;
