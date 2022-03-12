import './createWorkerComponent.scss';
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { companiesOperations, companiesSelectors } from '../../store/companies';

const CreateWorkerComponent = ({closeModal}) => {

    const company = useSelector(companiesSelectors.companySelector)

    const dispatch = useDispatch();

     const phoneRegExp =
        /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;


    const {register, formState: {errors}, handleSubmit, control, setValue, getValues} = useForm({

        defaultValues: {
            address: '',
            name: '',
            mobile: ''
        }
    });
    const onSubmit = (data) => {
        const {addCompanyWorker } = companiesOperations
        dispatch(addCompanyWorker(company.id, data))
       

    }

    const message = []

    const name = message?.filter(i=> i.includes('name'))
    const mobile = message?.filter(i=> i.includes('mobile'))
    const address = message?.filter(i=> i.includes('address'))

    return (
        <div className='create-worker-comp'>
            <div className='close-button'>
                <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <h3>Create worker</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='create-worker'>
                <div className='input-wrapper'>
                    <h4>Address</h4>
                    <input className={errors?.address?.type === 'required' || errors?.address?.type === 'maxLength' ? 'input-item-invalid' : ''}
                           {...register('address', {required: true, maxLength: 100})}
                           placeholder={'address'}
                    />
                    {address?.map(str=> {
                       const newStr = str.charAt(0).toUpperCase() + str.slice(1)
                        return(<p className='error'>{newStr}</p>)

                    })}
                    {errors.address && errors.address.type === 'required' && <p className='error'>This is required</p>}
                    {errors.address && errors.address.type === 'maxLength' && <p className='error'>Max length is 100</p>}

                </div>
                <div className='input-wrapper'>
                    <h4>Mobile</h4>
                    <input type={'text'} className={errors?.mobile?.type === 'required' || errors?.mobile?.type === 'pattern' ? 'input-item-invalid' : ''}
                           {...register('mobile', {required: true,
                               pattern:{
                                   value: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
                                   message:'Does not valid ',

                               },})}
                           placeholder={'mobile'}
                    />
                    {mobile?.map(str=> {
                        const newStr = str.charAt(0).toUpperCase() + str.slice(1)
                        return(<p className='error'>{newStr}</p>)
                    })}
                    {errors.mobile && errors.mobile.type === 'required' && <p className='error'>This is required</p>}
                    {
                        errors?.mobile &&  errors?.mobile?.type === 'pattern' &&   <p className='error'>{errors?.mobile.message}</p>
                    }
                </div>
                <div className='input-wrapper'>
                    <h4>Name</h4>
                    <input className={errors?.name?.type === 'maxLength' || errors?.name?.type === 'required' ? 'input-item-invalid' : ''}
                           {...register('name', {required: true, maxLength: 100})}
                           placeholder={'name'}
                    />
                    {name?.map(str=> {
                        const newStr = str.charAt(0).toUpperCase() + str.slice(1)
                        return(<p className='error'>{newStr}</p>)

                    })}
                    {errors.name && errors.name.type === 'maxLength' && <p className='error'>Max length is 100</p>}
                    {errors.name && errors.name.type === 'required' && <p className='error'>This is required</p>}

                </div>
                <div>

                </div>
               <div className='create-button'>
                   <button type={'submit'}>Create</button>
               </div>
            </form>

        </div>

    )
}

export default CreateWorkerComponent;