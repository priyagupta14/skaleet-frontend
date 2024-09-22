import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import { useTransactions } from './TransactionContext';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppNavigationProp } from './App';

const TransactionScreen = ({ navigation }: {navigation: AppNavigationProp}) => {
  const [amount, setAmount] = useState('');
  const { addTransaction } = useTransactions();
  const [beneficiaries, setBeneficiaries] = useState<
    {
      name: '';
      iban: '';
    }[]
  >([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState({
    iban: '',
    name: '',
  });

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      const storedBeneficiaries = await AsyncStorage.getItem('beneficiaries');
      setBeneficiaries(
        storedBeneficiaries ? JSON.parse(storedBeneficiaries) : [],
      );
    };
    fetchBeneficiaries();
  }, []);

  const handleTransaction = () => {
    addTransaction(amount, selectedBeneficiary);
    navigation.goBack();
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            width: '80%',
            height: Platform.OS === 'ios' ? 40 : undefined,
            marginVertical: 8,
          }}>
          <Picker
            style={{
              width: '100%',
              height: 50,
            }}
            selectedValue={selectedBeneficiary.iban || ''}
            onValueChange={itemValue => {
              const selectedValue = JSON.parse(itemValue);
              const selected = beneficiaries.find(
                beneficiary =>
                  beneficiary.iban === selectedValue.iban &&
                  beneficiary.name === selectedValue.name,
              );
              setSelectedBeneficiary({
                name: `${selected?.name}`,
                iban: selected?.iban || '',
              });
            }}>
            <Picker.Item label="Select Beneficiary" value="" />
            {beneficiaries.map((beneficiary, index) => (
              <Picker.Item
                key={index}
                label={`${beneficiary.name}`}
                value={JSON.stringify({
                  name: beneficiary.name,
                  iban: beneficiary.iban,
                })}
              />
            ))}
          </Picker>
        </View>

        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: '80%',
            marginVertical: 8,
          }}
          onChangeText={setAmount}
          value={amount}
          keyboardType="numeric"
          placeholder="Enter amount"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: '80%',
            marginVertical: 8,
          }}
          value={selectedBeneficiary?.name}
          placeholder="Recipient Name"
          editable={false}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: '80%',
            marginVertical: 8,
          }}
          value={selectedBeneficiary?.iban}
          placeholder="Recipient IBAN"
          editable={false}
        />
        <Button title="Submit Transaction" onPress={handleTransaction} />
      </View>
    </>
  );
};

export default TransactionScreen;
