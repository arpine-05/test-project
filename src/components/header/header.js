import logo from '../../images/logo.jpg'
import './header.scss';
const Header = ()=> {


    return(
        <header>
            <nav>
                <div>
                    <img src={logo}/>
                </div>
            </nav>
        </header>
    )
}
export default Header