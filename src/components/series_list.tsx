import { StyleSheet, View } from "react-native";
import VideoPlayer from "./video_player_component";
import { SafeAreaView } from "react-native-safe-area-context";

export const MovieSerie=()=>{
    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.videoSection}>
                <VideoPlayer/>
            </View>
            <View style={styles.videoListSection}>
            </View>
        </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },

    videoSection:{
       // height:300,
       backgroundColor:'black'

    },
    videoListSection:{
        flex:1
    }

})