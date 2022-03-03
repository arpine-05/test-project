import {EDIT_COMPANY_RECORD, GET_COMPANIES, GET_COMPANY_DATA, GET_MESSAGE, GET_RESPONSE, SET_IS_LOADER} from "./types";

const initialState = {
    companies:[],
    isLoader:false,
    message:[],
    company:{

    },
    responseMes:5
}

const CompaniesReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_COMPANIES:
            return{
                ...state,
                companies:action.payload
            }
        case  EDIT_COMPANY_RECORD:
            return {
                ...state,
                companies:state.companies.map(company=>{
                    if(company.id === action.id){
                        return {...company, record:action.payload}
                    }else {
                        return  company
                    }
                })
            }
        case GET_COMPANY_DATA:
            return {
                ...state,
                company:action.payload
            }
        case GET_MESSAGE:
            return {
                ...state,
                message:action.payload
            }
        case SET_IS_LOADER:
            return {
                ...state,
                isLoader: action.payload
            }
        case GET_RESPONSE:
            return {
                ...state,
                responseMes: action.payload
            }

        default: return state

    }
}

export default CompaniesReducer;