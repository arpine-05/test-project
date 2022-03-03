import './createCompanyComponent.scss'
import {useForm} from 'react-hook-form'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    createCompany,
    editCompany,
    getCompanies,
    getCompany,
    getMessage,
    getResponse
} from "../../redux/companies/actions";

const CreateCompanyComponent = (props) => {
    const {closeModal, title, setModalTitle} = props;
    const dispatch = useDispatch();
    const {company, responseMes, message} = useSelector(state => state.companies)
    const {register, formState: {errors}, handleSubmit, control, setValue, getValues} = useForm({
        defaultValues: {
            name: '',
            address: '',
            email: ''
        }
    });
    const editDefault = () => {
        setValue('address', company.address)
        setValue('name', company.name)
        setValue('email', company.email)
    }
    useEffect(() => {
        if (title === 'edit') {
            editDefault()

        }

    }, [editDefault])
    const changeTitle = () => {
        setModalTitle('create')
    }
    useEffect(() => {
        if (title === 'edit') {
            setModalTitle('edit')

        }
        return () => {
            changeTitle('create')
        }
    }, [])
    const onSubmit = async (data) => {
        if (title === 'create') {
            await dispatch(createCompany(data))
            await dispatch(getCompanies())
        } else {
            await dispatch(editCompany(company.id, data))
            await dispatch(getCompany(company.id))
            await dispatch(getCompanies())
        }
    }
    if (responseMes?.id) {
        closeModal()

    }
    useEffect(() => {
        return () => {
            dispatch(getMessage([]))
            dispatch(getResponse(5))
        }
    }, [])
    return (
        <div className='company-create'>
            <div className='close-button'>
                <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <h3> {title} company </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-wrapper'>
                    <h4>Name</h4>
                    <input
                        className={errors?.address?.type === 'required' || errors?.address?.type === 'maxLength' ? 'input-item-invalid' : ''}
                        {...register('name', {required: true, maxLength: 100})}
                        placeholder={'name'}
                    />
                    {errors.name && errors.name.type === 'required' && <p className='error'>This is required</p>}
                    {errors.name && errors.name.type === 'maxLength' && <p className='error'>Max length is 100</p>}
                </div>

                <div className='input-wrapper'>
                    <h4>Address</h4>
                    <input
                        className={errors?.address?.type === 'required' || errors?.address?.type === 'maxLength' ? 'input-item-invalid' : ''}
                        {...register('address', {required: true, maxLength: 100})}
                        placeholder={'address'}
                    />
                    {errors.address && errors.address.type === 'required' && <p className='error'>This is required</p>}
                    {errors.address && errors.address.type === 'maxLength' &&
                    <p className='error'>Max length is 100</p>}
                </div>
                <div className='input-wrapper'>
                    <h4>Email</h4>
                    <input className={errors.email ? 'input-item-invalid' : ''}
                           {...register('email', {
                               required: true,
                               pattern: {
                                   value: /\S+@\S+.\S+/,
                                   message: 'Entered value does not match email format'
                               }
                           })}
                           placeholder={'email'}
                    />
                    {errors.email && errors.email.type === 'required' && <p className='error'>This is required</p>}

                </div>
                <div>
                    {
                        message?.map((i, index) => <p key={index}>{i}</p>)
                    }
                </div>
                <div className='button-div'>
                    <button type={'submit'}> {title === 'create' ? 'Create' : 'Edit'}</button>

                </div>
            </form>
        </div>
    )
}

export default CreateCompanyComponent;