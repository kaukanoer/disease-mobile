import { createStackNavigator, createAppContainer }  from 'react-navigation';
import Home from './src/screens/Home'
import DetailDisease from './src/screens/DetailDisease'
import Insert from './src/screens/InsertDisease'

const Appnavigator = createStackNavigator({
  home: {screen: Home},
  detail: {screen: DetailDisease},
  insert : {screen: Insert}
})

const App = createAppContainer(Appnavigator)
export default App