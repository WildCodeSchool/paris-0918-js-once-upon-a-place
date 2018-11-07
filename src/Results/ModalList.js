import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MoviesDirectorList from './MoviesDirectorList';
import './ModalList.css';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

const style = {
    dialogmovie : {
      width: 300,
      minHeight: 200
    },
    dialogtitlemovie : {
      textAlign: 'center',
      paddingTop: 7,
      paddingBottom: 0
    }
}


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant='outlined' className="modal-button" onClick={this.handleOpen}>See all his movies</Button>
        <Dialog open={this.state.open}
          onClose={this.handleClose}
          className = 'dialog'
        >
            <DialogTitle style={style.dialogtitlemovie}><b>Director movie list</b><hr/></DialogTitle>
            
            <DialogContent style={style.dialogmovie}>
            {/* <div style={getModalStyle()} className={classes.paper}> */}
                {/* <Typography variant="h6" id="modal-title"> */}
                    <MoviesDirectorList directorName={this.props.directorName} title={this.props.title} />
                {/* </Typography> */}
             {/* </div> */}
            </DialogContent>
            <Button className='button-close' onClick={this.handleClose} variant='contained'>Close</Button>
        </Dialog>
        {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>

            <Typography variant="h6" id="modal-title">
              <MoviesDirectorList directorName={this.props.directorName} title={this.props.title}/>
            </Typography>
          </div>
        </Modal> */}
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;