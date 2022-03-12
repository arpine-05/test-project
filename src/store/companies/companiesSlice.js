import { createSlice } from '@reduxjs/toolkit'
import { initialCompaniesState } from './initialState'


export const companiesSlice = createSlice({
    name: 'companies',
    initialState: initialCompaniesState(),
    reducers: {
        setCompanies(state, action) {
            state.companies = action.payload
        },
        setCompany(state, action) {
            state.company = action.payload
        },
        setIsLoading(state, action) {
            state.isLoadingCompanies = action.payload
        }

    }
})

