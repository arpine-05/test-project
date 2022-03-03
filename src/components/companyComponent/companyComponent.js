import './companyComponent.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CompanyTableRowComponent from "../companyTableRowComponent/companyTableRowComponent";
import {useSelector} from "react-redux";
const CompanyComponent = (props) => {
  const {getModalEdit, getWorkersModal, closeCreateWorkerModal} = props;
  const {companies} = useSelector(state=> state.companies)
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Company name</h4></TableCell>
            <TableCell align="right"><h4>Company address</h4> </TableCell>
            <TableCell align="right"><h4>Company email</h4></TableCell>
            <TableCell align="right"><h4>Company workers</h4></TableCell>
            <TableCell align="right"><h4>Edit company </h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies?.map((company) => <CompanyTableRowComponent
              key={company.id}{...company}
              getModalEdit={getModalEdit}
              getWorkersModal={getWorkersModal}
              closeCreateWorkerModal={closeCreateWorkerModal}
          />)}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default CompanyComponent;