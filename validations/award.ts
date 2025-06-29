import { z } from 'zod';

export const awardSubmissionSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  competitionId: z.string().min(1, 'Competition is required'),
  awardName: z.string().min(1, 'Award name is required').max(25, 'Award name must be 25 words or less'),
  imageFile: z
    .instanceof(File)
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
      message: 'Image must be JPG or PNG',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Image size must be less than 5MB',
    }),
});

export type AwardSubmissionInput = z.infer<typeof awardSubmissionSchema>;
