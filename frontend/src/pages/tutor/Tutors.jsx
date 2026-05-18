import { useEffect, useState } from "react"

import API from "../../services/api"

import TutorCard from "../../components/tutor/TutorCard"

function Tutors() {

    const [tutors, setTutors] = useState([])
    
    const getTutors = async () => {
        
        try {

            const response = await API.get(
                "/tutors"
            )

            setTutors(response.data.data)

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        getTutors()

    }, [])

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold text-center mb-10">
                Find Your Music Tutor 🎸
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    tutors.map((tutor) => (

                        <TutorCard
                            key={tutor._id}
                            tutor={tutor}
                        />

                    ))
                }

            </div>

        </div>

    )
}

export default Tutors