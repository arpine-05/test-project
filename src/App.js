import CompanyPage from "./pages/companyPage/companyPage"
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Header from "./components/header/header";

const App = ()=> {
  return(
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path={'/'} index element={ <CompanyPage/>}/>
              </Routes>
          </BrowserRouter>
  )
}

export default App;