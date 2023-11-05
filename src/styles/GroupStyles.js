import { StyleSheet } from 'react-native';
import { theme } from './Theme';

export const groupStyles = StyleSheet.create({
  speechContainer: {
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10, 
  },
  outerSpeech: {
    width: '100%',
    alignItems: 'flex-end'
  },
  imageContainer: {
    alignItems: 'flex-start', 
    width: '100%',
  },
  imageStyle: {
    width: 150,
    height: 150
  }
});
