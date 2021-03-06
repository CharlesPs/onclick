/*eslint no-unused-vars: "off" */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import PermissionHelper from 'helpers/PermissionHelper'

import InquiryActions from 'redux/inquiries.redux'
import { Button, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { StripedTable } from 'components/CustomTable'

const moment = require('moment')

const Inquiries = () => {

    const dispatch = useDispatch()

    const my_permissions = useSelector((state) => state.accountReducer.permissions)
    const permission_helper = new PermissionHelper(my_permissions)

    const inquiries_result = useSelector(state => state.InquiriesReducer.result)
    const inquiries_load_status = useSelector(state => state.InquiriesReducer.load_status)
    const inquiries_load_check_status = useSelector(state => state.InquiriesReducer.load_check_status)

    const [ showFilter, setShowFilter ] = useState(false)
    const [ filter, setFilter ] = useState('')

    const [ showModal, setShowModal ] = useState(false)
    const [ feedbackRow, setFeedbackRow ] = useState({})

    useEffect(() => {

        if (inquiries_load_status === '') {

            dispatch(InquiryActions.ActionFindAll(filter))
        }
    }, [ inquiries_load_status, dispatch ])

    if (!permission_helper.validate('page_contact', 'r')) {

        return <Redirect to='/' />
    }

    const getRowDate = (date) => {

        return moment(date).format('DD/MM/YYYY H:mm a')
    }

    const selectRow = (row) => {

        setFeedbackRow(row)

        setShowModal(true)
    }

    const getFilterText = () => {

        const texts = {
            '': 'Todos',
            pending: 'Pendientes',
            solved: 'Resueltos'
        }

        return texts[filter]
    }

    const toggleFilter = () => {

        setShowFilter(!showFilter)
    }

    const changeFilter = (filter) => {

        dispatch(InquiryActions.ActionFindAll(filter))

        setFilter(filter)
    }

    const closeModal = () => {
        setFeedbackRow({})
        setShowModal(false)
    }

    const checkInquiry = () => {
        dispatch(InquiryActions.ActionCheck(feedbackRow.id)).then(() => {
            closeModal()
        })
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Mensajes</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                                <StripedTable
                                    columns={[
                                        { Header: 'Nombre', accessor: 'name' },
                                        { Header: 'Apellidos', accessor: 'lastname' },
                                        { Header: 'Email', accessor: 'email' },
                                        { Header: 'Teléfono', accessor: 'phone' },
                                        { Header: 'Actividad', accessor: 'activity' },
                                        // { Header: 'Mensaje', accessor: 'message' },
                                        { Header: 'Fecha de ingreso', accessor: 'createdAt', Cell: ({ cell: { value } }) =>  moment(value).format('DD/MM/YYYY h:mm a') },
                                        { Header: 'Estado', accessor: 'isActive', Cell: ({ cell: { value } }) =>  value ? 'Resuelto' : 'Pendiente'},
                                        { Header: 'Acciones', width: 250, Cell: ({ row: { original } }) => (
                                            <>
                                                <button className="btn btn-secondary" onClick={() => selectRow(original)}>
                                                    Leer
                                                </button>
                                            </>
                                        )}
                                    ]}
                                    data={inquiries_result}
                                    loading={inquiries_load_status === 'loading'}
                                    options={{
                                        toolbar: {
                                            rightButtons: [
                                                (
                                                    <div className="btn-group">
                                                        <Dropdown isOpen={showFilter} toggle={toggleFilter}>
                                                            <DropdownToggle caret>
                                                                {getFilterText()}
                                                            </DropdownToggle>
                                                            <DropdownMenu right>
                                                                <DropdownItem active={filter === ''}
                                                                    onClick={() => changeFilter('')}
                                                                >
                                                                    Todos
                                                                </DropdownItem>
                                                                <DropdownItem active={filter === 'pending'}
                                                                    onClick={() => changeFilter('pending')}
                                                                >
                                                                    Pendientes
                                                                </DropdownItem>
                                                                <DropdownItem active={filter === 'solved'}
                                                                    onClick={() => changeFilter('solved')}
                                                                >
                                                                    Resueltos
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                )
                                            ],
                                        }
                                    }}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal size="lg" isOpen={showModal} toggle={() => setShowModal(!showModal)}>
                <ModalHeader toggle={() => setShowModal(false)}>Mensaje de consulta</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={3}>ID</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={feedbackRow.id}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Fecha de mensaje</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={getRowDate(feedbackRow.createdAt)}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Nombre</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={feedbackRow.name +" "+ feedbackRow.lastname}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Email</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={feedbackRow.email}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Teléfono</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={feedbackRow.phone}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Actividad</Label>
                            <Col sm={9}>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    defaultValue={feedbackRow.activity}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={3}>Mensaje </Label>
                            <Col sm={9}>
                                <textarea
                                    type="text"
                                    className="form-control-plaintext-message"
                                    defaultValue={feedbackRow.message}
                                    readOnly

                                ></textarea>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {!permission_helper.validate('page_contact', 'u') ? null : (
                        <>
                            <Button
                                color={`outline-${feedbackRow.isActive ? 'secondary' : 'primary'}`}
                                onClick={checkInquiry}
                            >
                                Marcar como {feedbackRow.isActive ? 'pendiente' : 'resuelta'}
                            </Button>
                        </>
                    )}
                    <Button color="secondary" onClick={closeModal}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default Inquiries
