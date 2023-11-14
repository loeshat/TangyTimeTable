import { useColorScheme } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

/**
 * Standardised theme following TangyTimeTable's branding
 */
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8300',
    background: '#FFEBD0',
    surface: '#FFFFFF',
    text: '#5E412F',
    disabled: '#9E9E9E',
    success: '#79C1A9'
  }
}

/**
 * Inverted theme following TangyTimeTable's branding
 */
export const invertedTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8300',
    background: '#FFEBD0',
    surface: '#FFFFFF',
    text: '#5E412F',
    disabled: '#9E9E9E',
    success: '#79C1A9'
  }
}

/**
 * Style for progress bars
 */
export const progressStyles = {
  activeStepIconBorderColor: theme.colors.primary,
  activeStepNumColor: theme.colors.primary,
  activeLabelColor: theme.colors.text,
  completedStepIconColor: theme.colors.success,
  completedProgressBarColor: theme.colors.success,
  completedLabelColor: theme.colors.success,
  borderWidth: 1,
  labelFontSize: 15,
  progressBarColor: theme.colors.disabled,
  disabledStepIconColor: '#D6D6D6',
  labelColor: theme.colors.disabled,
}

/**
 * Styles for calendar component
 */
export const calendarTheme = {
  textSectionTitleColor: theme.colors.text,
  dayTextColor: theme.colors.text,
  todayTextColor: theme.colors.success,
  monthTextColor: theme.colors.text,
  textMonthFontWeight: '500',
  arrowColor: theme.colors.text,
  selectedDayBackgroundColor: theme.colors.background,
  selectedDayTextColor: theme.colors.primary,
};
