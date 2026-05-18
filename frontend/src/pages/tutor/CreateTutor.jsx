import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"

function CreateTutor() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        instrument: "",
        bio: "",
        experience: "",
        hourlyRate: "",
        availability: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const token = localStorage.getItem("token")

            const response = await API.post(
                "/tutors/create-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.success) {

                const user = JSON.parse(
                    localStorage.getItem("user")
                )

                user.role = "tutor"

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                )

                alert("Tutor profile created!")

                navigate("/tutor-dashboard")
            }

        } catch (error) {

            alert(
                error?.response?.data?.message ||
                "Failed to create tutor profile"
            )

        }

    }

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl space-y-4"
            >

                <h1 className="text-4xl font-bold mb-6">
                    Become a Tutor 🎸
                </h1>

                <input
                    type="text"
                    name="instrument"
                    placeholder="Instrument"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="hourlyRate"
                    placeholder="Hourly Rate"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <button
                    className="w-full bg-black text-white py-4 rounded-xl text-xl"
                >
                    Create Tutor Profile
                </button>

            </form>

        </div>

    )
}

export default CreateTutor