import React, {useState} from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {useDispatch, useSelector} from "react-redux";
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import companiesSlice from '../../store/companies';

const CompanyTableRowComponent = ({companyData, closeCreateWorkerModal, getWorkersModal, getModalEdit}) => {
    const [showWorkers, setShowWorkers] = useState(false)
    const {name, email, address, id, users} = companyData
    const dispatch = useDispatch();
    
    const workers = users

    const addWorker = () => {
        const { setCompany } = companiesSlice.actions
        dispatch(setCompany(companyData))
        closeCreateWorkerModal()
    }


    const getWorkersData = () =>{
        const {setCompany} = companiesSlice.actions
        dispatch(setCompany(companyData))
        getWorkersModal(workers)
  
    }

    const showWorkersFunc =()=>{
        setShowWorkers(!showWorkers)
    }

    
    return(
        <TableRow
            
            key={name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell  component="th" scope="row">
                {name}
            </TableCell>
            <TableCell >{address}</TableCell>
            <TableCell  >{email}</TableCell>
            <TableCell >
                <span className='plus' onClick={addWorker}>
                    <img  src={plus} alt={'plus'}/>
                </span>
                {/*<span onClick={getWorkersData} className='plus'><img src={worker} alt={'worker'}/></span>*/}

                {
                    users.length > 0   &&  <div className='worker-tab'>
                        {
                            users?.map((worker, index)=> {
                                if(index < 3){
                                    return(
                                        <div className='worker-circle' key={index} onClick={getWorkersData}>
                                            <span>{worker.name[0].toUpperCase()}</span>
                                        </div>
                                    )
                                }
                            })
                        }
                        {
                            users.length > 3 && <span className={'more'} onClick={getWorkersData}>+{users.length - 3}</span>
                        }
                    </div>
                }
            </TableCell>
            <TableCell  onClick={()=>getModalEdit(id, companyData)} >
                <span className='plus'>
                    <img src={edit} alt='edit'/>
                </span>
            </TableCell>
        </TableRow>
    )
}

export default  React.memo(CompanyTableRowComponent)