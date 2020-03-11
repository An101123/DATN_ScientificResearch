import React from 'react';
import DefaultLayout from './containers/DefaultLayout'

const Dashboard = React.lazy(() => import('./containers/Pages/Dashboard/Dashboard'))
const FloorPage = React.lazy(() => import('./containers/Pages/FloorPage/FloorPage'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/floors', name: 'Floors', component: FloorPage }
]

export default routes;
