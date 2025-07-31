import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function resetToAccount() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('Account', {
      screen: 'AccountScreen',
    });
  }
}