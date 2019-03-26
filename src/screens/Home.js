import React from 'react';
import { StyleSheet, TextInput, Button, FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title:'Beranda'
  };
  constructor(props){
    super(props);
    this.state = { isLoading: true}
    this.state = { idDisease: ''}
  }

  componentDidMount(){   
    return fetch('http://medped.achmadekojulianto.com/index.php/api/disease')
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
    const { navigate } = this.props.navigation;
    // const cariButton = ({ children }) => ({
    //   type: Button,
    //   props: {
    //     color: 'rgb(32,78,95)',
    //     children: children
    //   }
    // })
    
    // const dataList = [].concat(this.state.data)
    // .sort((a, b) => a.idDisease > b.idDisease)
    // .map((item, i) =>
    //   <div key={i}>
    //   {item.Disease}
    //   </div>
    // )
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Cari info penyakit"
            onChangeText={(text) => this.setState({text})}
          />
          <Button title='Cari' style={styles.buttonSearch}/>
          {/* <cariButton/> */}
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View>            
            <Text 
            // onPress={() => this.props.navigation.navigate("detail", this.state.idDisease=item.id)}
            onPress={() => navigate('detail', { idDisease : item.id })}
            >{item.Disease}</Text>
          </View>}
          keyExtractor={({Disease}, index) => Disease}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 5
  }, 
  buttonSearch:{
    width:30
  },
  searchBar:{
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(000,000,000,0.1)'
  }
})