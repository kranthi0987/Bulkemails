import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';
import {AppAsideToggler, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

// Pages
const Login = React.lazy(() => import('../../views/Pages/Login'));

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    navigate(e) {
        console.log(this.props)
        //this.props.history('/dashboard')
        // this.props.children.push('/path')
        // const {history} = this.props;
        // history.push("/feature");
        // this.context.propTypes.push("/path")

    };

    handleLogout() {
        // userHasAuthenticated(false);

        //browserHistory.push('/');
    }

    render() {

        // eslint-disable-next-line
        // const {children, ...attributes} = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                <AppNavbarBrand
                    full={{src: logo, width: 89, height: 25, alt: 'Rim'}}
                    minimized={{src: sygnet, width: 30, height: 30, alt: 'Rim'}}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg"/>

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/users" className="nav-link">Users</Link>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav direction="down">
                        <DropdownToggle nav>
                            <img src={'../../assets/img/avatars/atar.png'} className="img-avatar"
                                 alt="admin@bootstrapmaster.com"/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header tag="div"
                                          className="text-center"><strong>Account</strong></DropdownItem>
                            <DropdownItem><i className="fa fa-user"></i><Link to='UserProfile'> Profile</Link></DropdownItem>
                            <DropdownItem><i className="fa fa-lock"></i><Link to='/'> Logout </Link> </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                {/*<AppAsideToggler className="d-md-down-none"/>*/}
                {/*<AppAsideToggler className="d-lg-none" mobile />*/}
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
