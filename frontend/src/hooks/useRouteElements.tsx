import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import MainBoardPage from '../modules/main_board/pages/MainBoardPage'
import MainLayout from '../layouts/MainLayout'
import CreateTaskPage from '../modules/main_board/pages/CreateTaskPage'
import LoginPage from '../modules/main_board/pages/LoginPage'
import { useSelector } from 'react-redux'
import RegisterPage from '../modules/main_board/pages/RegisterPage'

const useRouteElements = () => {
    const isLogin = useSelector((state: any) => state.AuthStore.isUserAuthenticated)
    const routeElements = useRoutes([
        {
            path: '/',
            element: isLogin ? <MainLayout><MainBoardPage/></MainLayout> : <Navigate to="/login" />
        },
        {
            path: '/create_task',
            element: isLogin ? <MainLayout><CreateTaskPage/></MainLayout> : <Navigate to="/login" />
        },
        {
            path: '/login',
            element: <LoginPage></LoginPage>
        },
        {
            path: '/register',
            element: <RegisterPage></RegisterPage>
        },
    ])

  return routeElements
}

export default useRouteElements