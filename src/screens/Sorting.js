import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, StatusBar } from "react-native";
import { SearchBar, Header, Divider } from 'react-native-elements';

export default class Myapp extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '',  error: null };
    this.arrayHolder = [];
  }

  search = text => {
    console.log(text)
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
            dataSource: responseJson.sort((a, b) => a.Disease.localeCompare(b.Disease)),
            error : responseJson.error || null
          }, function (){
            this.arrayHolder = responseJson.sort((a, b) => a.Disease.localeCompare(b.Disease))
          })
      })
      .catch(error => {
        this.setState({ error, loading: false })
      });
  }
  render() {
    return (
      <View style={{styles}}>        
      <StatusBar backgroundColor="rgb(4,38,63)" translucent={true}/>
        <Header   
          backgroundColor = "rgb(4,38,63)"   
          barStyle = 'light-content'    
          centerComponent ={{text: 'Disease Info', style:{color: '#FFFFFF', fontSize: 24}}}/>
        <SearchBar
          lightTheme
          searchIcon={{size: 20}}
          placeholder="Search.."
          onChangeText={text => this.searchFilterFunction(text)}
          value ={this.state.search}
        />
         <FlatList 
            data={this.state.dataSource}
            renderItem={({item}) =>                         
            <View>
              <Text style={styles.listText}>{item.Disease}</Text>  
              <Divider/>
            </View>                       
            }
            keyExtractor={({Disease}, index) => Disease}
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
