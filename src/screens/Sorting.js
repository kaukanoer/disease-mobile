import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, StatusBar, Image, Button, Alert } from "react-native";
import { SearchBar, Header, Dividern } from 'react-native-elements';
import { NavigationActions, DrawerNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
// import { NavigationActions, StackActions } from 'react-navigation';
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
      refreshing: false 
    };
    this.arrayHolder = [];
  }

  searchFilterFunction(text) {  
    //passing inserted text in searchbar  
    const newData = this.arrayHolder.filter(function(item) {   
      //applying filter    
      const itemData = item.Disease ? item.Disease.toUpperCase(): ''.toUpperCase();   
      const textData = text.toUpperCase();        
      return itemData.indexOf(textData) > -1;    
    });    
  
    this.setState({ 
      //setting the filtered newData on dataSource
      dataSource : newData,
      search : text
   });  
  };

  componentDidMount() {
    return fetch("http://medped.achmadekojulianto.com/index.php/api/disease")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            refreshing: false,
            dataSource: responseJson.filter(item => item.IsActive === '1').sort((a, b) => a.Disease.localeCompare(b.Disease)),
            error : responseJson.error || null
          }, function (){
            this.arrayHolder = this.state.dataSource
          })
      })
      .catch(error => {
        this.setState({ error, loading: false })
      });
  }
  handleRefresh = () => {
    this.setState ({
      refreshing: true
    }, () =>{
      this.componentDidMount()
    })
  }
  _onPressButton() {
    Alert.alert('Sukses','Berhasil input data',[{text: 'OK'}])
    .then(NavigationActions.navigate('home'))
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      // <Button onPress={() => this.props.navigation.navigate('Notifications')}
      // title='Go to Notifications'/>
      <View style={{styles}}>        
      <StatusBar backgroundColor="rgb(4,38,63)" translucent={true}/>
        <Header   
          backgroundColor = "rgb(4,38,63)"   
          barStyle = 'light-content'  
          leftComponent={{ Image: '../src/assets/images/icons8-back-16.png', color: '#fff' }}  
          centerComponent ={{text: 'Disease Info', style:{color: '#FFFFFF', fontSize: 24}}}/>
        <SearchBar
          lightTheme
          searchIcon={{size: 20}}
          placeholder="Search.."
          onChangeText={text => this.searchFilterFunction(text)}
          value ={this.state.search}
        />
        <Button
          title="Go to Jane's profile"
          onPress={this._onPressButton}
        />  
      </View>
    );
  }
}


const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listText:{
    fontSize: 26,
    margin: 15,
  },
});
