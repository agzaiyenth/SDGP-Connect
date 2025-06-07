'use client'
import React, { useState } from 'react'
import Stepper, { Step } from '@/components/Award/stepForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlipText } from '@/components/magicui/flip-text';
import { AuroraText } from '@/components/magicui/aurora-text';

type Props = {}

const page = (props: Props) => {
  // Form state
  const [projectId, setProjectId] = useState("");
  const [competitionId, setCompetitionId] = useState("");
  const [awardName, setAwardName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Mock data (normally would come from API)
  const mockProjects = [
    { id: "1", name: "Project Alpha" },
    { id: "2", name: "Project Beta" },
    { id: "3", name: "Project Gamma" }
  ];

  const mockCompetitions = [
    { id: "1", name: "Annual Innovation Challenge" },
    { id: "2", name: "Summer Code Fest" },
    { id: "3", name: "Tech for Good Hackathon" }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File type validation
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Please select a JPG or PNG image');
      return;
    }

    // File size validation (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-4xl space-y-6">
   <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
      Submit your <AuroraText>Achievement</AuroraText>
    </h1>
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2 className="text-xl font-semibold mb-4">Select Project</h2>
              <p className="text-muted-foreground mb-6">Choose the project you want to award</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Project</label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProjects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Step>
            
            <Step>
              <h2 className="text-xl font-semibold mb-4">Select Competition</h2>
              <p className="text-muted-foreground mb-6">Choose which competition this award is for</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Competition</label>
                <Select value={competitionId} onValueChange={setCompetitionId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a competition" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCompetitions.map(competition => (
                      <SelectItem key={competition.id} value={competition.id}>
                        {competition.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Step>
            
            <Step>
              <h2 className="text-xl font-semibold mb-4">Award Details</h2>
              <p className="text-muted-foreground mb-6">Provide details about the award</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Award Name*</label>
                  <input 
                    type="text"
                    value={awardName}
                    onChange={(e) => setAwardName(e.target.value)}
                    placeholder="e.g., 1st Place / Best UI Designers"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Award Image*</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {!imagePreview ? (
                          <>
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">JPG or PNG (Max. 5MB)</p>
                          </>
                        ) : (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={imagePreview} 
                              alt="Award preview" 
                              className="max-h-28 rounded-lg object-contain" 
                            />
                          </div>
                        )}
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".jpg,.jpeg,.png"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
  
  );
}

export default page