import { StyleSheet } from 'react-native';
import { theme } from './Theme';

export const flowStyles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '88%',
    backgroundColor: '#FFFFFF'
  },
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
