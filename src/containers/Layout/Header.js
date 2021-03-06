import React from 'react'
import * as router from 'react-router-dom'

import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap'
import PropTypes from 'prop-types'
import { AppNavbarBrand, AppSidebarToggler, AppBreadcrumb } from '@coreui/react'

import { Link } from 'react-router-dom'

import routes from 'helpers/routes'

import logo from 'assets/img/brand/logo.png'
import iso from 'assets/img/brand/iso.png'

import FeedbackActions from 'redux/feedback.redux'
import Feedback from 'components/Feedback/Feedback'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { toastDefaults } from 'helpers/config'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

const Header = (props) => {

  const dispatch = useDispatch()

  const feedback_create_status = useSelector(state => state.FeedbackReducer.create_status)
  const createRow = async (data) => {

    await dispatch(FeedbackActions.createRow(data))

    toast.success('El mensaje se envió con éxito.', toastDefaults)
  }

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{
          src: logo,
          width: 155,
          height: 55,
          alt: 'Logo'
        }}
        minimized={{
          src: iso,
          width: 40,
          height: 40,
          alt: 'ISO'
        }}
      />

      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <AppBreadcrumb className="d-none d-lg-block" appRoutes={routes} router={router} />

      <Nav className="ml-auto" navbar>
          <Feedback
            sending={feedback_create_status === 'creating'}
            dispatch={async (data) => await createRow(data)}
            position="top"
          />
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav
            style={{
              display: 'flex',
            }}
          >
            <span className="d-none d-sm-flex" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {props.user.name}
            </span>
            <span className="img-avatar"
              style={{
                border: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: 35
              }}
            >
              {props.user.name.substring(0, 1).toUpperCase()}
            </span>
          </DropdownToggle>
          <DropdownMenu right>
            <Link className="dropdown-item" to="/security/change-password">
              <i className="icon-lock-open"></i> Cambiar contraseña
            </Link>
            <DropdownItem onClick={(e) => props.onLogout(e)}>
              <i className="icon-logout"></i> Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
