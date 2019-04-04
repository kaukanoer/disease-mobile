import React, { Component } from "react";
import { Platform, StyleSheet, View, Text, FlatList, Button } from "react-native";
import { SearchBar, Header } from 'react-native-elements';

export default class Myapp extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
  }

  updateSearch = search => {
    this.setState({search})
  }
  componentDidMount() {
    return fetch("http://medped.achmadekojulianto.com/index.php/api/disease")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.sort((a, b) => a.Disease.localeCompare(b.Disease))
          },
          function(){

          }
        )
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const {search} = this.state
    return (
      <View>
        <Header  
        barStyle='light-content'      
        backgroundColor= '#DAE1E9'
        centerComponent ={{text: 'Disease Info', style:{color: '#333333', fontSize: 24}}}/>
        <SearchBar
          style={{ backgroundColor: '#AAAAAA'}}
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          outer
        />
         <FlatList 
            data={this.state.dataSource}
            renderItem={({item}) =>                         
            <View>
              <Text>{item.id}</Text>
              <Text>{item.Disease}</Text>  
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
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
