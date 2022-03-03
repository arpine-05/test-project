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
           <div className={'title-info'}>
               <h3>Name</h3>
               <h3>Mobile</h3>
               <h3>Address</h3>
           </div>

            <div className={'workers'}>
                {
                    workers?.length > 0 ?  workers?.map(i=> <WorkerItem key={i.id} {...i}/>) :
                        <p>dont have users</p>


                }
            </div>
        </div>
    )
}

export default WorkersComponent