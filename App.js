import Navigator from './src/navigators/Navigator';
import { Provider } from 'react-redux'
import Store from './src/redux/Store';

import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_900Black,Poppins_400Regular_Italic } from '@expo-google-fonts/poppins'


export default function App() {
  // calling Fonts  (Popins)
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black,Poppins_400Regular_Italic
})
if (!fontsLoaded) {
    return null;
}

  return (
    <>
      <Provider store={Store}>
        <Navigator />
      </Provider>
    </>
  );
}
