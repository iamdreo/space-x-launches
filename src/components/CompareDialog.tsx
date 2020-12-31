import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CompareTable from "./CompareTable"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @param {open} - boolean item to display dialog when open is true
 * @param {handleClose}
 * @param {selected} - [] of items selected for comparison
 * @returns dialog to compare the two items
 * 
**/

const CompareDialog:React.FC<{open: boolean; handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; selected: any}> = ({open, handleClose, selected}) => {
  const classes = useStyles();
  

  return (
    <div>
  
      <Dialog fullScreen open={open}  TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit"  aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Comparison between space launches
            </Typography>
             
          </Toolbar>
        </AppBar>
      <CompareTable selected={selected} />
      </Dialog>
    </div>
  );
}

export default CompareDialog;