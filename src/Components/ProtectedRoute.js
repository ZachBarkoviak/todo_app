import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'


//below we are making a component that redirects the unauthenticated user to the login screen. We pass in children in the params
// as a prop which refers to any component that is nested inside of ProtectedRoute tags.
export default function ProtectedRoute({children}) {
    const {currentUser} = useAuth()

    //below we check to see if there's a currentUser. if so, render the children components. else, navigate the user to login
  return currentUser ? children : <Navigate to='/login' />
}
