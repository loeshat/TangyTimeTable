import { StyleSheet } from 'react-native';
import { theme } from './Theme';

export const loginStyles = StyleSheet.create({
  divider: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  dividerText: {
    paddingHorizontal: 20,
    color: 'lightgrey',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    height: 20,
  },
  buttonPrimary: {
    backgroundColor: '#F0771A',
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'left',
    padding: 20,
  },
  buttonSecondary: {
    backgroundColor: '#FFEBD0',
    borderColor: '#F0771A',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#F0771A',
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white'
  },
  smContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});