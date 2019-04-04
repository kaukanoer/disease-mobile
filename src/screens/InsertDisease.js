import React from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  ScrollView
} from "react-native";

const api = 'http://medped.achmadekojulianto.com/index.php/api/disease'
export default class Insert extends React.Component {
  static navigationOptions = {
    title: "Tambah Informasi"
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

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        {/* text input untuk 4 field lainnya */}
          <Text>Nama Penyakit</Text>
          <TextInput 
            // style={styles.field}
            onChangeText={(text) => this.setState({disease : text})}          
            value={this.state.disease}
          />
          <Text>Definisi</Text>
          <TextInput 
            // style={styles.field}
            onChangeText={(text) => this.setState({definition : text})}          
            value={this.state.definition}
          />
          <Text>Penyebab</Text>
          <TextInput 
            // style={styles.field}
            onChangeText={(text) => this.setState({cause : text})}          
            value={this.state.cause}
          />
          <Text>Nama Penyakit</Text>
          <TextInput 
            // style={styles.field}
            onChangeText={(text) => this.setState({deterrent : text})}          
            value={this.state.deterrent}
          />
          <Text>Obat</Text>
          <TextInput 
            // style={styles.field}
            onChangeText={(text) => this.setState({firstAid : text})}          
            value={this.state.firstAid}
          />
          <Button 
          title="Simpan"
          onPress={() =>{
            const isian = {
              disease: this.state.disease,
              definition: this.state.definition,
              cause: this.state.cause,
              deterrent: this.state.deterrent,
              first_aid: this.state.firstAid
            }
            saveDisease(isian) //if u want to add some confirmation, add <<<.then>>> after this code
          }}
          />
        </View>
      </ScrollView>
    );
  }
}

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
    return responJson.result
  } catch (error) {
    console.error(`Error is ${error}`)
  }
}

export {saveDisease}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  textArea: {
    // height: 150,
    justifyContent: "flex-start"
  },
  menyamping: {
    flex: 1,
    flexDirection: "row"
  }
});
