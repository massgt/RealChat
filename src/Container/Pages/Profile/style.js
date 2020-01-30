import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
      },
      header: {
        flexDirection: 'column',
        backgroundColor: '#128C7E',
        // alignItems: 'center',
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 40,
        height: 130,
      },
      headPic: {
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 0
      },
      picUser: {
        width: 130, 
        height: 130, 
        borderRadius: 100,
        position: 'absolute',
        borderWidth: 4, 
        borderColor:'white'
      }
})