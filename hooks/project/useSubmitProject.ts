import { useState } from 'react';
import axios from 'axios';
import { ProjectSubmissionSchema } from '@/validations/submit_project';
import useUploadImageToBlob from '../useUploadImageToBlob';
import { SubmitProjectResponse } from '@/types/project/response';

export const useSubmitProject = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { uploadImage, isLoading: isUploadingImages } = useUploadImageToBlob();

  // Helper to sanitize the submission data to ensure it's JSON serializable
  const sanitizeSubmissionData = (data: any): any => {
    if (data === null || data === undefined) {
      return data;
    }
    
    if (typeof data !== 'object') {
      return data;
    }
    
    // Handle File objects
    if (data instanceof File) {
      return null; // Files should already be uploaded and URLs stored instead
    }
    
    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => sanitizeSubmissionData(item));
    }
    
    // Handle objects
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = sanitizeSubmissionData(value);
    }
    
    return result;
  };

  const submitProject = async (data: ProjectSubmissionSchema): Promise<SubmitProjectResponse> => {
    setError(null);
    setIsSubmitting(true);
    
    // Clone the data to avoid modifying the original
    let submissionData = { ...data };
    
    try {
      // Handle image uploads - Cover Image
      if (data.metadata.cover_image && data.metadata.cover_image instanceof File) {
        try {
          const coverImageUrl = await uploadImage(data.metadata.cover_image);
          submissionData.metadata.cover_image = coverImageUrl;
        } catch (err) {
          console.error('Error uploading cover image:', err);
          submissionData.metadata.cover_image = null;
        }
      }
      
      // Handle image uploads - Logo
      if (data.metadata.logo && data.metadata.logo instanceof File) {
        try {
          const logoUrl = await uploadImage(data.metadata.logo);
          submissionData.metadata.logo = logoUrl;
        } catch (err) {
          console.error('Error uploading logo:', err);
          submissionData.metadata.logo = null;
        }
      }
      
      // Handle team member profile images
      if (data.team && data.team.length > 0) {
        const updatedTeam = await Promise.all(
          data.team.map(async (member:any) => {
            if (member.profile_image && member.profile_image instanceof File) {
              try {
                const profileImageUrl = await uploadImage(member.profile_image);
                return { ...member, profile_image: profileImageUrl };
              } catch (err) {
                console.error('Error uploading profile image:', err);
                return { ...member, profile_image: null };
              }
            }
            return member;
          })
        );
        
        submissionData.team = updatedTeam;
      }
      
      // Handle slides content - ensure it's properly formatted
      if (submissionData.slides && submissionData.slides.length > 0) {
        submissionData.slides = submissionData.slides.map((slide: any) => {
          // If slides_content is a DataURL (likely from an image), extract just the URL for storage
          let processedContent = slide.slides_content;
          if (typeof slide.slides_content === 'string' && 
              slide.slides_content.length > 65535) {
            // Truncate if too long for database
            processedContent = slide.slides_content.substring(0, 65535);
          }
          return { ...slide, slides_content: processedContent };
        });
      }
      
      // Final sanitization to ensure data is JSON serializable
      const sanitizedData = sanitizeSubmissionData(submissionData);
      
      try {
        // Submit to API using axios
        const response = await axios.post<SubmitProjectResponse>('/api/projects/submit', sanitizedData);
        setIsSubmitting(false);
        return response.data;
      } catch (err: any) {
        setIsSubmitting(false);
        
        const errorMessage = err.response?.data?.message || 'Failed to submit project';
        const errorDetails = err.response?.data?.error || '';
        
        const error = new Error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ''}`);
        setError(error);
        
        console.error('API Error:', err.response?.data);
        
        return {
          success: false,
          message: errorMessage,
          errors: err.response?.data?.errors
        };
      }
    } catch (err) {
      setIsSubmitting(false);
      const error = err instanceof Error ? err : new Error('Unknown error occurred during submission');
      setError(error);
      console.error("Submission error:", error);
      
      return {
        success: false,
        message: error.message || 'Project submission failed',
      };
    }
  };
  
  return {
    submitProject,
    isSubmitting: isSubmitting || isUploadingImages,
    error
  };
};

export default useSubmitProject;