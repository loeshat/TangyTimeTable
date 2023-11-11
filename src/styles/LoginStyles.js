import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  divider: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'lightgrey',
    fontSize: 16,
    backgroundColor: '#f2f2f2',
    margin: 5,
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
});