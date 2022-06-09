import * as React from 'react';
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function AssignedRentalsTable() {

  const { assignedRentals } = useAppContext()

  function createData(id, address, status, priority, owner, updatedAt, actions) {
    return {
      id,
      address,
      status,
      priority,
      owner,
      updatedAt,
      actions
    };
  }

  const rows = assignedRentals.map(rental => {
    const actions = rental.actions.map(actions => {
      return { 
        id: actions._id, 
        action: actions.actionItem, 
        priority: actions.priority, 
        status: actions.status, 
        createdAt: moment(actions.createdAt).format('YYYY-MM-DD, HH:mm:ss') 
      }
    })

    return createData(rental._id, `${rental.streetAddress} ${rental.city}`, rental.status, rental.priority, rental.owner.name || '', moment(actions.updatedAt).format('YYYY-MM-DD, HH:mm:ss') || '', actions)
  })

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    {
      id: 'address',
      numeric: false,
      disablePadding: true,
      label: 'Address',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'priority',
      numeric: false,
      disablePadding: false,
      label: 'Priority',
    },
    {
      id: 'owner',
      numeric: false,
      disablePadding: false,
      label: 'Owner',
    },
    {
      id: 'updatedAt',
      numeric: false,
      disablePadding: false,
      label: 'Last Updated',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">

          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  // const EnhancedTableToolbar = (props) => {
  //   const { numSelected } = props;
  
  //   return (
  //     <Toolbar
  //       sx={{
  //         pl: { sm: 2 },
  //         pr: { xs: 1, sm: 1 },
  //         ...(numSelected > 0 && {
  //           bgcolor: (theme) =>
  //             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
  //         }),
  //       }}
  //     >
  //       {/* {numSelected > 0 ? (
  //         <Typography
  //           sx={{ flex: '1 1 100%' }}
  //           color="inherit"
  //           variant="subtitle1"
  //           component="div"
  //         >
  //           {numSelected} selected
  //         </Typography>
  //       ) : ( */}
  //         {/* <Typography
  //           sx={{ flex: '1 1 100%' }}
  //           variant="h6"
  //           id="tableTitle"
  //           component="div"
  //         >
  //           All Rental Properties
  //         </Typography> */}
  //       {/* )} */}
  
  //       {/* {numSelected > 0 ? (
  //         <Tooltip title="Delete">
  //           <IconButton>
  //             <DeleteIcon />
  //           </IconButton>
  //         </Tooltip>
  //       ) : ( */}
  //         {/* <Tooltip title="Filter list">
  //           <IconButton>
  //             <FilterListIcon />
  //           </IconButton>
  //         </Tooltip> */}
  //       {/* )} */}
  //     </Toolbar>
  //   );
  // };
  
  // EnhancedTableToolbar.propTypes = {
  //   numSelected: PropTypes.number.isRequired,
  // };

  const CollapsibleRow = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <>
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
      >
        <TableCell padding="checkbox">

          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          // id={labelId}
          scope="row"
          padding="none"
        >
          <Link to={`/rentals/${row.id}`}>
          {row.address}
          </Link>
        </TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">{row.priority}</TableCell>
        <TableCell align="left">{row.owner}</TableCell>
        <TableCell align="left">{row.updatedAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Actions
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Action Items</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Date Added</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.actions.length ? (
                  row.actions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell component="th" scope="row">
                        {action.action}
                      </TableCell>
                      <TableCell>{action.priority}</TableCell>
                      <TableCell>{action.status}</TableCell>
                      <TableCell align="right">{action.createdAt}</TableCell>
                    </TableRow>
                  ))
                  ) : (
                    <TableRow>
                      <TableCell>No action items to display...</TableCell>
                    </TableRow>
                  )
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      </>
    )
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('status');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // collapse
  const [open, setOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (address) => selected.indexOf(address) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.address);
                  // const labelId = `enhanced-table-checkbox-${index}`;
                  

                  return (
                    <CollapsibleRow row={row} />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );

}