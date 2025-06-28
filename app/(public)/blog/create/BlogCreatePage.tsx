"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, User, FileText, Edit, CheckCircle, Upload, X } from "lucide-react";
import React from "react";
import { ProjectDomainEnum } from "@prisma/client";
import { useCheckAuthor } from "@/hooks/blogs/useCheckAuthor";
import { useCreateAuthor } from "@/hooks/blogs/useCreateAuthor";
import { useCreateBlog } from "@/hooks/blogs/useCreateBlog";
import useUploadImageToBlob from "@/hooks/azure/useUploadImageToBlob";
import { BlogFormData } from "@/types/blog";
import { blogAuthorSchema, blogPostSchema } from "@/validations/blog";
import MarkdownPreview from "@/components/blog/MarkdownPreview";

// Convert ProjectDomainEnum to array for dropdown
const ProjectDomainEnumArray = Object.values(ProjectDomainEnum);

const today = new Date().toISOString().slice(0, 10);

export default function BlogCreatePage() {
  const [step, setStep] = useState(0);  const [formData, setFormData] = useState<BlogFormData>({
    author: {
      email: "",
      name: "",
      avatarUrl: "",
      instagram: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      medium: "",
      website: "",
      found: false,
      verified: false, // Add verification status
    },
    meta: {
      title: "",
      excerpt: "",
      category: "",
      imageUrl: "",
      publishedAt: today,
    },
    content: "",
    featured: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Hooks
  const { checkAuthor, author: foundAuthor, isLoading: checkingAuthor } = useCheckAuthor();
  const { createAuthor, isLoading: creatingAuthor } = useCreateAuthor();
  const { createBlog, isLoading: creatingBlog, success, error: submitError } = useCreateBlog();
  const { uploadImage, isLoading: uploadingImage } = useUploadImageToBlob();
  // Helper functions
  const updateAuthor = (updates: Partial<BlogFormData['author']>) => {
    setFormData(prev => ({
      ...prev,
      author: { ...prev.author, ...updates }
    }));
  };

  const updateMeta = (updates: Partial<BlogFormData['meta']>) => {
    setFormData(prev => ({
      ...prev,
      meta: { ...prev.meta, ...updates }
    }));
  };

  const updateContent = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const updateFeatured = (featured: boolean) => {
    setFormData(prev => ({ ...prev, featured }));
  };

  // Image upload handlers
  const handleImageUpload = async (file: File) => {
    try {
      const url = await uploadImage(file, setUploadProgress);
      updateMeta({ imageUrl: url });
    } catch (error) {
      setErrors(prev => ({ ...prev, imageUrl: "Failed to upload image" }));
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const url = await uploadImage(file, setUploadProgress);
      updateAuthor({ avatarUrl: url });
    } catch (error) {
      setErrors(prev => ({ ...prev, avatarUrl: "Failed to upload avatar" }));
    }
  };  // Step 1: Author Email Verification
  const handleEmailVerification = async () => {
    setErrors({}); // Clear any previous errors
    
    // Validate email format first
    try {
      blogAuthorSchema.pick({ email: true }).parse({ email: formData.author.email });
    } catch (error: any) {
      setErrors({ authorEmail: "Please enter a valid email address" });
      return;
    }

    try {
      const author = await checkAuthor(formData.author.email);
      if (author) {
        updateAuthor({
          name: author.name,
          avatarUrl: author.avatarUrl || "",
          instagram: author.instagram || "",
          twitter: author.twitter || "",
          facebook: author.facebook || "",
          linkedin: author.linkedin || "",
          medium: author.medium || "",
          website: author.website || "",
          found: true,
          verified: true,
        });
      } else {
        updateAuthor({ 
          found: false, 
          verified: true,
          // Reset other fields when creating new author
          name: "",
          avatarUrl: "",
          instagram: "",
          twitter: "",
          facebook: "",
          linkedin: "",
          medium: "",
          website: "",
        });
      }
    } catch (error) {
      setErrors({ authorEmail: "Failed to verify email. Please try again." });
    }
  };

  const handleAuthorRegister = async () => {
    setErrors({});
    
    // Validate author data
    try {
      blogAuthorSchema.parse(formData.author);
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!formData.author.name) {
      setErrors({ authorName: "Name is required" });
      return;
    }

    setStep(1);
  };

  // Check if all required author fields are filled
  const isAuthorFormComplete = () => {
    if (formData.author.found) {
      return true; // If author exists, we're good to go
    }
    // If new author, check required fields
    return formData.author.name.trim() !== "";
  };

  // Step 2: Metadata
  const handleMetaContinue = () => {
    setErrors({});
    
    // Validate metadata
    const newErrors: Record<string, string> = {};
    if (!formData.meta.title) newErrors.title = "Title is required";
    if (!formData.meta.category) newErrors.category = "Category is required";
    if (!formData.meta.excerpt) newErrors.excerpt = "Excerpt is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setStep(2);
  };

  // Step 3: Content
  const handleContentContinue = () => {
    setErrors({});
    
    if (!formData.content) {
      setErrors({ content: "Content is required" });
      return;
    }
    
    setStep(3);
  };

  // Step 4: Submit
  const handleSubmit = async () => {
    setErrors({});
    
    try {
      // Validate all data
      const submissionData = {
        author: {
          name: formData.author.name,
          email: formData.author.email,
          avatarUrl: formData.author.avatarUrl || "",
          instagram: formData.author.instagram || "",
          twitter: formData.author.twitter || "",
          facebook: formData.author.facebook || "",
          linkedin: formData.author.linkedin || "",
          medium: formData.author.medium || "",
          website: formData.author.website || "",
        },
        post: {
          title: formData.meta.title,
          excerpt: formData.meta.excerpt,
          content: formData.content,
          imageUrl: formData.meta.imageUrl || "",
          publishedAt: formData.meta.publishedAt,
          category: formData.meta.category as any, // Type cast for enum
          featured: formData.featured,
        },
      };

      await createBlog(submissionData);
    } catch (error: any) {
      setErrors({ submit: error.message || "Failed to submit blog post" });
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Side illustration panel */}
      <div className="hidden w-1/2 bg-background lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-8">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <div className="ml-3 font-semibold">Blog Creator</div>
          </div>
          <div className="flex flex-1 items-center justify-center p-8">
            {step === 0 && <User className="h-32 w-32 text-primary" />}
            {step === 1 && <FileText className="h-32 w-32 text-primary" />}
            {step === 2 && <Edit className="h-32 w-32 text-primary" />}
            {step === 3 && <CheckCircle className="h-32 w-32 text-primary" />}
          </div>
        </div>
      </div>
      {/* Content panel */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 w-12 rounded-full",
                  i <= step ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            Step {step + 1} of 4
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-12">          {/* Step content */}          {step === 0 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Identify the Author</h1>
              <p className="text-muted-foreground">Enter your email to get started</p>
              <div className="space-y-4">
                <Label htmlFor="author-email">Email</Label>
                <div className="flex space-x-2">                  <Input
                    id="author-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.author.email}
                    onChange={(e) => updateAuthor({ 
                      email: e.target.value, 
                      verified: false,
                      found: false,
                      // Reset author fields when email changes
                      name: "",
                      avatarUrl: "",
                      instagram: "",
                      twitter: "",
                      facebook: "",
                      linkedin: "",
                      medium: "",
                      website: "",
                    })}
                    disabled={formData.author.verified}
                    className="flex-1"
                  />                  {!formData.author.verified ? (
                    <Button 
                      onClick={handleEmailVerification} 
                      disabled={checkingAuthor || !formData.author.email}
                    >
                      {checkingAuthor ? "Verifying..." : "Verify"}
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="secondary" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verified
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateAuthor({ 
                          email: "",
                          verified: false, 
                          found: false,
                          name: "",
                          avatarUrl: "",
                          instagram: "",
                          twitter: "",
                          facebook: "",
                          linkedin: "",
                          medium: "",
                          website: "",
                        })}
                      >
                        Change
                      </Button>
                    </div>
                  )}
                </div>
                {errors.authorEmail && (
                  <p className="text-sm text-red-500">{errors.authorEmail}</p>
                )}
              </div>

              {/* Show verification result */}
              {formData.author.verified && formData.author.found && foundAuthor && (
                <div className="mt-6 p-4 border border-green-200 bg-green-50 rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-800 font-medium">Author Found!</p>
                      <p className="text-green-600 text-sm">We found your existing author profile.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    {foundAuthor.avatarUrl && (
                      <img
                        src={foundAuthor.avatarUrl}
                        alt="avatar"
                        className="h-12 w-12 rounded-full border"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{foundAuthor.name}</div>
                      <div className="text-sm text-muted-foreground">{foundAuthor.email}</div>
                    </div>
                  </div>
                </div>
              )}

              {formData.author.verified && !formData.author.found && (
                <div className="mt-6 p-4 border border-blue-200 bg-blue-50 rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Author Not Found</p>
                      <p className="text-blue-600 text-sm">Please create your author profile below.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Author registration form - only show if verified and not found */}
              {formData.author.verified && !formData.author.found && (
                <div className="mt-6 space-y-4">
                  <h2 className="text-lg font-semibold">Create Author Profile</h2>
                  
                  <Label htmlFor="author-name">Name *</Label>
                  <Input
                    id="author-name"
                    placeholder="Your Name"
                    value={formData.author.name}
                    onChange={(e) => updateAuthor({ name: e.target.value })}
                  />
                  {errors.authorName && (
                    <p className="text-sm text-red-500">{errors.authorName}</p>
                  )}
                  
                  <Label htmlFor="author-avatar">Avatar Image (optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setAvatarFile(file);
                          handleAvatarUpload(file);
                        }
                      }}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && <p className="text-sm">Uploading... {uploadProgress}%</p>}
                  </div>
                  {formData.author.avatarUrl && (
                    <img src={formData.author.avatarUrl} alt="Avatar preview" className="h-16 w-16 rounded-full" />
                  )}
                  
                  <Label htmlFor="author-instagram">Instagram (optional)</Label>
                  <Input
                    id="author-instagram"
                    placeholder="@yourhandle or URL"
                    value={formData.author.instagram}
                    onChange={(e) => updateAuthor({ instagram: e.target.value })}
                  />
                  
                  <Label htmlFor="author-twitter">Twitter (optional)</Label>
                  <Input
                    id="author-twitter"
                    placeholder="@yourhandle or URL"
                    value={formData.author.twitter}
                    onChange={(e) => updateAuthor({ twitter: e.target.value })}
                  />
                  
                  <Label htmlFor="author-linkedin">LinkedIn (optional)</Label>
                  <Input
                    id="author-linkedin"
                    placeholder="LinkedIn URL"
                    value={formData.author.linkedin}
                    onChange={(e) => updateAuthor({ linkedin: e.target.value })}
                  />
                  
                  <Label htmlFor="author-website">Website (optional)</Label>
                  <Input
                    id="author-website"
                    placeholder="https://yourwebsite.com"
                    value={formData.author.website}
                    onChange={(e) => updateAuthor({ website: e.target.value })}
                  />
                </div>
              )}
            </div>
          )}{step === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Blog Metadata</h1>
              <p className="text-muted-foreground">Fill in the details for your blog post</p>
              <div className="space-y-4">
                <Label htmlFor="blog-title">Title *</Label>
                <Input
                  id="blog-title"
                  placeholder="Blog Title"
                  value={formData.meta.title}
                  onChange={(e) => updateMeta({ title: e.target.value })}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                
                <Label htmlFor="blog-excerpt">Excerpt *</Label>
                <Textarea
                  id="blog-excerpt"
                  placeholder="Short summary of your blog"
                  value={formData.meta.excerpt}
                  onChange={(e) => updateMeta({ excerpt: e.target.value })}
                  className="min-h-20"
                />
                {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt}</p>}
                
                <Label htmlFor="blog-category">Category *</Label>
                <select
                  id="blog-category"
                  title="Blog Category"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.meta.category}
                  onChange={(e) => updateMeta({ category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {ProjectDomainEnumArray.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                
                <Label htmlFor="blog-image">Feature Image</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          handleImageUpload(file);
                        }
                      }}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && <p className="text-sm">Uploading... {uploadProgress}%</p>}
                  </div>
                  <Input
                    id="blog-image"
                    placeholder="Or paste image URL"
                    value={formData.meta.imageUrl}
                    onChange={(e) => updateMeta({ imageUrl: e.target.value })}
                  />
                  {formData.meta.imageUrl && (
                    <img src={formData.meta.imageUrl} alt="Feature image preview" className="h-32 rounded" />
                  )}
                </div>
                
                <Label htmlFor="blog-date">Publish Date</Label>
                <Input
                  id="blog-date"
                  type="date"
                  value={formData.meta.publishedAt}
                  onChange={(e) => updateMeta({ publishedAt: e.target.value })}
                />
                
                <Button onClick={handleMetaContinue} className="w-full">
                  Continue
                </Button>
              </div>
            </div>
          )}          {step === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Write Your Blog</h1>
              <p className="text-muted-foreground">Write your content below using Markdown</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="blog-content">Content (Markdown supported) *</Label>
                  <Textarea
                    id="blog-content"
                    placeholder="Write your blog content here... You can use Markdown syntax."
                    value={formData.content}
                    onChange={(e) => updateContent(e.target.value)}
                    className="min-h-[300px] font-mono"
                  />
                  {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                </div>                <div className="border rounded-md bg-background p-4 overflow-auto min-h-[300px]">
                  <div className="font-semibold mb-2">Live Preview</div>
                  <MarkdownPreview content={formData.content} />
                </div>
              </div>
              <Button onClick={handleContentContinue} className="w-full mt-4">
                Save & Continue
              </Button>
            </div>
          )}          {step === 3 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Review & Submit</h1>
              <p className="text-muted-foreground">Review your blog post before submitting</p>
              
              {success && (
                <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                  <p className="text-green-800 font-medium">Blog post submitted successfully!</p>
                  <p className="text-green-600 text-sm">Your blog post has been submitted for review and will be published after approval.</p>
                </div>
              )}
              
              {submitError && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-md">
                  <p className="text-red-800 font-medium">Submission failed</p>
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}
              
              {errors.submit && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-md">
                  <p className="text-red-800 font-medium">Error</p>
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {(formData.author.avatarUrl || foundAuthor?.avatarUrl) && (
                    <img 
                      src={formData.author.avatarUrl || foundAuthor?.avatarUrl || ""} 
                      alt="avatar" 
                      className="h-12 w-12 rounded-full border" 
                    />
                  )}
                  <div>
                    <div className="font-semibold">{formData.author.name || foundAuthor?.name || "(No name)"}</div>
                    <div className="text-sm text-muted-foreground">{formData.author.email}</div>
                    {formData.author.website && (
                      <div className="text-sm text-muted-foreground">Website: {formData.author.website}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold">Title:</div>
                  <div>{formData.meta.title}</div>
                </div>
                
                <div>
                  <div className="font-semibold">Excerpt:</div>
                  <div>{formData.meta.excerpt}</div>
                </div>
                
                <div>
                  <div className="font-semibold">Category:</div>
                  <div>{formData.meta.category.replace(/_/g, ' ')}</div>
                </div>
                
                <div>
                  <div className="font-semibold">Feature Image:</div>
                  {formData.meta.imageUrl && (
                    <img src={formData.meta.imageUrl} alt="feature" className="h-24 rounded mt-2" />
                  )}
                </div>
                
                <div>
                  <div className="font-semibold">Publish Date:</div>
                  <div>{new Date(formData.meta.publishedAt).toLocaleDateString()}</div>
                </div>
                  <div>
                  <div className="font-semibold">Content:</div>
                  <div className="border rounded p-2 bg-background mt-2 max-h-40 overflow-y-auto">
                    <MarkdownPreview content={formData.content} />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="featured"
                    title="Mark as featured"
                    checked={formData.featured}
                    onChange={() => updateFeatured(!formData.featured)}
                  />
                  <Label htmlFor="featured">Mark as featured (admin will review)</Label>
                </div>
                
                <Button 
                  onClick={handleSubmit} 
                  className="w-full mt-4"
                  disabled={creatingBlog || success}
                >
                  {creatingBlog ? "Submitting..." : success ? "Submitted!" : "Submit for review"}
                </Button>
              </div>
            </div>
          )}          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {/* Step 0: Only show Next button if email is verified */}
            {step === 0 && formData.author.verified && (
              <Button
                onClick={() => {
                  if (formData.author.found) {
                    setStep(1); // Go directly to metadata if author exists
                  } else {
                    handleAuthorRegister(); // Create author and proceed
                  }
                }}
                className="flex items-center"
                disabled={!isAuthorFormComplete() || creatingAuthor || uploadingImage}
              >
                {creatingAuthor ? "Creating..." : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            {/* Steps 1-2: Regular Next button */}
            {step > 0 && step < 3 && (
              <Button
                onClick={() => {
                  if (step === 1) {
                    handleMetaContinue();
                  } else if (step === 2) {
                    handleContentContinue();
                  }
                }}
                className="flex items-center"
                disabled={uploadingImage}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
