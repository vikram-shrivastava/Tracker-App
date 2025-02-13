import { View } from 'react-native';
import Header from './component/Header.js';
import LandingPage from './component/Landingpage.js';
// import Target from './component/Target.js';
export default function App() {
 
  return (
    <View>
      <Header />
      <LandingPage/>
      {/* <Target/> */}
    </View>
  );
}
