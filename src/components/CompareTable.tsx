import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


/**
 * @param {selected} - returns array of the two selected items
 * 
 * @returns dialog table that compares the two items
 * 
**/


const CompareTable: React.FC<{selected: any}> =({selected}) => {
  const classes = useStyles();

  function createData(name: string, missionOne: string, missionTwo: string) {
    return { name, missionOne, missionTwo };
  }
  
  const rows = [
    createData('Mission Name', selected.length && selected[0].mission_name,selected.length && selected[1].mission_name),
    createData('Launch Date', selected.length && selected[0].launch_date_local, selected.length && selected[1].launch_date_local),
    createData('Launch Site', selected.length && selected[0].launch_site.site_name_long, selected.length && selected[1].launch_site.site_name_long),
    createData('Rocket name', selected.length && selected[0].rocket.rocket_name, selected.length && selected[1].rocket.rocket_name),
    createData('Rocket core reuse count', selected.length && selected[0].rocket.first_stage.cores[0].core.reuse_count, selected.length && selected[1].rocket.first_stage.cores[0].core.reuse_count),
    createData('Rocket flight', selected.length && selected[0].rocket.first_stage.cores[0].flight, selected.length && selected[1].rocket.first_stage.cores[0].flight),
    createData('Rocket core status', selected.length && selected[0].rocket.first_stage.cores[0].core.status, selected.length && selected[1].rocket.first_stage.cores[0].core.status),
  
];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Categories</TableCell>
            <TableCell align="right">Mission one</TableCell>
            <TableCell align="right">Mission two</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.missionOne}</TableCell>
              <TableCell align="right">{row.missionTwo}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompareTable;
