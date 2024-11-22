/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  useAnimatedValue
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const currencyConverterEndPoint = 'https://api.frankfurter.app'

const fetchCurrencyLatest = () =>{
  return fetch(`${currencyConverterEndPoint}/latest`)
    .then(response => response.json())
    .then(data => Object.keys(data.rates))
}
 const convertCurrencyAPI = (amount, sourceCurrency, targetCurrency) =>{
    return fetch(`${currencyConverterEndPoint}/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`)
    .then(response => response.json())
 }
const App = () =>{
  const [open, setOpen] = useState(false);
  const [targetOpen, setTargetOpen] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const[sourceAmount, setSourceAmount] = useState("");
  const[sourceCurrency, setSourceCurrency] = useState("");
  const[targetAmount, setTargetAmount] = useState("");
  const[targetCurrency, setTargetCurrency] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
  fetchCurrencyLatest()
  .then(list => setCurrencyList(list))

  convertCurrencyAPI(1, "USD", "INR")
  .then(data => console.log(data))
}, [])

const convertCurrency = (amount, sourceCurrency, targetCurrency) =>{
  setLoading(true);
  convertCurrencyAPI(amount, sourceCurrency, targetCurrency)
  .then(data => {
    const {rates} = data; 
    setTargetAmount(rates[targetCurrency].toString());
    setLoading(false);
  })
}


return (
  <SafeAreaView>
    <StatusBar />
    <View style={styles.full}>
      <View 
      style = {styles.mainContainer}
      >
        <View>
           <Text style={styles.textColor}>Amount</Text>
            <TextInput 
            style = {styles.TextInput }
            onChangeText={value => setSourceAmount(value)}
            value={sourceAmount}
            keyboardType='numeric'
            />
            <Text style={styles.textColor}>From</Text>
            {/* <TextInput 
            style = {styles.TextInput }
            onChangeText={value => setSourceCurrency(value)}
            value = {sourceCurrency}

            /> */}
            <DropDownPicker 
              style = {[styles.TextInput, styles.dropOne]}
              onChangeText={value => setSourceCurrency(value)}
              open = {open}
              value = {sourceCurrency}
              items = {currencyList.map( currency => ({
                label: currency,
                value: currency,
              }))}
              setOpen = {setOpen}
              setValue={setSourceCurrency}
            />
        </View>
        <View>
           {/* <Text>Target Amount</Text>
            <TextInput 
            style = {styles.TextInput }
            editable = {false}
            value = {targetAmount}
            /> */}
            <Text style={styles.textColor}>To</Text>
            <DropDownPicker 
              style = {[styles.TextInput, styles.dropTwo]}
              onChangeText={value => setTargetCurrency(value)}
              open = {targetOpen}
              value = {targetCurrency}
              items = {currencyList.map( currency => ({
                label: currency,
                value: currency,
              }))}
              setOpen = {setTargetOpen}
              setValue={setTargetCurrency}
            />
             <Text style={styles.textColor}>Converted Amount</Text>
            <TextInput 
            style = {styles.TextInput }
            editable = {false}
            value = {targetAmount}
            />
        </View>
        <View>
          {
            loading 
            ?<ActivityIndicator color="#000000" size="large"/>
            
            :<TouchableOpacity 
            style={styles.button} 
            onPress={() => convertCurrency(sourceAmount, sourceCurrency, targetCurrency)}
          >
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>
          
        // :<Button onPress={value => convertCurrency(sourceAmount, sourceCurrency, targetCurrency)} title="Convert"/>
           }
        </View>
      </View>
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  full:{
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    padding: 20
  },

mainContainer:{
  
  marginTop: '50%',
  padding: 20,
  height: 400,
  backgroundColor: '#232323',
  borderRadius: 10,
},
TextInput:{
  backgroundColor: '#ddd',
  borderRadius: 5,
  marginBottom: 5
},
dropOne :{
  zIndex : 1000,
},
dropTwo:{
  zIndex : 500,
},
textColor:{
  color: '#2fe6de',
  fontWeight: 'bold',
  fontSize: 20,
},
button: {
  backgroundColor: '#2fe6de',   
  borderRadius: 30,              
  paddingVertical: 12,          
  paddingHorizontal: 20,        
  alignItems: 'center',         
  marginTop: 10,                
},
buttonText: {
  color: 'white',               
  fontSize: 18,                 
  fontWeight: 'bold',           
},

});

export default App;