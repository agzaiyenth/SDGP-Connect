'use client'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectSubmissionSchema } from "@/data/schemas/Project";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ReactMarkdown from 'react-markdown';

const FormStep2 = () => {
  const { control, setValue, watch } = useFormContext<ProjectSubmissionSchema>();
  const coverImage = watch("coverImage");
  const appLogo = watch("appLogo");
  const features = watch("features") || "";
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setValue("coverImage", file, { shouldValidate: true });
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setValue("appLogo", file, { shouldValidate: true });
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    setValue("coverImage", null, { shouldValidate: true });
    setPreviewUrl(null);
  };
  
  const clearLogo = () => {
    setValue("appLogo", null, { shouldValidate: true });
    setLogoPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Media & Features
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        Upload visual content and describe your project's key features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="appLogo"
          render={({ field: { value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>App Logo</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!logoPreviewUrl ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full h-36 w-36 mx-auto cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800/50">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 dark:text-gray-500 text-center px-2">
                        1:1 Logo
                      </p>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        {...fieldProps}
                      />
                    </div>
                  ) : (
                    <div className="relative flex justify-center">
                      <Avatar className="h-36 w-36 border-2 border-primary">
                        <AvatarImage 
                          src={logoPreviewUrl} 
                          alt="App logo" 
                          className="object-cover" 
                        />
                        <AvatarFallback>LOGO</AvatarFallback>
                      </Avatar>
                      <Button
                        type="button"
                        onClick={clearLogo}
                        className="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-center mt-2">
                Upload a square logo for your app/project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="coverImage"
          render={({ field: { value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!previewUrl ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800/50">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Drag and drop your cover image here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PNG, JPG or GIF up to 5MB
                      </p>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleImageUpload}
                        {...fieldProps}
                      />
                    </div>
                  ) : (
                    <Card className="overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={previewUrl} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Card>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                This image will be displayed as the main visual for your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="demoVideo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Demo Video</FormLabel>
            <FormControl>
              <Input 
                placeholder="Paste YouTube or video URL" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Add a link to a video demonstrating your project (YouTube, Vimeo, etc.)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="features"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Features</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Editor</p>
                <FormControl>
                  <Textarea 
                    placeholder="List the key features of your project using Markdown" 
                    className="min-h-[300px] font-mono" 
                    {...field} 
                  />
                </FormControl>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Preview</p>
                <div className="border rounded-md p-4 min-h-[300px] prose prose-slate dark:prose-invert max-w-none overflow-auto bg-white dark:bg-slate-950">
                  {features ? (
                    <ReactMarkdown>{features}</ReactMarkdown>
                  ) : (
                    <p className="text-slate-400 italic">Your markdown preview will appear here...</p>
                  )}
                </div>
              </div>
            </div>
            <FormDescription className="mt-2">
              Describe your project's key features using Markdown formatting
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormStep2;
