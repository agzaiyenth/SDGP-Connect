'use client'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectSubmissionSchema } from "@/validations/formvalidations";
import { AnimatePresence, motion } from 'framer-motion';
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Markdown from 'markdown-to-jsx';

const FormStep2 = () => {
  const { control, setValue, watch } = useFormContext<ProjectSubmissionSchema>();
  const features = watch("features") || "";
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "coverImage" | "appLogo") => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setValue(type, file, { shouldValidate: true });
    
    const reader = new FileReader();
    reader.onload = () => {
      if (type === "coverImage") setPreviewUrl(reader.result as string);
      if (type === "appLogo") setLogoPreviewUrl(reader.result as string);
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
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Media & Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="appLogo"
          render={() => (
            <FormItem>
              <FormLabel>App Logo</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <AnimatePresence>
                    {!logoPreviewUrl ? (
                      <motion.label 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-full h-36 w-36 mx-auto cursor-pointer dark:border-zinc-600"
                      >
                        <Upload className="h-10 w-10 text-zinc-400 mb-2" />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "appLogo")}
                          className="hidden"
                        />
                      </motion.label>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={clearLogo}
                        className="relative flex justify-center cursor-pointer group"
                      >
                        <Avatar className="h-36 w-36 border-2 border-primary rounded-full">
                          <AvatarImage src={logoPreviewUrl} alt="App logo" />
                          <AvatarFallback>LOGO</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <X className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FormControl>
              <FormDescription>Upload a square logo for your app/project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover Image Upload */}
        <FormField
          control={control}
          name="coverImage"
          render={() => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <AnimatePresence>
                    {!previewUrl ? (
                      <motion.label
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-lg p-6 cursor-pointer dark:border-zinc-600"
                      >
                        <Upload className="h-10 w-10 text-zinc-400 mb-2" />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "coverImage")}
                          className="hidden"
                        />
                      </motion.label>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={clearImage}
                        className="relative cursor-pointer group"
                      >
                        <Card className="overflow-hidden relative">
                          <AspectRatio ratio={16 / 9}>
                            <img src={previewUrl} alt="Cover preview" className="object-cover w-full h-full" />
                          </AspectRatio>
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <X className="h-8 w-8 text-white" />
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FormControl>
              <FormDescription>This image will be displayed as the main visual for your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Markdown Features Section */}
      <FormField
        control={control}
        name="features"
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
    </div>
  );
};

export default FormStep2;
