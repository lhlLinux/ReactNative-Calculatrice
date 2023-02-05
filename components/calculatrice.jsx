
import React from 'react'
import { View } from 'react-native'

import Ecran from './ecran'
import Clavier from './clavier'

  
//--------------------------------------------------------------------------
// Cet objet est le 'wrapper' qui englobe la calculatrice dans son ensemble.
//--------------------------------------------------------------------------

class Calculatrice extends React.Component
{ 
    state = { texte: "0" }; // Ceci est le texte apparaissant à l'écran

    // Et c'est par cette méthode que l'affichage à l'écran est mis à jour
    // Les calculs et opérations ainsi que la gestion des résultats se fait ailleurs
    updateAffichage = (chaine) => {
        this.setState({ texte: chaine });
    }

    render() { 
        return (
            <View style={{ flex: 1, flexDirection: "column", margin: 4, backgroundColor: 'rgb(80, 80, 80)' }}>
                <Ecran contenu={ this.state.texte }/>
                <Clavier updateAffichage={ this.updateAffichage }/>
            </View>
        )
    } 
} 
   
export default Calculatrice