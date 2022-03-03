import {useCallback, useEffect, useState} from 'react';
import CompanyComponent from '../../components/companyComponent/companyComponent'
import CreateCompanyComponent from '../../components/createCompanyComponent/createCompanyComponent'
import './companyPage.scss'
import {useDispatch, useSelector} from "react-redux";
import LoaderComponent from "../../components/loaderComponent/loaderComponent";
import WorkersComponent from "../../components/workersComponent/workersComponent";
import {getCompanies, getCompany} from "../../redux/companies/actions";
import CreateWorkerComponent from "../../components/createWorkerComponent/createWorkerComponent";
import EditCompanyComponent from "../../components/editCompanyComponent/editCompanyComponent";



const CompanyPage = ()=>{
    const [showModal, setShowModal] = useState(false);
    const [showWorkersModal, setShowWorkersModal] = useState(false);
    const[addWorkerModal, setAddWorkerModal] = useState(false)
    const[showEditComponent, setShowEditComponent] = useState(false)
    const dispatch = useDispatch();
    const {companies, isLoader, message} = useSelector(state=>state.companies)
    const {workers} = useSelector(state=>state.workers)
    const getModalCreate = useCallback(async ()=> {
        await setShowModal(!showModal)

    }, [ showModal])

    const getModalEdit = useCallback((id)=> {
        dispatch(getCompany(id))
        setShowEditComponent(!showEditComponent)
    }, [showModal])
    const getWorkersModal =  useCallback(()=> setShowWorkersModal(!showWorkersModal), [showWorkersModal])
    const closeWorkersModal = useCallback(() =>setShowWorkersModal(false), [showWorkersModal])
    const closeModal = useCallback(()=> setShowModal(false), [showModal])
   const closeEditComponent = useCallback(()=> setShowEditComponent(false), [showEditComponent])
    useEffect(()=>{
        dispatch(getCompanies())
    }, [])
   const closeCreateWorkerModal = useCallback(()=> setAddWorkerModal(!addWorkerModal), [addWorkerModal])
    return(
    <div className='company-page'>
        <div className={`${showModal || showEditComponent || isLoader || showWorkersModal || addWorkerModal ? 'background' : ''}`}></div>
        {
            isLoader && <LoaderComponent/>
        }
        {
            showEditComponent && <EditCompanyComponent closeModal={closeEditComponent} />
        }
        {
           showModal && <CreateCompanyComponent  closeModal={closeModal} />
        }
        {
            showWorkersModal   && <WorkersComponent closeWorkersModal={closeWorkersModal}/>
        }
        {
            addWorkerModal && <CreateWorkerComponent closeModal={closeCreateWorkerModal}/>
        }
        <h2>About your companies</h2>
     <div className='create-company'>
         <button onClick={getModalCreate}> + Create new comapny</button>
     </div>
     <CompanyComponent closeCreateWorkerModal={closeCreateWorkerModal}
                       getModalEdit={getModalEdit}
                       getWorkersModal={getWorkersModal}
     />
     </div>
    )
}

export default CompanyPage;



