
import { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import { Calendar, Clock, User, Loader, AlertCircle } from "lucide-react"

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        // Check if admin is authenticated
        const token = localStorage.getItem("adminToken")
        const res = await axios.get(`http://localhost:5000/api/allApp`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setAppointments(res.data)

      } catch (err) {
        console.error("Failed to fetch appointments:", err)
        setError(err.response?.data?.error || "Failed to fetch appointments")

      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin text-blue-500" size={48} />
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <div className="flex items-center">
                <AlertCircle className="mr-2" size={24} />
                <p>{error}</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">All Appointments</h3>

              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User ID
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appt, index) => (
                    <tr
                      key={`${appt.date}-${appt.time_slot}-${index}`}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="mr-2 text-gray-400" size={16} />
                          {new Date(appt.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="mr-2 text-gray-400" size={16} />
                          {appt.time_slot}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="mr-2 text-gray-400" size={16} />
                          {appt.user_id || "N/A"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

