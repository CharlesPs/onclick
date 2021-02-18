import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardHeader, CardBody, Button, Badge } from 'reactstrap'
import moment from 'moment'

import { SpinCircle } from 'components/Spin'
import { confirm } from 'components/CustomModal/ModalConfirm'
import { StripedTable } from 'components/CustomTable'

import userAction from 'redux/actions/userAction'

import ChangePasswordForm from './ChangePasswordForm' 
import UserForm from './UserForm'

import { PermssionHelper } from 'helpers/permission'

const User = () => {
  const [loading, setLoading] = useState(true)

  // < change password form
  const [showChangePassword, setShowChangePassword] = useState(false)

  const toggleChangePassword = useCallback(() => {
    setShowChangePassword(!showChangePassword)
  }, [showChangePassword])
  // > change password form

  // < region form
  const [showRegion, setShowRegion] = useState(false)

  const toggleRegion = useCallback(() => {
    setShowRegion(!showRegion)
  }, [showRegion])
  // > region form

  // < NEWFORM
  const [modeNewForm, setModeNewForm] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)

  const toggleNewForm = useCallback(() => {
    setModeNewForm(false)
    setShowNewForm(!showNewForm)
  }, [showNewForm])

  // const [showEditForm, setEditForm] = useState(false)
  const toggleEditForm = useCallback(() => {
    setModeNewForm(true)
    setShowNewForm(!showNewForm)
  }, [showNewForm])

  // > NEWFORM

  const dispatch = useDispatch()

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'name'
      },
      {
        Header: 'Apellidos',
        accessor: 'lastname'
      },
      {
        Header: 'Usuario',
        accessor: 'username'
      },
      {
        Header: 'Perfil',
        accessor: 'profile.name'
      },
      {
        Header: 'Status',
        accessor: 'isActive',
        Cell: ({ cell: { value } }) =>
          value ? <Badge color="success">Activo</Badge> : <Badge color="danger">Inactivo</Badge>
      },
      {
        Header: 'Registro',
        accessor: 'createdAt',
        Cell: ({ cell: { value } }) => moment(value).format('LLL')
      },
      {
        Header: 'Actualización',
        accessor: 'updatedAt',
        Cell: ({ cell: { value } }) => (value ? moment(value).format('LLL') : '-')
      },
      {
        Header: 'Actions',
        width: 300,
        Cell: ({ row: { original } }) => {
          const [deleting, setDeleting] = useState({ [`row_id_${original.id}`]: false })

          return (
            <div className="btn-group btn-group-sm">
              {PermssionHelper('user', 'u') ? (
                <Button
                  disabled={deleting[`row_id_${original.id}`]}
                  outline
                  color="dark"
                  onClick={() => {
                    dispatch(userAction.find(original.id))
                    toggleEditForm()
                  }}
                >
                  <i className="icon-pencil"></i>
                </Button>
              ) : null}
              {PermssionHelper('user_password_change', 'u') ? (
                <Button
                  disabled={deleting[`row_id_${original.id}`]}
                  outline
                  color="dark"
                  onClick={() => {
                    dispatch(userAction.find(original.id))
                    toggleChangePassword()
                  }}
                >
                  <i className="icon-key"></i> Cambiar contraseña
                </Button>
              ) : null}
              {/* {PermssionHelper('user_add_region', 'u') ? (
                <Button
                  disabled={deleting[`row_id_${original.id}`]}
                  outline
                  color="dark"
                  onClick={() => {
                    dispatch(userAction.find(original.id))
                    toggleRegion()
                  }}
                >
                  <i className="cil-globe-alt"></i> Asignar regiones
                </Button>
              ) : null} */}
              {PermssionHelper('user', 'd') ? (
                <Button
                  disabled={deleting[`row_id_${original.id}`]}
                  outline
                  color="danger"
                  onClick={() =>
                    confirm('Delete', 'Are you sure you want to delete this record?').then(() => {
                      setDeleting({ [`row_id_${original.id}`]: true })
                      dispatch(userAction.remove(original.id))
                    })
                  }
                >
                  {deleting[`row_id_${original.id}`] ? (
                    <Fragment>
                      <SpinCircle /> Deleting...
                    </Fragment>
                  ) : (
                    <i className="icon-trash"></i>
                  )}
                </Button>
              ) : null}
            </div>
          )
        }
      }
    ],
    [dispatch, toggleEditForm, toggleChangePassword, toggleRegion, PermssionHelper]
  )

  const data = useSelector((store) => store.userReducer.users)

  const loaded = useSelector((store) => store.userReducer.loaded)

  const fetchUsers = useCallback(() => {
    dispatch(userAction.findAll()).then((status) => {
      console.log(status)
    })
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      setLoading(false)
    } else {
      fetchUsers()
    }
  }, [loaded, fetchUsers])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <strong>Usuarios</strong>
            </CardHeader>
            <CardBody>
              <div className="rt-wrapper">
                <div className="rt-buttons">
                  {PermssionHelper('user', 'c') ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        toggleNewForm()
                      }}
                    >
                      <i className="icon-plus"></i> Nuevo
                    </Button>
                  ) : null}
                </div>
                {PermssionHelper('user', 'r') ? (
                  <StripedTable
                    columns={columns}
                    data={data}
                    defaultSorted={[
                      {
                        id: 'createdAt',
                        desc: true
                      }
                    ]}
                    loading={loading}
                  />
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ChangePasswordForm show={showChangePassword} dismiss={toggleChangePassword} />

      <UserForm show={showNewForm} dismiss={toggleNewForm} isEdit={modeNewForm} />
    </div>
  )
}

export default User