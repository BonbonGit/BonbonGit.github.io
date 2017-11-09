//Scripts jeux du pendu

//fonctions utilitaires
//-------------------------------------------------------------------------------------------------
function $(id) {
	return document.getElementById(id);
}

function insererHTML(id,txt) {
	$(id).innerHTML = txt;
}

function nAlea(inf,sup) {
	return Math.floor(Math.random()*(sup-inf)) + inf;
}

//Variables globales
//-------------------------------------------------------------------------------------------------
var motChoisi = '';
var tChar =[];
var erreur = 0;
var tAffiche = [];

//fonctions appelées par onload/onclick
//-------------------------------------------------------------------------------------------------
function init() {
	erreur = 0;
	$('imgPendu').src = 'images/pendu.png';
	afficherLettres();
	choisirNouveauMot();
	afficherChampNouveauMot();
}

function proposerLettre(lettre) {
	if(!testerLettre(lettre)){
		modifierEtatPendu();
	} else {
		afficherLettresTrouvees();
	
	}
	modifierEtatLettre(lettre);
	testerMotTrouve();
}

//fonctions d'affichage
//-------------------------------------------------------------------------------------------------
function afficherLettres() {
	var txt = '';
	var i;
	for(i = 0;i < tLettres.length; i++){
		txt += '<input type="button" value="' + tLettres[i] + '" id="' + tLettres[i] + '" class="btn" onclick="proposerLettre(\'' 
		+ tLettres[i] + '\');"/>';
	
	}
	$('pied').innerHTML = txt;
}

function afficherChampNouveauMot() {
	var txt = '';
	for(i = 0; i < tChar.length; i++){
		txt += '<input size="1" maxlength="1" type="text" value="" id="ch' + i + '" class="champ"/>';
	}
	$('tdMot').innerHTML = txt;
}

function afficherLettresTrouvees() {
	var i;
	for(i = 0;i < tAffiche.length; i++){
		if(tAffiche[i] == tChar[i]){
			$('ch' + i).value = tAffiche[i];
		}
		
		if($('ch' + i).value != ''){
			$('ch' + i).style.backgroundColor = 'White';
		}
	
	}
}

//fonctions de modification
//-------------------------------------------------------------------------------------------------
function choisirNouveauMot() {
	var i = nAlea(0,tDico.length);
	motChoisi = tDico[i];
	tChar = motChoisi.split('');
	tAffiche.length = tChar.length;
}

function modifierEtatLettre(id) {
	$(id).disabled = true;
	$(id).style.backgroundColor = 'LightGrey';
}

function modifierEtatPendu() {
	erreur++;
	$('imgPendu').src = 'images/pendu' + erreur + '.png';
}


//fonctions de test
function testerLettre(lettre) {
	var trouve = false;
	for(i = 0; i < tChar.length;i++){
		if(tChar[i] == lettre){
			tAffiche[i] = lettre;
			trouve = true;
		}
	}
	return trouve;
}

function testerMotTrouve() {
	var compte = 0;
	for(i = 0;i < tAffiche.length; i++){
		if($('ch' + i).value != ''){
			compte++;
		}
	}
	
	if(compte == tChar.length){
		$('pied').innerHTML = '<h1> PARTIE GAGNEE!!! </h1>';
	} else if(erreur == 8){
		$('pied').innerHTML = '<h1> PARTIE PERDU!!! </h1>';
	}
}


