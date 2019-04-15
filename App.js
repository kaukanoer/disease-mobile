import { createStackNavigator, createAppContainer }  from 'react-navigation';
import { DrawerNavigator } from 'react-navigation'
import Home from './src/screens/Home'
import DetailDisease from './src/screens/DetailDisease'
import Insert from './src/screens/InsertDisease'
import MyApp from './src/screens/Sorting'

const Appnavigator = createStackNavigator({
  home: {screen: Home},
  detail: {screen: DetailDisease},
  insert : {screen: Insert},
  sort: {screen: MyApp},
  home: {screen: Home},
})

const App = createAppContainer(Appnavigator)
export default App