// import link
import {Link} from 'react-router-dom'

// import logo
import myRealtorLogo from "../assets/myRealtor-Logo.png"

export default function Header() {
    return(
        <header className='py-4 mb-12'>
            <div className="container flex items-center justify-between mx-auto ">
                <Link to='/'>
                    <img className="w-20 ml-2 md:ml-0" src={myRealtorLogo} alt='Logo' />
                </Link>
                <div className='flex items-center gap-5'>
                    <Link className='px-3 md:px-6 py-2 tracking-widest text-black uppercase transition rounded-lg shadow-lg shadow-gray-400 hover:shadow-lg hover:shadow-cyan-600 hover:text-cyan-500 hover:-translate-y-1 active:translate-y-0 active:shadow-md' to=''>Login</Link>
                    <Link className='px-3 md:px-6 py-2 tracking-widest uppercase transition rounded-lg shadow-lg bg-cyan-600 text-slate-100 shadow-gray-400 hover:shadow-lg hover:shadow-cyan-600 hover:-translate-y-1 active:translate-y-0 active:shadow-md mr-2 md:mr-0' to=''>Sign up</Link>
                </div>
            </div>
        </header>
    )
}