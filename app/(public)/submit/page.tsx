'use client'

import React, { useState } from 'react'
import ProjectSubmissionForm from '../../../components/submit-form/SubmissionForm'

const Page = () => {
  const [showPopup, setShowPopup] = useState(true)

  const handleAgree = () => {
    setShowPopup(false)
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-[#0f0f0f] text-white p-6 md:p-8 rounded-2xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-neutral-700">
            <h2 className="text-2xl font-bold mb-5 text-center text-white">Submission Instructions</h2>
            <ul className="list-disc pl-5 space-y-3 text-neutral-300 text-sm md:text-base">
              <li>All submissions will be <strong>carefully reviewed</strong> and recorded.</li>
              <li><strong>Failure to submit</strong> your project may impact your academic marks.</li>
              <li>Any <strong>one member</strong> from the team should submit the form.</li>
              <li>Once submitted, <strong>you cannot edit</strong> it. Resubmit if you need to make changes.</li>
              <li>You must include your project's <strong>Cover Image</strong>.</li>
              <li>A minimum of <strong>3 Gallery Images</strong> is required.</li>
              <li>Submitting <strong>Contact Number & Email address</strong> is mandatory.</li>
              <li>After submission, you may <strong>review</strong> your entry.</li>
              <li>Approved projects will receive a confirmation <strong>email</strong> to the provided email address.</li>
              <li>If rejected, read the feedback and <strong>resubmit</strong> correctly.</li>
              <li><strong>Providing false information is an offense.</strong></li>
            </ul>
            <div className="text-center mt-6">
              <button
                onClick={handleAgree}
                className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-lg text-white text-sm font-medium border border-neutral-600"
              >
                I Understand & Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Project Submission
            </h1>
            <p className="text-lg text-neutral-400">
              Share your innovative project with the community
            </p>
          </div>
          <ProjectSubmissionForm />
        </div>
      </div>
    </div>
  )
}

export default Page
