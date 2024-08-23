import Logo from "../assets/myRealtor-Logo.png"

export default function Footer() {

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    return(
        <footer className="main-footer">
            <div className="footer-logo-box">
                <img className="w-40 footer-logo" src={Logo} alt="Be My Guest Logo" />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-center">
                    <div className="footer-navigation">
                        <ul className="text-xs md:text-sm lg:text-base footer-list">
                            <li className="footer-item"><a className="footer-link" href="#">
                                Terms & Conditions</a>
                            </li>
                            <li className="footer-item"><a className="footer-link" href="#">Privacy policy</a>
                            </li>
                            <li className="footer-item"><a className="footer-link" href="#">
                                Help</a>
                            </li>
                            <li className="footer-item"><a className="footer-link" href="#">
                                Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-row justify-center mt-5">
                        <p className="text-xs md:text-sm lg:text-base">
                            Copyright &copy; {currentYear} by <a className="footer-link" href="https://www.github.com/Itzemmanuel" target="_blank" rel="noreferrer">Emmanuel Phanuel</a>, All Rights Reserved.  
                        </p>
                </div>
            </div>
        </footer>
    )
}