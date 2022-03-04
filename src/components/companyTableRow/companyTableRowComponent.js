import React, {useState} from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {useDispatch, useSelector} from "react-redux";
import {getCompanies, getCompanyData} from "../../redux/companies/actions";
import {getWorkers} from "../../redux/workers/actions";
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
const CompanyTableRowComponent = (props) => {
    const {name,email, address, id, getModalEdit, getWorkersModal, closeCreateWorkerModal, users} = props;
    const dispatch = useDispatch();
    const [showWorkers, setShowWorkers] = useState(false)
    const {workers} = useSelector(state=> state.workers);
    const addWorker =async ()=>{
        await closeCreateWorkerModal()
         await dispatch(getCompanyData({name, email, address, id}))
    }
    const getWorkersData = async ()=>{
      await  dispatch(getWorkers(id))
      await  dispatch(getCompanyData({name, email, address, id}))
      await  getWorkersModal()

    }

    const showWorkersFunc =()=>{
        setShowWorkers(!showWorkers)
        dispatch(getWorkers(id))

    }
    return(
        <TableRow
            key={name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align={'middle'} component="th" scope="row">
                {name}
            </TableCell>
            <TableCell align={'middle'}>{address}</TableCell>
            <TableCell align={'middle'} >{email}</TableCell>
            <TableCell align={'middle'}>
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
            <TableCell  onClick={()=>getModalEdit(id)} >
                <span className='plus'>
                    <img src={edit} alt='edit'/>
                </span>
            </TableCell>
        </TableRow>
    )
}

export default  React.memo(CompanyTableRowComponent)