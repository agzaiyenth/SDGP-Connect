import React from 'react'

interface Props {
    
}

const page = (props: Props) => {
    return (
        <div>
            This will be the admin panel for the admin to manage the projects and users.
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <p className="mt-4">Here you can add, edit, and delete projects and users.</p>
            <h2 className="text-2xl font-semibold mt-8">Manage Projects</h2>
            <p className="mt-2">Use the options below to manage your projects.</p>
        </div>
    )
}

export default page
