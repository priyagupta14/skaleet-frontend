import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValid } from 'iban';
import { AppNavigationProp } from './App';

const CreateBeneficiary = ({
  navigation,
}: {
  navigation: AppNavigationProp;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const [error, setError] = useState('');

  const saveBeneficiary = async () => {
    if (!isValid(iban)) {
      setError('Invalid IBAN');
      return;
    }

    const newBeneficiary = { name: `${firstName} ${lastName}`, iban };
    const storedBeneficiaries = await AsyncStorage.getItem('beneficiaries');
    const beneficiaries = storedBeneficiaries
      ? JSON.parse(storedBeneficiaries)
      : [];
    beneficiaries.push(newBeneficiary);
    await AsyncStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));

    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Save Beneficiary" onPress={saveBeneficiary} />
    </View>
  );
};

export default CreateBeneficiary;
