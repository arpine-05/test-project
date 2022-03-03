import './createWorkerComponent.scss';
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createWorker, getMessage, getResponse} from "../../redux/workers/actions";

const CreateWorkerComponent = (props) => {
    const {closeModal} = props;
    const {company} = useSelector(state=> state.companies);
    const {message, responseMes} = useSelector(state=> state.workers);
    const dispatch = useDispatch()
    const {register, formState: {errors}, handleSubmit, control, setValue, getValues} = useForm({
        defaultValues: {
            address: '',
            name: '',
            mobile: ''
        }
    });
    const onSubmit =async (data) => {

       await dispatch(createWorker(company.id, data))
    }
    if(responseMes?.id){
         closeModal()

    }
    useEffect(()=>{
        return ()=>{
            dispatch(getMessage([]))
            dispatch(getResponse(''))
        }
    }, [])
    return (
        <div className='create-worker-comp'>
            <div className='close-button'>
                <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='create-worker'>
                <div className='input-wrapper'>
                    <h4>Address</h4>
                    <input className={errors?.address?.type === 'required' || errors?.address?.type === 'maxLength' ? 'input-item-invalid' : ''}
                           {...register('address', {required: true, maxLength: 100})}
                           placeholder={'address'}
                    />
                    {errors.address && errors.address.type === 'required' && <p className='error'>This is required</p>}
                    {errors.address && errors.address.type === 'maxLength' && <p className='error'>Max length is 100</p>}

                </div>
                <div className='input-wrapper'>
                    <h4>Mobile</h4>
                    <input type={'text'} className={errors?.mobile?.type === 'required' ? 'input-item-invalid' : ''}
                           {...register('mobile', {required: true})}
                           placeholder={'mobile'}
                    />
                    {errors.mobile && errors.mobile.type === 'required' && <p className='error'>This is required</p>}

                </div>
                <div className='input-wrapper'>
                    <h4>Name</h4>
                    <input className={errors?.name?.type === 'maxLength' || errors?.name?.type === 'required' ? 'input-item-invalid' : ''}
                           {...register('name', {required: true, maxLength: 100})}
                           placeholder={'name'}
                    />
                    {errors.name && errors.name.type === 'maxLength' && <p className='error'>Max length is 100</p>}
                    {errors.name && errors.name.type === 'required' && <p className='error'>This is required</p>}

                </div>
                <div>
                    {
                        message?.map((i, index)=><p key={index}>{i}</p>)
                    }
                </div>
               <div className='create-button'>
                   <button type={'submit'}>Create</button>
               </div>
            </form>

        </div>

    )
}

export default CreateWorkerComponent;