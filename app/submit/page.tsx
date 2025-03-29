import React from 'react'
import ProjectSubmissionForm from './components/SubmissionForm'

interface Props {
    
}

const page = (props: Props) => {
    return (
        <div className="min-h-screen bg-background ">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Project Submission
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Share your innovative project with the community
              </p>
            </div>
            <ProjectSubmissionForm />
          </div>
        </div>
      </div>
    )
}

export default page
