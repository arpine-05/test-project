import React, {useEffect} from 'react';
import './workerItem.scss'
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorker, editWorker, getWorker, getWorkers} from "../../redux/workers/actions";

const WorkerItem = (props) => {
    const {name, mobile, address, id, companyId} = props;
    const {worker} = useSelector(state => state.workers)
    const {company} = useSelector(state => state.companies)
   const [showDelete, setDelete] = useState(false)
    const dispatch = useDispatch();
    const {register, formState: {errors}, handleSubmit, control, setValue, getValues} = useForm({
        defaultValues: {
            address: '',
            name: '',
            mobile: ''
        }
    });
    const [showEditForm, setShowEditForm] = useState(false);
    const getEditForm = () => {
        setShowEditForm(!showEditForm)
        if (!showEditForm) {
            dispatch(getWorker(companyId, id))
        }
    };
    const editDefault = () => {
        setValue('address', worker.address)
        setValue('name', worker.name)
        setValue('mobile', worker.mobile)
    }
    useEffect(() => {
        editDefault()

    }, [editDefault])

    const onSubmit = async (data) => {
        await dispatch(editWorker(companyId, id, data))
        await dispatch(getWorker(companyId, id))

    }
    const deleteWorkerData = async () => {
        await dispatch(deleteWorker(companyId, id))

        await dispatch(getWorkers(company.id))

    }
    const cancelUpdate = () => {
        dispatch(getWorker(companyId, id))

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
                    <button onClick={getEditForm}>Edit</button>
                    <button onClick={closeDeleteModal} >Delete</button>
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
                                {...register('address', {required: true, maxLength: 100})}
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
                                   className={errors?.mobile?.type === 'required' ? 'input-item-invalid' : ''}
                                   {...register('mobile', {required: true}
                                   )}
                                   placeholder={'mobile'}
                            />
                            {errors.mobile && errors.mobile.type === 'required' &&
                            <p className='error'>This is required</p>}

                        </div>
                        <div className='input-wrapper'>
                            <h4>Name</h4>
                            <input
                                className={errors?.name?.type === 'maxLength' || errors?.name?.type === 'required' ? 'input-item-invalid' : ''}
                                {...register('name', {required: true, maxLength: 100})}
                                placeholder={'name'}
                            />
                            {errors.name && errors.name.type === 'maxLength' &&
                            <p className='error'>Max length is 100</p>}
                            {errors.name && errors.name.type === 'required' &&
                            <p className='error'>This is required</p>}

                        </div>
                        <div className='edit-workers-button'>
                            <button type={'submit'}>Save</button>
                            <button onClick={cancelUpdate} type={'button'}>Cancel</button>
                        </div>
                    </form>

                }
            </div>

        </div>
    )
}

export default React.memo(WorkerItem);