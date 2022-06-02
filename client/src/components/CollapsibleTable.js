import * as React from 'react';
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function CollapsibleTable() {

  const { getAllRentals, rentals} = useAppContext()

  useEffect(() => {
    getAllRentals()
  }, [])

  function createData(address, status, priority, owner, assigned, actions) {
    return {
      address,
      status,
      priority,
      owner,
      assigned,
      actions
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.address}
          </TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.priority}</TableCell>
          <TableCell align="right">{row.owner}</TableCell>
          <TableCell align="right">{row.assigned}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Actions
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Action Item</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell align="right">Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.actions.length ?
                      row.actions.map((actionsRow) => (
                        // change to action id
                        <TableRow key={actionsRow.id}>
                          <TableCell component="th" scope="row">
                            {actionsRow.action}
                          </TableCell>
                          <TableCell>{actionsRow.priority}</TableCell>
                          <TableCell align="right">{actionsRow.createdAt}</TableCell>
                        </TableRow>
                      )) :
                      (
                        <TableRow>
                          <TableCell>
                          no actions to display...
                          </TableCell>
                        </TableRow>
                      )
                    }
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      status: PropTypes.string.isRequired,
      owner: PropTypes.string,
      priority: PropTypes.string.isRequired,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          action: PropTypes.string.isRequired,
          priority: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        }),
      ).isRequired,
      address: PropTypes.string.isRequired,
      assigned: PropTypes.string,
    }).isRequired,
  };

  const rows = rentals.map(rental => {
    const actions = rental.actions.map(actions => {
      return { id: actions._id, action: actions.actionItem, priority: actions.priority, createdAt: actions.createdAt }
    })

    return createData(`${rental.streetAddress} ${rental.city}`, rental.status, rental.priority, rental.owner || '', rental.assigned.username || '', actions)
  })


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Assigned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.address} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}