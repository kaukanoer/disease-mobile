import React from "react";
import { StyleSheet, TextInput, Button, Text, View, ScrollView, StatusBar, Alert } from "react-native";
import { Header } from 'react-native-elements';
import Modal from 'react-native-modalbox';

const api = 'http://medped.achmadekojulianto.com/index.php/api/disease'
async function saveDisease(params){
  try {
    let response = await fetch (api, {
      method: 'POST',
      headers:{
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
      },
      body:JSON.stringify(params)
    })
    let responJson = await response.json()
    return responJson
  } catch (error) {
    console.error(`Error is ${error}`)
  }
}

export default class Insert extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state={
      disease: '',
      definition:'',
      cause:'',
      deterrent:'',
      firstAid:''
    }
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  _onPressOK(){
    Alert.alert(
      'Sukses',
      'Berhasil memasukan data',
      [  
        {text: 'OK', onPress: () => this.props.navigation.navigate('home')}
      ],  
      {cancelable: false},
    )}


  render() {  
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(4,38,63)" translucent={true}/>
        <Header   
            backgroundColor = "rgb(4,38,63)"   
            barStyle = 'light-content'    
            centerComponent ={{text: 'Tambah Informasi', style:{color: '#FFFFFF', fontSize: 24}}}/>
        <ScrollView>
          <Text>Nama Penyakit</Text>
          <TextInput 
            onChangeText={(text) => this.setState({disease : text})}          
            value={this.state.disease}/>

          <Text>Definisi</Text>
          <TextInput 
            onChangeText={(text) => this.setState({definition : text})}          
            value={this.state.definition}/>

          <Text>Penyebab</Text>
          <TextInput 
            onChangeText={(text) => this.setState({cause : text})}          
            value={this.state.cause}/>

          <Text>Pencegahan</Text>
          <TextInput 
            onChangeText={(text) => this.setState({deterrent : text})}          
            value={this.state.deterrent}/>

          <Text>Obat</Text>
          <TextInput 
            onChangeText={(text) => this.setState({firstAid : text})}          
            value={this.state.firstAid} />
          
          <Button title="Simpan"
          onPress={() => {         
            const isian = {
              disease: this.Capitalize(this.state.disease),
              definition: this.Capitalize(this.state.definition),
              cause: this.Capitalize(this.state.cause),
              deterrent: this.Capitalize(this.state.deterrent),
              first_aid: this.Capitalize(this.state.firstAid)
            }
            saveDisease(isian).then(this._onPressOK())
           }}
          />
        </ScrollView>
      </View>
    );
  }
}

export {saveDisease}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    justifyContent: "flex-start"
  },
  menyamping: {
    flex: 1,
    flexDirection: "row"
  }
});