import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { Upload, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from 'markdown-to-jsx';
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

const MAX_SLIDES = 10;

const FormStep2 = () => {
  const { control, setValue, watch } = useFormContext<ProjectSubmissionSchema>();
  const features = watch("projectDetails.features") || "";
  const [slideImagePreviews, setSlideImagePreviews] = useState<string[]>([]);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  useEffect(() => {
    // Initialize slides array if it doesn't exist
    if (!watch("slides")) {
      setValue("slides", []);
    }
  }, [setValue, watch]);

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
        const result = reader.result as string;
        setSlideImagePreviews(prev => [...prev, result]);
        
        // Update slides in form data
        setValue("slides", [
          ...(watch("slides") || []),
          { slides_content: result }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSlideImage = (index: number) => {
    setSlideImagePreviews(prev => prev.filter((_, i) => i !== index));
    
    // Update slides in form data
    const currentSlides = [...(watch("slides") || [])];
    currentSlides.splice(index, 1);
    setValue("slides", currentSlides);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Project Details</h2>
      
      {/* Problem Statement */}
      <FormField
        control={control}
        name="projectDetails.problem_statement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Problem Statement</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What problem does your project solve?" 
                className="min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Solution */}
      <FormField
        control={control}
        name="projectDetails.solution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Solution</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="How does your project solve the problem?" 
                className="min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Features with Markdown */}
      <FormField
        control={control}
        name="projectDetails.features"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Features</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormControl>
                  <Textarea
                    placeholder="Use Markdown: 
# Heading
- Bullet Point"
                    className="min-h-[300px] font-mono"
                    {...field}
                  />
                </FormControl>
              </div>
              <div className="border rounded-md p-4 min-h-[300px] prose prose-zinc dark:prose-invert bg-zinc-50 dark:bg-zinc-900 overflow-auto">
              <Markdown options={{
    overrides: {
      h1: { props: { className: 'text-2xl font-bold mb-4' } },
      h2: { props: { className: 'text-xl font-bold mb-3' } },
      h3: { props: { className: 'text-lg font-bold mb-2' } },
      p: { props: { className: 'mb-4' } },
      ul: { props: { className: 'list-disc pl-6 mb-4' } },
      ol: { props: { className: 'list-decimal pl-6 mb-4' } },
      li: { props: { className: 'mb-1' } }
      
    }
  }}>
    {features || "*Your markdown preview will appear here...*"}
  </Markdown>
</div>
            </div>
            <FormDescription>Describe your project's key features using Markdown</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

     

      {/* Slide Upload Section */}
      <FormField
        control={control}
        name="slides"
        render={() => (
          <FormItem>
            <FormLabel>Featured Images</FormLabel>
            <div className="relative mt-4 p-6 border-2 border-dashed border-gray-300 rounded-xl w-full cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-all duration-200">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <Upload className="h-10 w-10 text-primary mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Drag and drop your Featured Images here or click to browse</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF - Up to {MAX_SLIDES} files</p>
                <Input type="file" accept="image/*" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>

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
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormStep2;
