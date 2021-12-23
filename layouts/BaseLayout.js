import Navbar from '../components/shared/Navbar'
import Hero from '../components/shared/Hero'
import {ToastContainer} from 'react-toastify'

const BaseLayout = ({children, page = ''}) => {
    const isHomePage = () => page === 'Home'

    return (
        <div className="blog-app">
            <Navbar/>
            {isHomePage() && <Hero/>}
            <div className="container mb-5">
                {children}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default BaseLayout
