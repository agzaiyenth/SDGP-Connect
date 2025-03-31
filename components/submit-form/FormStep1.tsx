import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const FormStep1 = () => {
  const { control, setValue } = useFormContext<ProjectSubmissionSchema>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "cover_image" | "logo") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(`metadata.${type}`, file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "cover_image") setPreviewUrl(reader.result as string);
      if (type === "logo") setLogoPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setValue("metadata.cover_image", null, { shouldValidate: true });
    setPreviewUrl(null);
  };

  const clearLogo = () => {
    setValue("metadata.logo", null, { shouldValidate: true });
    setLogoPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Project Basics</h2>

      {/* Row 1: Group Number & SDGP Year */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="metadata.group_num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Number</FormLabel>
              <FormControl>
                <Input placeholder="Eg: CS-27" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="metadata.sdgp_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SDGP Year</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 2: Title */}
      <FormField
        control={control}
        name="metadata.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Project Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Row 3: Subtitle */}
      <FormField
        control={control}
        name="metadata.subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input placeholder="Subtitle (e.g., An AI-powered platform for Dyslexic Students)" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
   

      {/* Row 4: Logo & Cover Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* App Logo */}
        <FormField
          control={control}
          name="metadata.logo"
          render={() => (
            <FormItem>
              <FormLabel>App Logo</FormLabel>
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
                        onChange={(e) => handleImageUpload(e, "logo")}
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
            </FormItem>
          )}
        />

        {/* Cover Image */}
        <FormField
          control={control}
          name="metadata.cover_image"
          render={() => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
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
                        onChange={(e) => handleImageUpload(e, "cover_image")}
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
                      <div className="overflow-hidden relative">
                        <img src={previewUrl} alt="Cover Image" className="object-cover w-full h-full rounded-lg" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <X className="h-8 w-8 text-white" />
                        </div>
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
  );
};

export default FormStep1;
