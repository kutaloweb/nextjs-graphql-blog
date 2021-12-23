import {useState, useEffect} from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Link from 'next/link'
import withApollo from '../../hoc/withApollo'
import {useLazyGetUser} from '../../apollo/actions'

const AppLink = ({children, className, href, as}) =>
    <Link href={href} as={as}>
        <a className={className}>{children}</a>
    </Link>

const AppNavbar = () => {
    const [user, setUser] = useState(null)
    const [hasResponse, setHasResponse] = useState(false)
    const [getUser, {data, error}] = useLazyGetUser()

    useEffect(() => {
        getUser()
    }, [])

    if (data) {
        if (data.user && !user) {
            setUser(data.user)
        }
        if (!data.user && user) {
            setUser(null)
        }
        if (!hasResponse) {
            setHasResponse(true)
        }
    }

    return (
        <div className="navbar-wrapper">
            <Navbar expand="lg" className="navbar-dark blog-mw9">
                <AppLink
                    href="/"
                    className="navbar-brand mr-3 font-weight-bold">
                    Blog
                </AppLink>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <AppLink href="/posts" className="nav-link mr-3">
                            Posts
                        </AppLink>
                    </Nav>
                    {hasResponse &&
                        <Nav>
                            {user &&
                                <>
                                    <span className="nav-link mr-2">Welcome {user.username}</span>
                                    {(user.role === 'admin') &&
                                        <NavDropdown className="mr-2" title="Manage" id="basic-nav-dropdown">
                                            <>
                                                <AppLink href="/posts/new" className="dropdown-item">
                                                    Create Post
                                                </AppLink>
                                                <AppLink
                                                    href="/admin/[id]/dashboard"
                                                    as={`/admin/${user._id}/dashboard`}
                                                    className="dropdown-item">
                                                    Dashboard
                                                </AppLink>
                                            </>
                                        </NavDropdown>
                                    }
                                    <AppLink href="/logout" className="nav-link btn btn-danger">
                                        Sign Out
                                    </AppLink>
                                </>
                            }
                            {(error || !user) &&
                                <>
                                    <AppLink href="/login" className="mr-3 nav-link">
                                        Sign In
                                    </AppLink>
                                    <AppLink href="/register" className="mr-3 btn btn-success bg-green-2 bright">
                                        Sign Up
                                    </AppLink>
                                </>
                            }
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withApollo(AppNavbar);
