import CompanyPage from "./pages/companyPage/companyPage"
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Header from "./components/header/header";

const App = ()=> {
  return(
      <Provider store={store}>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path={'/'} index element={ <CompanyPage/>}/>
              </Routes>
          </BrowserRouter>
      </Provider>
  )
}

export default App;