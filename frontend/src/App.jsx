import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Navbar from "./components/navbar/Navbar"

import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"

import Tutors from "./pages/tutor/Tutors"
import TutorDetails from "./pages/tutor/TutorDetails"

import MyBookings from "./pages/student/MyBookings"
import TutorDashboard from "./pages/tutor/TutorDashboard"

import CreateTutor from "./pages/tutor/CreateTutor"
import Home from "./pages/Home"

// import ProtectedRoute from "./components/ProtectedRoute"
// routes mein:

function App() {

  return (

    <BrowserRouter>

      <Navbar />
      
      <Routes>

        <Route 
          path="/" 
          element={<Home />} 
        />

        <Route
          path="/"
          element={<Tutors />}
        />

        <Route
          path="/tutors"
          element={<Tutors />}
        />

        <Route
          path="/tutors/:id"
          element={<TutorDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/tutor-dashboard"
          element={<TutorDashboard />}
        />

        <Route
          path="/create-tutor"
          element={<CreateTutor />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App