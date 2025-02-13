"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Home, Calendar, PlusCircle, LogOut, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "My Bookings", path: "/my-appointments", icon: Calendar },
    { name: "Add Booking", path: "/book-appointment", icon: PlusCircle },
  ]

  return (
    <nav className="bg-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex-shrink-0  hover:bg-cyan-100">
              <img className="h-10 w-10" src="/logo.png" alt="Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-black hover:bg-cyan-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center"
                  >
                    <item.icon className="h-5 w-5 mr-1" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="border-2 border-red-400 text-gray-600 hover:bg-red-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Log out
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900  px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout()
                setIsMenuOpen(false)
              }}
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900  w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out flex items-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

