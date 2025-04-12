import { useState } from 'react';
import axios from 'axios';
import { ProjectSubmissionSchema } from '@/validations/submit_project';
import useUploadImageToBlob from '../azure/useUploadImageToBlob';
import { SubmitProjectResponse } from '@/types/project/response';

export const useSubmitProject = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
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

  /**
   * Helper function to handle a single image upload
   */
  const handleImageUpload = async (
    image: File | string | null | undefined,
    identifier: string
  ): Promise<string | null> => {
    if (!image || typeof image === 'string') {
      return image as string | null;
    }
    
    if (!(image instanceof File)) {
      return null;
    }
    
    try {
      setUploadProgress(prev => ({ ...prev, [identifier]: 0 }));
      
      // Track progress (if your uploadImage function supports progress tracking)
      const updateProgress = (progress: number) => {
        setUploadProgress(prev => ({ ...prev, [identifier]: progress }));
      };
      
      const imageUrl = await uploadImage(image);
      
      setUploadProgress(prev => ({ ...prev, [identifier]: 100 }));
      return imageUrl;
    } catch (err) {
      console.error(`Error uploading image (${identifier}):`, err);
      setUploadProgress(prev => ({ ...prev, [identifier]: -1 })); // -1 indicates error
      return null;
    }
  };

  const submitProject = async (data: ProjectSubmissionSchema): Promise<SubmitProjectResponse> => {
    setError(null);
    setIsSubmitting(true);
    setUploadProgress({});
    
    // Clone the data to avoid modifying the original
    let submissionData = JSON.parse(JSON.stringify(data));
    
    try {
      // Create an array to store all image upload promises
      const uploadPromises: Promise<void>[] = [];
      
      // Handle cover image
      if (data.metadata?.cover_image && data.metadata.cover_image instanceof File) {
        const coverImagePromise = handleImageUpload(data.metadata.cover_image, 'cover_image')
          .then(url => {
            submissionData.metadata.cover_image = url;
          });
        uploadPromises.push(coverImagePromise);
      }
      
      // Handle logo image
      if (data.metadata?.logo && data.metadata.logo instanceof File) {
        const logoPromise = handleImageUpload(data.metadata.logo, 'logo')
          .then(url => {
            submissionData.metadata.logo = url;
          });
        uploadPromises.push(logoPromise);
      }
      
      // Handle team member profile images
      if (data.team && data.team.length > 0) {
        data.team.forEach((member: any, index: number) => {
          if (member.profile_image && member.profile_image instanceof File) {
            const memberImagePromise = handleImageUpload(
              member.profile_image, 
              `team_member_${index}`
            ).then(url => {
              submissionData.team[index].profile_image = url;
            });
            uploadPromises.push(memberImagePromise);
          }
        });
      }
      
      // Handle slides that might contain images
      if (data.slides && data.slides.length > 0) {
        data.slides.forEach((slide: any, index: number) => {
          // Check if slides_content is a File (for image slides)
          if (slide.slides_content instanceof File) {
            const slideImagePromise = handleImageUpload(
              slide.slides_content,
              `slide_${index}`
            ).then(url => {
              submissionData.slides[index].slides_content = url;
            });
            uploadPromises.push(slideImagePromise);
          } else if (typeof slide.slides_content === 'string' && 
                    slide.slides_content.length > 65535) {
            // Truncate if too long for database
            submissionData.slides[index].slides_content = slide.slides_content.substring(0, 65535);
          }
        });
      }
      
      // Wait for all image uploads to complete
      await Promise.all(uploadPromises);
      
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
    uploadProgress,
    error
  };
};

export default useSubmitProject;