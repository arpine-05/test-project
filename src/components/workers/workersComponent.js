import './workersComponent.scss';
import {useDispatch, useSelector} from "react-redux";
import WorkerItem from "../workerItem/workerItem";
import {useEffect} from "react";
import { getWorkersData } from "../../redux/workers/actions";


const WorkersComponent = (props)=>{
    const {closeWorkersModal} = props
    const {workers} = useSelector(state=> state.workers)
    const dispatch = useDispatch()
     useEffect(()=>{
         return ()=>{
             dispatch(getWorkersData())
         }
     }, [])
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
                    workers?.length > 0 ?  workers?.map(i=> <WorkerItem key={i.id} {...i}/>) :
                        <p>Dont have users</p>


                }
            </div>
        </div>
    )
}

export default WorkersComponent