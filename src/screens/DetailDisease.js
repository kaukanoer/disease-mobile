import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import {  Header, Divider } from 'react-native-elements';
import HTML from 'react-native-render-html'

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
                {/* <Text style={styles.subJudul}>{item.Definition}</Text> */}
                <HTML style={styles.subJudul} html={item.Definition}/>
                <Divider/>

                <Text style={styles.judul}>Penyebab</Text>
                {/* <Text style={styles.subJudul}>{item.Cause}</Text> */}
                  <HTML style={styles.subJudul} html={item.Cause}/>
                <Divider/>

                <Text style={styles.judul}>Pencegahan</Text>
                {/* <Text style={styles.subJudul}>{item.Deterrent}</Text> */}
                <HTML html={item.Deterrent} style={styles.subJudul}/>
                <Divider/>

                <Text style={styles.judul}>Obat:</Text>
                {/* <Text style={styles.subJudul}>{item.First_Aid}</Text> */}
                <HTML html={item.First_Aid} style={styles.subJudul}/>
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