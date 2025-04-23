'use client'
import { Dispatch, SetStateAction } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { validateImageFile } from "./utils/validateImageFile";
import { toast } from "sonner";

interface FormStep5Props {
  teamProfileFiles: (File|null)[];
  setTeamProfileFiles: React.Dispatch<React.SetStateAction<(File|null)[]>>;
  teamProfilePreviews: (string|null)[];
  setTeamProfilePreviews: React.Dispatch<React.SetStateAction<(string|null)[]>>;
}

const FormStep5 = ({
  teamProfileFiles,
  setTeamProfileFiles,
  teamProfilePreviews,
  setTeamProfilePreviews
}: FormStep5Props) => {
  const { control, setValue, watch } = useFormContext<ProjectSubmissionSchema>();
  const { fields: teamFields, append: appendTeam, remove: removeTeam } = useFieldArray({
    control,
    name: "team",
  });

  // Add a new team member
  const addTeamMember = () => {
    appendTeam({ name: "", linkedin_url: "", profile_image: null });
    setTeamProfileFiles((prev) => [...prev, null]);
    setTeamProfilePreviews((prev) => [...prev, null]);
  };

  // Remove a team member
  const handleRemoveTeam = (index: number) => {
    removeTeam(index);
    setTeamProfileFiles((prev) => prev.filter((_, i) => i !== index));
    setTeamProfilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle profile image upload
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const error = validateImageFile(file);
    if (error) {
      setTeamProfilePreviews((prev) => {
        const arr = [...prev];
        arr[index] = null;
        return arr;
      });
      setTeamProfileFiles((prev) => {
        const arr = [...prev];
        arr[index] = null;
        return arr;
      });
      return toast.error(error);
    }
    const reader = new FileReader();
    reader.onload = () => {
      setTeamProfilePreviews((prev) => {
        const arr = [...prev];
        arr[index] = reader.result as string;
        return arr;
      });
      setTeamProfileFiles((prev) => {
        const arr = [...prev];
        arr[index] = file;
        return arr;
      });
    };
    reader.readAsDataURL(file);
  };

  // Clear profile image
  const clearProfileImage = (index: number) => {
    setValue(`team.${index}.profile_image`, null, { shouldValidate: true });
    setTeamProfilePreviews((prev) => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
    });
    setTeamProfileFiles((prev) => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
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
                onClick={() => handleRemoveTeam(index)}
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
                        {!teamProfilePreviews[index] ? (
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
                                src={teamProfilePreviews[index] || ""} 
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
    </div>
  );
};

export default FormStep5;
