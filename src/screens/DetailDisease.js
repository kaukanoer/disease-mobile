import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, StatusBar  } from 'react-native';
import { SearchBar, Header, Divider } from 'react-native-elements';

export default class DetailDisease extends React.Component {
  static navigationOptions = {
    header: null
  };
  
  constructor(props){
    super(props);
    this.state = { isLoading: true}
    this.state = { name: `${this.props.navigation.state.params.parsingDisease}` }
  }

  componentDidMount(){    
    return fetch('http://medped.achmadekojulianto.com/index.php/api/disease?diseases='+this.state.name )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
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
    } else {
      return(
          <View style={styles.container}>
          <StatusBar backgroundColor="rgb(4,38,63)" translucent={true}/>
          <Header   
            backgroundColor = "rgb(4,38,63)"   
            barStyle = 'light-content'    
            centerComponent ={{text: this.state.name, style:{color: '#FFFFFF', fontSize: 24}}}/>
       
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => 
              <View style={styles.detailContainer}>            
                <Text style={styles.judul}>Definisi</Text>
                <Text style={styles.subJudul}>{item.Definition}</Text>
                <Divider/>

                <Text style={styles.judul}>Penyebab</Text>
                <Text style={styles.subJudul}>{item.Cause}</Text>
                <Divider/>

                <Text style={styles.judul}>Pencegahan</Text>
                <Text style={styles.subJudul}>{item.Deterrent}</Text>
                <Divider/>

                <Text style={styles.judul}>Obat:</Text>
                <Text style={styles.subJudul}>{item.First_Aid}</Text>
              </View>}
              keyExtractor={({Disease}, index) => Disease}
          />
          </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  detailContainer:{
    paddingLeft: 10,
    paddingRight: 10,
  },
  judul:{
    fontSize: 22,
    paddingTop: 10
  },
  subJudul: {
    fontSize: 18,
    paddingBottom: 10,
    textAlign: 'justify'
  }
})