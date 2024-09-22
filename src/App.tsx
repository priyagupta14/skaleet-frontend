import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import { TransactionProvider } from './TransactionContext';
import CreateBeneficiary from './BeneficiaryScreen';
import { StackNavigationProp } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

export type AppNavigatorList = {
  Home: undefined;
  'Create Beneficiary': undefined;
  Transaction: undefined;
};

export type AppNavigationProp =
  StackNavigationProp<AppNavigatorList>;


const App = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Transaction" component={TransactionScreen} />
          <Stack.Screen name="Create Beneficiary" component={CreateBeneficiary} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;
