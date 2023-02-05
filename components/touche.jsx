  
import React from 'react' 
import { StyleSheet, TouchableOpacity, Text } from 'react-native' 


class Touche extends React.Component {
    render() { 
        // REMARQUE:
        // Le style ainsi que le callback de la propriété 'onPress' sont tous les deux attribués
        // automatiqument ainsi que conditionnellement, dépendemment de si ces deux propriétés
        // sont spécifiées ou non lorsqu'un objet est instancié à partir de cette classe.
        // Initialement j'ai voulu qu'un élément ait certaines propriétés initialisées par défaut
        // dans le constructeur, mais j'ai remarqué que, pour une raison ou une autre, cela ne
        // fonctionnait pas. Alors j'ai eu l'idée du méchanisme décrit ci-haut, et à ma grande
        // surprise, ça fonctionne.

        return ( 
            <TouchableOpacity
             style={ this.props.style ? this.props.style : styleTouches.basic }
             onPress={ () => { this.props.onPress ? this.props.onPress( this.props.name ) : hello() } }>
                <Text style={ styleTouches.texte }>{ this.props.name }</Text> 
            </TouchableOpacity>
        );
    } 
} 

// Ceci est un patron de style qui est ensuite légèrement modifié
// pour les autres types de boutons en fonction de leurs besoins.
// Il est nécessaire d'avoir celui-ci séparé de l'autre style ci-bas
// car autrement la notation '...styleDeBase.touche' ne peut être utilisée.
const styleDeBase = StyleSheet.create(
{ 
    touche:
    { 
        // allure du bouton
        flex: 1,
        width: "100%",
        height: "100%",
        margin: 4,
        padding: 0, 
        borderRadius: 8, 
        backgroundColor: "lightsteelblue",
        
        // positionnement du texte (flex-direction par defaut est column)
        justifyContent: "center", // alignement vertical
        alignItems: "center" // flex-end alignement horizontal
    }
});

// Ensemble des styles pour les différentes catégories de boutons
// dérivé du style de base ci-haut
const styleTouches = StyleSheet.create(
{ 
    basic: // les touches numériques (une copie du style de base)
    { 
        ...styleDeBase.touche
    },

    clear: // pour la touche "Clear"
    { 
        ...styleDeBase.touche,
        backgroundColor: "darkorange"
    }, 

    calcul: // pour les touches de calcul (+, -, *, /)
    {
        ...styleDeBase.touche,
        backgroundColor: "rgb(170, 170, 170)"
    },

    enter: // pour la touche "Enter"
    { 
        ...styleDeBase.touche,
        flex: 2.1
        //backgroundColor: "darksalmon"
    }, 

    texte: // texte apparaissant sur les touches
    { 
        fontSize: 30, 
        color: "rgb(32, 32, 32)", 
        fontWeight: "bold" 
    } 
}); 

export { styleTouches }
export default Touche  