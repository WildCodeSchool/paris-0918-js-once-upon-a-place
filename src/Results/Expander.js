import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '98%',
    //border: '1px solid red',
    marginBottom: '15px',
    marginTop: '15px',
    marginLeft: '1%',
    marginRight: '1%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  locations: {
    //border:'1px solid blue',
    marginBottom:'1vw',
  },
  year:{
    //border:'1px solid red',
    marginBottom:'1vw',
  },
  text: {
    marginRight: '3vw',
  },
  affiche:{
    width: '60%',
    //border: '2px solid blue',
  },
  button:{
    float: 'bottom',
  },
  trailer:{
      margin: '2px',
  },
  synopsisReduced:{
    //border:'1px solid yellow',
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '50%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

//----------------------------------------------------------------------------------------------------------------------------------------
//limite le nombre de mots affichés dans la card initiale
const reduceLengthTextCard = synopsis =>{
  if (synopsis.length > 50){
    return(synopsis.substr(0, 50) + '...')
  }
}
const synopsisTroy = "Dans la Grèce antique, l'enlèvement d'Hélène, reine de Sparte, par Paris, prince de Troie, est une insulte que le roi Ménélas ne peut supporter. L'honneur familial étant en jeu, Agamemnon, frère de Ménélas et puissant roi de Mycènes, réunit toutes les armées grecques afin de faire sortir Hélène de Troie. L'issue de la guerre de Troie dépendra notamment d'un homme, Achille. Arrogant, rebelle, et réputé invicible, celui-ci n'a d'attache pour rien ni personne si ce n'est sa propre gloire."
const reducedTextSynopsis = reduceLengthTextCard(synopsisTroy)
//limite le nombre de mots affichés dans la card initiale
//-----------------------------------------------------------------------------------------------------------------------------------------

/*cache le début du synopsis de la card au clic pour afficher l'expander
const showReducedSynopsis = event =>{
  if(this.synopsisReduced.contains({reducedTextSynopsis})){
      return(this.synopsisReduced.remove({reducedTextSynopsis}));
  }
  else{
      return(this.synopsisReduced.add({reducedTextSynopsis}));
  }
};
//cache le début du synopsis de la card au clic pour afficher l'expander

/*trifouillage pour cacher texte
constructor(props) {
  super(props),
  this.state = {
    showReducedSynopsis: true,
  }
}

onClick = () => {
  this.setState ({showReducedSynopsis: !this.state.showReducedSynopsis})
}

const showingSynopsis = this.state.showReducedSynopsis ? 'ok' : 'hidden'
trifouillage pour cacher texte

<div onClick="showingSynopsis(this,'synopsisReduced')" style="display:none;" className={classes.synopsisReduced}> Synopsis: {reducedTextSynopsis}</div>
const showingSynopsis = (synopsisReduced, synopsisReduced){
  const divADiminuer = (document.getElementById(id));
  if(divADiminuer.style.display=="none") { // Si le div est masqué...
        divADiminuer.style.display = "block"; // ... on l'affiche...
      } else { // S'il est visible...
        div.style.display = "none"; // ... on le masque...
      }
}*/
//--------------------------------------------------------------------------------------------------------------------------------------
const hideSynopsis = synopsisReduced => {
  if (document.getElementById(synopsisReduced).style.display === 'block'){
    document.getElementById(synopsisReduced).style.display = 'none';
  } 
  else {
    document.getElementById(synopsisReduced).style.display = 'block';
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------

const DetailedExpansionPanel = props => {
  const { classes } = props;
  return (
    
    <div className={classes.root} onclick={hideSynopsis}>
      <ExpansionPanel>
        <ExpansionPanelSummary className={classes.button} expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <div className={classes.heading}>
              {props.movie.title}
            </div>
            <img className={classes.affiche} src="http://www.ralentirtravaux.com/images/troie.jpg" alt={props.movie.title}/>
          </div>
          <div className={classes.column}>
            <div className={classes.locations}><h4>Scenes locations: </h4>{props.movie.locations.map((location)=>{return location + ', '})}</div>
            <div className={classes.year}> <h4>Shooting year:</h4> {props.movie.release_year}</div>
            <div /*onClick={showingSynopsis}*/ className={classes.synopsisReduced}> <h4>Synopsis: </h4>{props.movie.shortSynopsis}</div>
    
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.details}>
        
          <div className={classes.text}><h4>Synopsis: </h4> {props.movie.synopsis} </div>
         
          <div className={classes.trailer}>
            <iframe width="350" height="155" src="https://www.youtube.com/embed/IeZrKyyXYjY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              <br />
          </div>

        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);