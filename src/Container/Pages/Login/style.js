import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ece5dd',
    },
    header: {
      flexDirection: 'column',
      backgroundColor: '#075e54',
      alignItems: 'flex-end',
      paddingRight: 16,
      borderBottomStartRadius: 55,
      height: 65,
      justifyContent: 'center'
    },
    title: {
      color: 'white',
      fontSize: 23,
      fontWeight: 'bold',
    },
    parReg: {
      paddingHorizontal: 40,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
      elevation: 2,
    },
    regButton: {
      elevation: 3,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      width: 140,
      height: 40,
    },
    textButton: {
      color: 'white', 
      fontSize: 23, 
    }
});