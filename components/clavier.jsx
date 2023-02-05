
import React from 'react' 
import { View, StyleSheet } from 'react-native'

import Touche from './touche'
import { styleTouches } from './touche'
import Operations from './operations'

/*
    Composant regroupant et organisant les touches du clavier
*/
class Clavier extends React.Component { 

    operations = new Operations();

    render() { 
        return ( 
            <View style={{ flex: 1, flexDirection: 'column', margin: 4 }}>

                <View style={ styles.rangee }>
                    <Touche name="C"  onPress={ () => { this.props.updateAffichage( this.operations.onClear() ); }} style={ styleTouches.clear } />
                    <Touche name="+-" onPress={ () => { this.props.updateAffichage( this.operations.onSign() ); }} /> 
                    <Touche name="<-" onPress={ () => { this.props.updateAffichage( this.operations.onBackspace() ); }} /> 
                    <Touche name="/"  onPress={ () => { this.props.updateAffichage( this.operations.onDivision() ); }} style={ styleTouches.calcul } /> 
                </View>

                <View style={ styles.rangee }>
                    <Touche name="7" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="8" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="9" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="*" onPress={ () => { this.props.updateAffichage( this.operations.onMultplication() ); }} style={ styleTouches.calcul } /> 
                </View>

                <View style={ styles.rangee }>
                    <Touche name="4" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="5" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/> 
                    <Touche name="6" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/> 
                    <Touche name="-" onPress={ () => { this.props.updateAffichage( this.operations.onSoustraction() ); }} style={ styleTouches.calcul } /> 
                </View>

                <View style={ styles.rangee }>
                    <Touche name="1" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="2" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="3" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="+" onPress={ () => { this.props.updateAffichage( this.operations.onAddition() ); }} style={ styleTouches.calcul } /> 
                </View>

                <View style={ styles.rangee }>
                    <Touche name="0" onPress={ (touche) => { this.props.updateAffichage( this.operations.onNumeric(touche) ); }}/>
                    <Touche name="." onPress={ () => { this.props.updateAffichage( this.operations.onPoint() ); }}/> 
                    <Touche name="=" onPress={ () => { this.props.updateAffichage( this.operations.onEnter() ); }} style={ styleTouches.enter } /> 
                </View>

            </View> 
        ) // fin return
    } // fin render
} // fin fonction


const styles = StyleSheet.create({ // styles du clavier
    rangee:
    { 
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
        justifyContent: "space-between", // alignement vertical
        alignItems: "center" // flex-end alignement horizontal
    }
});

export default Clavier