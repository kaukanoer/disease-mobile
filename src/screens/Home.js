import React from 'react';
import { StyleSheet, TextInput, Button, FlatList, ActivityIndicator, Text, View, TouchableOpacity  } from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title:'Beranda'
  };
  constructor(props){
    super(props);
    this.state = { isLoading: true}
    this.state = { parsingDisease: ''}
  }

  componentDidMount(){   
    return fetch('http://medped.achmadekojulianto.com/index.php/api/disease')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.sort((a, b) => a.Disease.localeCompare(b.Disease)) //sorting it just layk that
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  } 

  render(){    
    const { navigate } = this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    } else{
      return(
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Cari info penyakit"
              onChangeText={(text) => this.setState({text})}
            />
            <Button title='Search' style={styles.buttonSearch}/>
          </View>
          <FlatList 
            data={this.state.dataSource}
            renderItem={({item}) => 
            <View>
                <TouchableOpacity onPress={() => navigate('detail', { parsingDisease : item.Disease })}>
                  <Text style={styles.listText} >{item.Disease}</Text>
                </TouchableOpacity>
            </View>}
            keyExtractor={({id}, index) => id}
          />
          <Button style={styles.submitButton} title='Sorting'
          onPress={() => navigate('sort')}/>
          <Button style={styles.submitButton} title='Tambah Informasi Penyakit'
          onPress={() => navigate('insert')}/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 5
  }, 
  listText :{
    fontSize: 24
  },
  buttonSearch:{
    width:10,
    alignItems: 'center',
    justifyContent:'center'
  },
  searchBar:{
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(000,000,000,0.1)'
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
  }
})