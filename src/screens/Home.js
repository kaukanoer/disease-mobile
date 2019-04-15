import React from 'react';
import { StyleSheet, StatusBar, Button, FlatList, ActivityIndicator, Text, View, TouchableOpacity, Alert, BackHandler  } from 'react-native';
import { SearchBar, Header, Divider } from 'react-native-elements';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      parsingDisease: '',
      search: '',
      error: null,
      refreshing: false
    }
    this.arayHolder = []
  }

  componentDidMount(){   
    // BackHandler.addEventListener('hardwareBackPress', function(){
    //   if (!this.onMainScreen()) {
    //     this.goBack();
    //     return true;
    //   }
    //   return false;
    // })
    return fetch('http://medped.achmadekojulianto.com/index.php/api/disease')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: responseJson.filter(item => item.IsActive === '1').sort((a, b) => a.Disease.toUpperCase().localeCompare(b.Disease.toUpperCase())), //sorting it just layk that
          error : responseJson.error || null          
        }, function(){
          this.arrayHolder = this.state.dataSource
        });
      })
      .catch((error) =>{
        this.setState({ error, loading: false })
      });
  } 

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

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

  handleBackButton = () => {
    Alert.alert(
      'Keluar Aplikasi',
      'Apakah anda yakin untuk keluar aplikasi', [{
        text: 'Tidak'
      },{
        text: 'Ya',
        onPress: () => BackHandler.exitApp()
      }]
    )
    return true
  } 

  handleRefresh = () => {
    this.setState ({
      refreshing: true
    }, () =>{
      this.componentDidMount()
    })
  }

  render(){    
    const { navigate } = this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="rgb(4,38,63)" translucent={true}/>
          <Header   
            backgroundColor = "rgb(4,38,63)"   
            barStyle = 'light-content'    
            centerComponent ={{text: 'InboHealth', style:{color: '#FFFFFF', fontSize: 24}}}/>
          <SearchBar
              lightTheme
              placeholder="Search.."
              onChangeText={text => this.searchFilterFunction(text)}
              value ={this.state.search}/>

            <FlatList 
              data={this.state.dataSource}
              keyExtractor={({id}, index) => id}
              refreshing = {this.state.refreshing}      
              onRefresh={this.handleRefresh}    
              renderItem={({item}) => 
              <View>
                  <View>
                    <TouchableOpacity onPress={() => navigate('detail', { parsingDisease : item.Disease })}>
                      <Text style={styles.listText} >{item.Disease}</Text>
                    </TouchableOpacity>
                    <Divider/>
                  </View>
              </View>
              }
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