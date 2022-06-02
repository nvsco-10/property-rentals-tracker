import * as React from 'react';
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function CollapsibleTable() {

  const { getAllRentals, rentals} = useAppContext()

  useEffect(() => {
    getAllRentals()
  }, [])

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.address}</TableCell>
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
                  {row.actions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell component="th" scope="row">
                        {action.action}
                      </TableCell>
                      <TableCell>{action.priority}</TableCell>
                      <TableCell align="right">{action.createdAt}</TableCell>
                    </TableRow>
                  ))}
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

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    // <TableContainer component={Paper}>
    //   <Table  sx={{ minWidth: 500 }} aria-label="custom pagination collapsible table">
        
    //     <TableHead>
    //       <TableRow>
    //         <TableCell />
    //         <TableCell>Address</TableCell>
    //         <TableCell align="right">Status</TableCell>
    //         <TableCell align="right">Priority</TableCell>
    //         <TableCell align="right">Owner</TableCell>
    //         <TableCell align="right">Assigned</TableCell>
    //       </TableRow>
    //     </TableHead>

    //     <TableBody>
    //       {rows.map((row) => (
    //         <Row key={row.address} row={row} />
    //       ))}
    //     </TableBody>

    //   </Table>
    // </TableContainer>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
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
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.id} row={row} />
            // <TableRow key={row.id}>
            //   <TableCell component="th" scope="row">
            //     {row.address}
            //   </TableCell>
            //   <TableCell style={{ width: 160 }} align="right">
            //     {row.status}
            //   </TableCell>
            //   <TableCell style={{ width: 160 }} align="right">
            //     {row.priority}
            //   </TableCell>
            //   <TableCell style={{ width: 160 }} align="right">
            //     {row.owner}
            //   </TableCell>
            //   <TableCell style={{ width: 160 }} align="right">
            //     {row.assigned}
            //   </TableCell>
            // </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );

}