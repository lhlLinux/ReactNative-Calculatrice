
import React from 'react' 
import { View, Text, StyleSheet } from 'react-native' 


class Ecran extends React.Component
{ 
    /*
    La composante 'View' représente la région réctangulaire de l'écran. Il est
    nécessaire de placer 'Text' dans un 'View' car le cadre rectangulaire de
    'Text' ne peut être redimensionné; il encadre parfaitement le texte.
    */
    render() {   
        return (
            <View style={styleEcran.allure}>
                <Text style={styleEcran.texte}>{ this.props.contenu }</Text>
            </View> )
    } 
} 


const styleEcran = StyleSheet.create( // Styles de l'écran
{ 
    allure:
    { 
        // allure de l'écran
        height: "14%",
        margin: 8,
        marginBottom: 2, 
        padding: 8, 
        borderRadius: 8, 
        backgroundColor: "rgb(200, 220, 200)",

        // position du texte
        justifyContent: "center",
        alignItems: "flex-end"
    }, 
    
    texte:
    { 
        color: "rgb(48, 48, 48)", 
        fontSize: 36, 
    } 
}); 

export default Ecran