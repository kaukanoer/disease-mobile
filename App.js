import { createStackNavigator, createAppContainer }  from 'react-navigation';
import Home from './src/screens/Home'
import DetailDisease from './src/screens/DetailDisease'

const Appnavigator = createStackNavigator({
  home: {screen: Home},
  detail: {screen: DetailDisease},
})

const App = createAppContainer(Appnavigator)
export default App