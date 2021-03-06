/*eslint no-unused-vars: "off" */

import React from 'react'

const Dashboard = React.lazy(() => import('views/Dashboard/Dashboard'))

const MyContacts = React.lazy(() => import('views/Clients/MyContacts/MyContacts'))
const MyPayments = React.lazy(() => import('views/Clients/MyPayments/MyPayments'))
const MyLandings = React.lazy(() => import('views/Clients/MyLandings/MyLandings'))
const ClientLanding = React.lazy(() => import('views/ClientLanding/ClientLanding'))
const MyLanding = React.lazy(() => import('views/Clients/MyLanding/MyLanding'))

const User = React.lazy(() => import('views/Security/User/User'))
const Profile = React.lazy(() => import('views/Security/Profile/Profile'))

const Access = React.lazy(() => import('views/Security/Profile/Access'))
// const Inscription = React.lazy(() => import('views/Inscription/Inscription'))
// const Subscription = React.lazy(() => import('views/Subscription/Subscription'))
// const Report = React.lazy(() => import('views/Report/Report'))

const Client = React.lazy(() => import('views/Client/Client'))
const Payment = React.lazy(() => import('views/Payment/Payment'))
const MyPayment = React.lazy(() => import('views/Client/Payment/MyPayment'))
const MyKanban = React.lazy(() => import('views/Tests/MyKanban/MyKanban'))

const Activations = React.lazy(() => import('views/Activations/Activations'))
const Inquiries = React.lazy(() => import('views/Inquiries/Inquiries'))
const Feedback = React.lazy(() => import('views/Feedback/Feedback'))

const ChangePassword = React.lazy(() => import('views/Security/ChangePassword'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Tablero', component: Dashboard },
  { path: '/my-contacts', name: 'Mis contactos', component: MyContacts },
  { path: '/my-payments', name: 'Mis pagos', component: MyPayments },
  { path: '/my-landing', name: 'Editor de landing', component: MyLanding },
  { path: '/client-landing/:client_id', name: 'Editor de landing', component: ClientLanding },

  { path: '/security/access', name: 'Accesos', component: Access },
  { path: '/security/users', name: 'Usuarios', component: User },
  { path: '/security/profiles', name: 'Perfiles', component: Profile },
  { path: '/security/change-password', name: 'Cambiar contraseña', component: ChangePassword },

  { path: '/client', name: 'Usuarios', component: Client },
  { path: '/payment', name: 'Pagos', component: Payment },
  { path: '/my-payments', name: 'Mis pagos', component: MyPayment },
  { path: '/my-kanban', name: 'Mi kanban', component: MyKanban },

  { path: '/requests', name: 'Solicitudes', component: Activations },
  { path: '/feedback', name: 'Feedback', component: Feedback },
  { path: '/messages', name: 'Mensajes', component: Inquiries },

]

export default routes
