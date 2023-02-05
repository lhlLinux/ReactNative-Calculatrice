
// Quelques partrons constants

const ZERO = "0";
const LONGUEUR_MAX = 14 - 1; // inclut le signe négatif
const OPERATEURS = { NOP: "NOP", ADD: "+", SUB: "-", MUL:"*", DIV:"/" };


//----------------------------------------------------------------------------------
// Cette classe s'occupe de toutes les opérations effectuées, calculs compris.
// Elle est indépendente
//----------------------------------------------------------------------------------
export default class Operations
{
    constructor() { // on commence par initialiser le tout
        this.onClear();
    }

    // Méthode pour touches numériques ----------------------------------------

    onNumeric(touche) {
        chaine = this.valeur;

 		// on ne procède que si l'espace nous permet
        if (chaine.length < LONGUEUR_MAX)
            if (chaine == ZERO)
                chaine = touche;
            else
                chaine = chaine + touche;

        this.valeur = chaine;        
        return this.valeur;
    }

    // Méthodes d'opérations (autre que les calculs) --------------------------

    onClear() { // tout est initialisé (joue le rôle d'une fonction init() )
        this.valeur = ZERO;
        this.valeurPrecedente = ZERO;
        this.decimale = false; // si on a *déjà* appuyé sur le point de décimales
        this.operation = OPERATEURS.NOP;

        return this.valeur;
    }

    
    onBackspace() {
        // On vérifie le cas où on annule une opération
        if (this.operation != OPERATEURS.NOP)
        	this.operation = OPERATEURS.NOP;

        // si la valeur est zéro, on ne fait rien
        if (this.valeur != ZERO)
        {
            chaine = this.valeur;
            if (chaine.length > 1)
            {
	            this.valeur = chaine.slice(0, -1);
	            // traitement du cas d'un backspace après un point décimal
	            if (this.decimale) this.decimale = false;
	        }
            else this.valeur = ZERO;
        }

        return this.valeur;
    }


    onSign() {
        nombre = Number(this.valeur).toPrecision(this.valeur.length);
        
        if (nombre != 0) nombre = -nombre; 

        this.valeur = nombre.toString();
        return this.valeur;
    }


    onPoint() {
        // on n'entre dans le code que si on n'a PAS encore appuyé sur [point]
        if (!this.decimale)
        {
            chaine = this.valeur; //.toString();

            // On ajout une point décimal que seulement s'il n'est pas déjà présent
            // et que la longueur de la chaîne ne dépasse le maximum de l'écran.
            if ( !chaine.includes(".") && (chaine.length < LONGUEUR_MAX) )
            {
                this.decimale = true; // on signale qu'on a appuyé le bouton
                this.valeur += ".";
            }   
        }
        return this.valeur;
    }
    

    onEnter() {
    	// On effectue le calcul indiqué par l'attribut "this.operation"
		switch (this.operation) {
			case OPERATEURS.DIV:
				this.onDivision();
				break;
			case OPERATEURS.MUL:
				this.onMultplication();
				break;
			case OPERATEURS.SUB:
				this.onSoustraction();
				break;
			case OPERATEURS.ADD:
				this.onAddition();
				break;
			default:
				break;
		}
        
        this.decimale = false;
        this.valeur = this.valeurPrecedente;
        return this.valeurPrecedente;
    }

    // Méthodes des calculs ---------------------------------------------------

    // REMARQUE:
    // Les calculs peuvent être enchaînés, soit par une séquence [nombre]-[op]-[nombre]-[op]...
    // ou en utilisant le résultat d'un calcul après avoir appuyé la touche [Enter]
    // chaque méthode affiche son symbol mathématique.
    
    onAddition() {
		if (this.operation != OPERATEURS.NOP) // travail à faire
		{
			resultat = Number(this.valeurPrecedente) + Number(this.valeur);

			this.valeurPrecedente = resultat.toString();

			// on tente de s'encadrer à l'écran
			if (this.valeurPrecedente.length > 13)
				this.valeurPrecedente = this.valeurPrecedente.slice(0, LONGUEUR_MAX);

			this.operation = OPERATEURS.NOP;
		}
		else
		{
			this.valeurPrecedente = this.valeur;
			this.operation = OPERATEURS.ADD; // on signale qu'on a choisi un calcul
		}
		
		this.valeur = ZERO; // on libère pour nouvelle entrée
        return "+";
    }

    onSoustraction() {
		if (this.operation != OPERATEURS.NOP) // travail à faire
		{
			resultat = Number(this.valeurPrecedente) - Number(this.valeur);
			this.valeurPrecedente = resultat.toString();

			// on tente de s'encadrer à l'écran
			if (this.valeurPrecedente.length > 13)
				this.valeurPrecedente = this.valeurPrecedente.slice(0, LONGUEUR_MAX);

			this.operation = OPERATEURS.NOP;
		}
		else
		{
			this.valeurPrecedente = this.valeur;
			this.operation = OPERATEURS.SUB; // on signale qu'on a choisi un calcul
		}
		
		this.valeur = ZERO; // on libère pour nouvelle entrée
        return "-";
    }

    onMultplication() {
		if (this.operation != OPERATEURS.NOP) // travail à faire
		{
			resultat = Number(this.valeurPrecedente) * Number(this.valeur);
			this.valeurPrecedente = resultat.toString();

			// on tente de s'encadrer à l'écran
			if (this.valeurPrecedente.length > 13)
				this.valeurPrecedente = this.valeurPrecedente.slice(0, LONGUEUR_MAX);

			this.operation = OPERATEURS.NOP;
		}
		else
		{
			this.valeurPrecedente = this.valeur;
			this.operation = OPERATEURS.MUL; // on signale qu'on a choisi un calcul
		}
		
		this.valeur = ZERO; // on libère pour nouvelle entrée
        return "*";
    }

    onDivision() { // REMARQUE: JS traite automatiquement la division par zéro
        if (this.operation != OPERATEURS.NOP) // travail à faire
		{
			resultat = Number(this.valeurPrecedente) / Number(this.valeur);
			//resultat = resultat.toPrecision(13);
			this.valeurPrecedente = resultat.toString();
			
			// on tente de s'encadrer à l'écran
			if (this.valeurPrecedente.length > 13)
				this.valeurPrecedente = this.valeurPrecedente.slice(0, LONGUEUR_MAX);
			
			this.operation = OPERATEURS.NOP;
		}
		else
		{
			this.valeurPrecedente = this.valeur;
			this.operation = OPERATEURS.DIV; // on signale qu'on a choisi un calcul
		}
		
		this.valeur = ZERO; // on libère pour nouvelle entrée
        return "/";
    }
}