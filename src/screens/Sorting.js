import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, StatusBar, Image, Button, Alert } from "react-native";
import { SearchBar, Header, Dividern } from 'react-native-elements';
import { NavigationActions, DrawerNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Modal from 'react-native-modalbox';

export default class Myapp extends Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Home',
  }
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      search: '',  
      error: null,
      refreshing: false,
      swipeToClose: true,
      isDisabled: false, 
    };
    this.arrayHolder = [];
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.MainContainer}>        
      <StatusBar backgroundColor="rgb(4,38,63)" translucent={true}/>
        <Header   
          backgroundColor = "rgb(4,38,63)"   
          barStyle = 'light-content'  
          style={{paddingTop:0}}
          centerComponent ={{text: 'Playgrounf Screen', style:{color: '#FFFFFF', fontSize: 24}}}/>

        <Button onPress={() => this._onPressOK()} style={styles.btn} title='BASIC MODAL'/>  
        

        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal1"}>
          <Text style={styles.text}> Berhasil menambahkan data</Text>
          <Button onPress={() => navigate('home')} style={styles.btn} title='OK'></Button>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    backgroundColor:'#FCE9CC'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 300,
    width: 300
  },
  listText:{
    fontSize: 26,
    margin: 15,
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10,
  },
});
