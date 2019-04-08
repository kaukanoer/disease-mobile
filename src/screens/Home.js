import React from 'react';
import { StyleSheet, StatusBar, Button, FlatList, ActivityIndicator, Text, View, TouchableOpacity  } from 'react-native';
import { SearchBar, Header, Divider } from 'react-native-elements';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      parsingDisease: '',
      search: '',
      error: null
    }
    this.arayHolder = []
  }

  componentDidMount(){   
    return fetch('http://medped.achmadekojulianto.com/index.php/api/disease')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.sort((a, b) => a.Disease.localeCompare(b.Disease)), //sorting it just layk that
          error : responseJson.error || null          
        }, function(){
          this.arrayHolder = responseJson.sort((a, b) => a.Disease.localeCompare(b.Disease))
        });
      })
      .catch((error) =>{
        this.setState({ error, loading: false })
      });
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


  render(){    
    const { navigate } = this.props.navigation;
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
          centerComponent ={{text: 'Disease Info', style:{color: '#FFFFFF', fontSize: 24}}}/>
       <SearchBar
          lightTheme
          searchIcon={{size: 20}}
          placeholder="Search.."
          onChangeText={text => this.searchFilterFunction(text)}
          value ={this.state.search}/>

          <FlatList 
            data={this.state.dataSource}
            renderItem={({item}) => 
            <View>
                <TouchableOpacity onPress={() => navigate('detail', { parsingDisease : item.Disease })}>
                  <Text style={styles.listText} >{item.Disease}</Text>
                </TouchableOpacity>
                <Divider/>
            </View>
            }
            keyExtractor={({id}, index) => id}
          />
          {/* <Button style={styles.submitButton} title='Sorting'
          onPress={() => navigate('sort')}/> */}
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
  }, 
  listText:{
    fontSize: 26,
    margin: 10,
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