const allCompaniesSelector = ({companies}) => companies.companies
const companySelector = ({companies}) => companies.company
const isLoadingCompaniesSelector = ({companies}) => companies.isLoadingCompanies


export const companiesSelectors = {
    allCompaniesSelector,
    companySelector,
    isLoadingCompaniesSelector
}