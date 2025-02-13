
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Mail, Lock, AlertCircle, LogIn } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/admin/auth/login", {
        email,
        password,
      })

      // Store admin token in local storage
      localStorage.setItem("adminToken", res.data.token)

      // Redirect to admin dashboard on successful login
      navigate("/admin/dashboard")

    } catch (err) {
      setError("Invalid admin credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 ease-in-out transform hover:scale-105">

        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-500 text-white p-3 rounded-full mb-4">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <AlertCircle className="mr-2" size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 flex items-center justify-center"
          >
            <LogIn className="mr-2" size={18} />
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

