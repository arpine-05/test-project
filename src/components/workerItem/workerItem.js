import React, {useEffect} from 'react';
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import { companiesOperations } from '../../store/companies';

import './workerItem.scss'

const WorkerItem = ({workerData, closeCB}) => {
    const [inputValue, setinputValue] = useState(false)
    
    const {name, mobile, address, id, companyId} = workerData    

   const [showDelete, setDelete] = useState(false)
    
   const changeInputValue = () => {
        setinputValue(true)
    }


    const dispatch = useDispatch();

    const {register, formState: {errors}, handleSubmit, control, setValue, getValues} = useForm({
        defaultValues: {
            address: '',
            name: '',
            mobile: ''
        }
    });

    const editDefault = () => {
        setValue('address', workerData.address)
        setValue('name', workerData.name)
        setValue('mobile', workerData.mobile)
    }


    useEffect(() => {
        if(!inputValue){
            editDefault()

        }

    }, [editDefault]);

    useEffect(()=>{
        return ()=>{
            setinputValue(false)
        }
    }, [])

    const [showEditForm, setShowEditForm] = useState(false);
    
    const getEditForm = () => {
        setShowEditForm(!showEditForm)
        
    };

    const onSubmit = (data) => {
        const {editCompanyWorker} = companiesOperations
        dispatch(editCompanyWorker(companyId, id, data))
        setShowEditForm(false)
        closeCB()

    }
    const deleteWorkerData = () => {
        const {removeCompanyWorker} = companiesOperations

        dispatch(removeCompanyWorker(companyId, id))
        closeCB()

    }
    const cancelUpdate = () => {
        setShowEditForm(!showEditForm)

    }
    const closeDeleteModal = ()=> setDelete(!showDelete)
    
    return (
        <div className='worker-item'>
            <div className='edit-worker-item-flex'>
                <div className='info'>
                    <table>
                       <tbody>
                       <tr>
                           <td>{name}</td>
                           <td>{mobile}</td>
                           <td>{address}</td>
                       </tr>
                       </tbody>

                    </table>
                </div>
                <div className='buttons'>
                    <button   onClick={getEditForm}>Edit</button>
                    <button  onClick={closeDeleteModal} >Delete</button>
                </div>
                {
                    showDelete &&  <div className='delete-modal'>
                        <h3>Do you want delete?</h3>
                        <div>
                            <button onClick={deleteWorkerData}>Yes</button>
                            <button onClick={closeDeleteModal}>No</button>
                        </div>
                    </div>
                }

            </div>
            <div className={'edit-worker-form'}>
                {
                    showEditForm && <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='input-wrapper'>
                            <h4>Address</h4>
                            <input
                                className={errors?.address?.type === 'required' || errors?.address?.type === 'maxLength' ? 'input-item-invalid' : ''}
                                {...register('address', {required: true, maxLength: 100,onChange: () => changeInputValue()})}
                                placeholder={'address'}
                            />
                            {errors.address && errors.address.type === 'required' &&
                            <p className='error'>This is required</p>}
                            {errors.address && errors.address.type === 'maxLength' &&
                            <p className='error'>Max length is 100</p>}

                        </div>
                        <div className='input-wrapper'>
                            <h4>Mobile</h4>
                            <input type={'text'}
                                   className={errors?.mobile?.type === 'required' || errors?.mobile?.type === 'pattern'  ? 'input-item-invalid' : ''}
                                   {...register('mobile', {required: true,
                                       pattern:{
                                       value: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
                                           message:'Does not valid ',

                                       },
                                       onChange: () => changeInputValue()}
                                   )}
                                   placeholder={'mobile'}
                            />
                            {errors.mobile && errors.mobile.type === 'required' &&
                            <p className='error'>This is required</p>}
                            {
                                errors?.mobile &&  errors?.mobile?.type === 'pattern' &&   <p className='error'>{errors?.mobile.message}</p>
                            }

                        </div>
                        <div className='input-wrapper'>
                            <h4>Name</h4>
                            <input
                                className={errors?.name?.type === 'maxLength' || errors?.name?.type === 'required' ? 'input-item-invalid' : ''}
                                {...register('name', {required: true, maxLength: 100,onChange: () => changeInputValue()})}
                                placeholder={'name'}
                            />
                            {errors.name && errors.name.type === 'maxLength' &&
                            <p className='error'>Max length is 100</p>}
                            {errors.name && errors.name.type === 'required' &&
                            <p className='error'>This is required</p>}

                        </div>
                        <div className='edit-workers-button'>
                            <button className={'button-edit'} type={'submit'}>Save</button>
                            <button className={'button-del'} onClick={cancelUpdate} type={'button'}>Cancel</button>
                        </div>
                    </form>

                }
            </div>

        </div>
    )
}

export default WorkerItem