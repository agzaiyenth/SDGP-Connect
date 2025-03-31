'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

const FormStep5 = () => {
  const { control, setValue } = useFormContext<ProjectSubmissionSchema>();
  const [profilePreviews, setProfilePreviews] = useState<Record<number, string>>({});
  
  const { fields: teamFields, append: appendTeam, remove: removeTeam } = useFieldArray({
    control,
    name: "team",
  });

  const { fields: slideFields, append: appendSlide, remove: removeSlide } = useFieldArray({
    control, 
    name: "slides"
  });

  // Add a new team member
  const addTeamMember = () => {
    appendTeam({ name: "", linkedin_url: "", profile_image: null });
  };

  // Add a new slide
  const addSlide = () => {
    appendSlide({ slides_content: "" });
  };

  // Handle profile image upload
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(`team.${index}.profile_image`, file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePreviews(prev => ({
        ...prev,
        [index]: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  // Clear profile image
  const clearProfileImage = (index: number) => {
    setValue(`team.${index}.profile_image`, null, { shouldValidate: true });
    setProfilePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Team & Resources
      </h2>

      {/* Team Members */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel className="text-base">Team Members</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTeamMember}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        {teamFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">Team Member {index + 1}</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeTeam(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-[1fr_1fr] gap-4">
              <div className="space-y-4">
                {/* Name */}
                <FormField
                  control={control}
                  name={`team.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn URL */}
                <FormField
                  control={control}
                  name={`team.${index}.linkedin_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Profile Image */}
              <FormField
                control={control}
                name={`team.${index}.profile_image`}
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Photo (optional)</FormLabel>
                    <div className="flex justify-center">
                      <AnimatePresence>
                        {!profilePreviews[index] ? (
                          <motion.label
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-full h-32 w-32 cursor-pointer dark:border-zinc-600"
                          >
                            <Upload className="h-8 w-8 text-zinc-400 mb-2" />
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProfileImageUpload(e, index)}
                              className="hidden"
                            />
                          </motion.label>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => clearProfileImage(index)}
                            className="relative flex justify-center cursor-pointer group"
                          >
                            <Avatar className="h-32 w-32 border-2 border-primary">
                              <AvatarImage 
                                src={profilePreviews[index]} 
                                alt="Team member profile" 
                              />
                              <AvatarFallback>
                                {field.name.split(' ').map(name => name[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <X className="h-8 w-8 text-white" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {teamFields.length === 0 && (
          <p className="text-sm text-muted-foreground">No team members added yet.</p>
        )}
      </div>

      {/* Slides */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel className="text-base">Project Slides</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSlide}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Slide
          </Button>
        </div>

        {slideFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">Slide {index + 1}</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSlide(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <FormField
              control={control}
              name={`slides.${index}.slides_content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your slide content..."
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {slideFields.length === 0 && (
          <p className="text-sm text-muted-foreground">No slides added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FormStep5;
