import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Button  } from 'react-native';

export default class DetailDisease extends React.Component {
  static navigationOptions = {
    title:'Informasi Penyakit'
  };
  
  constructor(props){
    super(props);
    this.state = { isLoading: true}
    const { navigate } = this.props.navigation;
    this.state = { id: `${this.props.navigation.state.params.idDisease}` }
  }

  componentDidMount(){    
    return fetch('http://medped.achmadekojulianto.com/index.php/api/disease?id='+this.state.id )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  } 
  render(){
    
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
      return(
          <View style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => 
              <View>            
                <Text>Nama Penyakit: {item.Disease}</Text>
                <Text>Definisi: {item.Definition}</Text>
                <Text>Penyebab: {item.Cause}</Text>
                <Text>Pencegahan:{item.Deterrent}</Text>
                <Text>Obat: {item.First_Aid}</Text>
              </View>}
              keyExtractor={({Disease}, index) => Disease}
          />
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 5,
  },
})