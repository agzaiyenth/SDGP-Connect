
'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2, Upload, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProjectSubmissionSchema } from "@/data/schemas/Project";

const FormStep5 = () => {
  const { control, setValue } = useFormContext<ProjectSubmissionSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });
  
  const [memberPreviews, setMemberPreviews] = useState<Record<number, string>>({});
  const [slideImagePreviews, setSlideImagePreviews] = useState<string[]>([]);
  
  const handleMemberImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setValue(`teamMembers.${index}.profileImage`, file, { shouldValidate: true });
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setMemberPreviews(prev => ({
        ...prev,
        [index]: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const clearMemberImage = (index: number) => {
    setValue(`teamMembers.${index}.profileImage`, null, { shouldValidate: true });
    setMemberPreviews(prev => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };
  
  const handleSlideImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Convert FileList to Array
    const fileArray = Array.from(files);
    
    // Fix: Update form value by directly using an array instead of a callback
    setValue("slideImages", fileArray, { shouldValidate: true });
    
    // Create previews
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setSlideImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeSlideImage = (index: number) => {
    // Fix: Get the current value and then filter it
    const currentSlideImages = control._formValues.slideImages || [];
    const updatedSlideImages = currentSlideImages.filter((_: any, i: number) => i !== index);
    
    // Set the new array directly
    setValue("slideImages", updatedSlideImages, { shouldValidate: true });
    
    setSlideImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Team & Presentation
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        Add your team members and presentation slides.
      </p>

      <div className="space-y-4">
        <FormLabel>Team Members</FormLabel>
        <FormDescription>
          Add all the members who contributed to this project
        </FormDescription>
        
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="p-4 border rounded-lg space-y-4 relative"
          >
            <div className="absolute top-4 right-4">
              {index > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-1 flex flex-col items-center">
                <FormField
                  control={control}
                  name={`teamMembers.${index}.profileImage`}
                  render={({ field: { value, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="text-center block">Profile Image</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-center">
                          {!memberPreviews[index] ? (
                            <div className="relative border-2 border-dashed border-gray-300 rounded-full h-24 w-24 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800/50">
                              <UserCircle className="h-14 w-14 text-gray-400" />
                              <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                                accept="image/*"
                                onChange={(e) => handleMemberImageUpload(e, index)}
                                {...fieldProps}
                              />
                            </div>
                          ) : (
                            <div className="relative">
                              <Avatar className="h-24 w-24 border-2 border-primary">
                                <AvatarImage src={memberPreviews[index]} alt="Profile" />
                                <AvatarFallback>{field.name?.charAt(0) || "U"}</AvatarFallback>
                              </Avatar>
                              <button
                                type="button"
                                onClick={() => clearMemberImage(index)}
                                className="absolute -top-1 -right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <Input 
                          placeholder="https://linkedin.com/in/username" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => append({ name: "", linkedinUrl: "", profileImage: null })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <FormField
        control={control}
        name="slideImages"
        render={({ field: { value, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Slide Deck</FormLabel>
            <FormDescription>
              Upload up to 10 presentation images
            </FormDescription>
            <FormControl>
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800/50">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Drag and drop slide images or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    PNG, JPG or GIF (max 10 slides)
                  </p>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    multiple
                    onChange={handleSlideImageUpload}
                    disabled={slideImagePreviews.length >= 10}
                    {...fieldProps}
                  />
                </div>
                
                {slideImagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {slideImagePreviews.map((previewUrl, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={previewUrl} 
                            alt={`Slide ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <Button
                          type="button"
                          onClick={() => removeSlideImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm py-1 px-2 text-center">
                          Slide {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormStep5;
