import {useSelector} from "react-redux";
import WorkerItem from "../workerItem/workerItem";
import { companiesSelectors } from '../../store/companies';
import { useEffect } from 'react';

import './workersComponent.scss';

const WorkersComponent = ({closeWorkersModal}) => {
    const workers = useSelector(companiesSelectors.companySelector).users


    return(
        <div className='worker-component' >
            <div className='close-button'  >
                <span className="close" onClick={closeWorkersModal}>&times;</span>
            </div>
            <h2>Workers list</h2>
           <table className={'title-info'}>
               <thead>
               <tr>
                   <td>Name</td>
                   <td>Mobile</td>
                   <td>Address</td>
               </tr>
               </thead>
           </table>

            <div className={'workers'}>
                {
                    workers?.length > 0 ?  workers?.map(worker => <WorkerItem closeCB={closeWorkersModal} key={worker.id} workerData={worker} />) :
                        <p>Dont have workers</p>


                }
            </div>
        </div>
    )
}

export default WorkersComponent