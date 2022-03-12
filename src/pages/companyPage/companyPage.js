import {useCallback, useEffect, useState} from 'react';
import CompanyComponent from '../../components/company/companyComponent'
import CreateCompanyComponent from '../../components/createCompany/createCompanyComponent'
import './companyPage.scss'
import {useDispatch, useSelector} from "react-redux";
import LoaderComponent from "../../components/loader/loaderComponent";
import WorkersComponent from "../../components/workers/workersComponent";
import CreateWorkerComponent from "../../components/createWorker/createWorkerComponent";
import EditCompanyComponent from "../../components/editCompany/editCompanyComponent";

import companiesSlice, {  companiesOperations, companiesSelectors } from '../../store/companies'



const CompanyPage = ()=>{
    const [showModal, setShowModal] = useState(false);
    const [showWorkersModal, setShowWorkersModal] = useState(false);
    const[addWorkerModal, setAddWorkerModal] = useState(false)
    const[showEditComponent, setShowEditComponent] = useState(false)

    const dispatch = useDispatch();

    const getModalCreate = () => {
        setShowModal(!showModal)
        if(!showModal) document.body.style.overflow = "hidden"
    }


    const isLoading = useSelector(companiesSelectors.isLoadingCompaniesSelector)

    const { getAllCompanies } = companiesOperations

    const { setCompany } = companiesSlice.actions

    const getModalEdit = (id, companyData)=> {
        dispatch(setCompany(companyData))
        setShowEditComponent(!showEditComponent)
        if(!showEditComponent) document.body.style.overflow = "hidden"
    }

    const getWorkersModal =  (id) => {
        setShowWorkersModal(!showWorkersModal)
        document.body.style.overflow = "hidden"

    }

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
        dispatch(getAllCompanies())
    }, [])


   const closeCreateWorkerModal = ()=> {
       setAddWorkerModal(!addWorkerModal)
       if(!addWorkerModal) {
           document.body.style.overflow = "hidden"
       }else {
           document.body.style.overflow = "auto"
       }
   }



    return(
    <div className='company-page'>
        <div className={`${showModal || showEditComponent || isLoading || showWorkersModal || addWorkerModal ? 'background' : ''}`}>
            {
                isLoading && <LoaderComponent/>
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
         <button onClick={getModalCreate}> + Create new company</button>
     </div>
    <div className='table'>
        <CompanyComponent closeCreateWorkerModal={closeCreateWorkerModal}
                          getModalEdit={getModalEdit}
                          getWorkersModal={getWorkersModal}
        />
    </div>
     </div>
    )
}

export default CompanyPage;



