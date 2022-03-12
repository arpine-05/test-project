import './companyComponent.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CompanyTableRowComponent from "../companyTableRow/companyTableRowComponent";
import {useSelector} from "react-redux";

import { companiesSelectors } from '../../store/companies';

const CompanyComponent = (props) => {
  const {getModalEdit, getWorkersModal, closeCreateWorkerModal} = props;
  const companies = useSelector(companiesSelectors.allCompaniesSelector)

    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  ><h3>Company name</h3></TableCell>
            <TableCell  ><h3>Company address</h3> </TableCell>
            <TableCell  ><h3>Company email</h3></TableCell>
            <TableCell ><h3>Company workers</h3></TableCell>
            <TableCell ><h3>Edit company </h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies?.map((company) => <CompanyTableRowComponent
              key={company.id}
              companyData = {company}
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