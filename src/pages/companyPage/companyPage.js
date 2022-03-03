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
        if(!showModal) document.body.style.overflow = "hidden"
    }, [ showModal])

    const getModalEdit = useCallback((id)=> {
        dispatch(getCompany(id))
        setShowEditComponent(!showEditComponent)
        if(!showEditComponent) document.body.style.overflow = "hidden"
    }, [showModal])

    const getWorkersModal =  useCallback(()=> {
        setShowWorkersModal(!showWorkersModal)
        document.body.style.overflow = "hidden"

    }, [showWorkersModal])

    const closeWorkersModal = useCallback(() =>{
        setShowWorkersModal(false)
        document.body.style.overflow = "auto"

    }, [showWorkersModal])

    const closeModal = useCallback(()=> {
        setShowModal(false)
        document.body.style.overflow = "auto"
    }, [showModal])
   const closeEditComponent = useCallback(()=> {
       setShowEditComponent(false)
       document.body.style.overflow = "auto"
   }, [showEditComponent])
    useEffect(()=>{
        dispatch(getCompanies())
    }, [])
   const closeCreateWorkerModal = useCallback(()=> {
       setAddWorkerModal(!addWorkerModal)
       if(!addWorkerModal) {
           document.body.style.overflow = "hidden"
       }else {
           document.body.style.overflow = "auto"
       }
   }, [addWorkerModal])
    return(
    <div className='company-page'>
        <div className={`${showModal || showEditComponent || isLoader || showWorkersModal || addWorkerModal ? 'background' : ''}`}>
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
        </div>

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



