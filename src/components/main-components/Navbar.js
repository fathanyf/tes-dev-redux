import Link from "next/link"

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark navbar-dark">
                <div className="container">
                    <Link href="/home">
                        <a className="navbar-brand">
                            <img src="/logochapter10.png" style={{ width: '125px' }} />
                        </a>
                    </Link>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        <ul className="navbar-nav">
                            <Link className="nav-item" href={`/home`}>
                                <a className="nav-link"><i className="bi bi-controller mr-1"></i><b>Home</b></a>
                            </Link>
                            <Link className="nav-item" href={`/games`}>
                                <a className="nav-link"><i className="bi bi-joystick mr-1"></i><b>Playground</b></a>
                            </Link>
                        </ul>
                    </div>
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        <Link className="nav-item" href={`/auth/signin`}>
                            <a className="nav-link"><i className="bi bi-box-arrow-in-right"></i> <b>Sign In</b></a>
                        </Link>
                        <Link className="nav-item" href={`/auth/signup`}>
                            <a className="nav-link"><i className="bi bi-door-open"></i> <b>Sign Up</b></a>
                        </Link>
                        <Link href={`/account`} className="nav-item dropdown">
                            <a className="nav-link" href="#">
                                <i className="bi bi-person-circle mr-1" />
                                <span>user@gmail.com</span>
                            </a>
                        </Link>
                        <li className="nav-item dropdown bg-dark">
                            <a className="nav-link" data-toggle="dropdown" href="#">
                                <i className="bi bi-gear-fill mr-1" />
                                <span>Manage User</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right dark-mode">
                                <Link href='/account/profile'>
                                    <a className="dropdown-item">
                                        <i className="bi bi-person-bounding-box mr-4" />Update Profile
                                    </a>
                                </Link>
                                <hr />
                                <a href="#" className="dropdown-item">
                                    <i className="bi bi-key-fill mr-4" /> Reset Password
                                </a>
                                <hr />
                                <button className="dropdown-item text-center"><i className="bi bi-box-arrow-in-left mr-1"></i> Logout</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar