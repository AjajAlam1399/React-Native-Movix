import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_900Black } from '@expo-google-fonts/poppins'

export default Fonts = () => {
    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black
    })
    if (!fontsLoaded) {
        return null;
    }
}