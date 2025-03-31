'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { PlusCircle, Upload, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProjectSubmissionSchema } from "@/validations/formvalidations";
import { toast } from "sonner";

const MAX_SLIDES = 10;

const FormStep5 = () => {
  const { control, setValue } = useFormContext<ProjectSubmissionSchema>();
  const { fields, append } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const [memberPreviews, setMemberPreviews] = useState<Record<number, string>>({});
  const [slideImagePreviews, setSlideImagePreviews] = useState<string[]>([]);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const handleMemberImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(`teamMembers.${index}.profileImage`, file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onload = () => {
      setMemberPreviews(prev => ({
        ...prev,
        [index]: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    if (slideImagePreviews.length + fileArray.length > MAX_SLIDES) {
      toast.error(`You can only upload a maximum of ${MAX_SLIDES} slides.`);
      return;
    }

    setIsPlaceholderVisible(false);

    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setSlideImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSlideImage = (index: number) => {
    setSlideImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Team & Presentation</h2>
      <p className="text-slate-600 dark:text-slate-400">Add your team members and presentation slides.</p>

      <div className="space-y-4">
        <FormLabel>Team Members</FormLabel>
        <FormDescription>Add all the members who contributed to this project</FormDescription>

        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-1 flex flex-col items-center relative">
                <label htmlFor={`file-upload-${index}`} className="cursor-pointer relative">
                  {!memberPreviews[index] ? (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-full h-24 w-24 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800/50">
                      <UserCircle className="h-14 w-14 text-gray-400" />
                      <input
                        type="file"
                        id={`file-upload-${index}`}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                        accept="image/*"
                        onChange={(e) => handleMemberImageUpload(e, index)}
                      />
                    </div>
                  ) : (
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary">
                      <img src={memberPreviews[index]} alt="Profile" className="w-full h-full object-cover rounded-full" />
                      <button
                        type="button"
                        onClick={() => setMemberPreviews(prev => {
                          const newPreviews = { ...prev };
                          delete newPreviews[index];
                          return newPreviews;
                        })}
                        className="absolute -top-1 -right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </label>
              </div>

              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`teamMembers.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Team member name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`teamMembers.${index}.linkedinUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={() => append({ name: "", linkedinUrl: "", profileImage: null })}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      {/* Slide Upload Section */}
      <FormField
        control={control}
        name="slideImages"
        render={() => (
          <FormItem>
            <FormLabel>Slide Deck</FormLabel>
            <FormDescription>Upload up to {MAX_SLIDES} presentation images</FormDescription>
            
            {isPlaceholderVisible && (
              <div className="relative mt-4 p-6 border-2 border-dashed border-gray-300 rounded-xl w-full cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-all duration-200">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Upload className="h-10 w-10 text-primary mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Drag and drop your slides here or click to browse</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF - Up to {MAX_SLIDES} files</p>
                </div>
                <Input type="file" accept="image/*" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
              {slideImagePreviews.map((previewUrl, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-md border dark:border-gray-700 transition-all hover:shadow-xl">
                  <AspectRatio ratio={16 / 9}>
                    <img src={previewUrl} alt={`Slide ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
                  </AspectRatio>
                  <Button
                    type="button"
                    onClick={() => removeSlideImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormStep5;
