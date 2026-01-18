"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Upload, 
  Camera,
  MapPin,
  Type,
  FileText,
  Loader2,
  RefreshCw,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Users,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface Photo {
  id: number;
  title: string;
  location: string;
  description: string;
  cloudinary_url: string;
  cloudinary_public_id: string;
  size: "normal" | "tall" | "wide";
  width: number;
  height: number;
}

export default function PhotographyAdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Analytics state
  const [analytics, setAnalytics] = useState({
    uniqueVisitors: 0,
    todayVisitors: 0,
    weekVisitors: 0,
    totalViews: 0,
  });
  
  // Photo state
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    location: "",
    description: "",
    image: "",
  });

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch photos and analytics when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPhotos();
      fetchAnalytics();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify");
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        const data = await response.json();
        setAuthError(data.error || "Invalid password");
      }
    } catch {
      setAuthError("Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setPhotos([]);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics");
      if (response.ok) {
        const data = await response.json();
        setAnalytics({
          uniqueVisitors: data.uniqueVisitors || 0,
          todayVisitors: data.todayVisitors || 0,
          weekVisitors: data.weekVisitors || 0,
          totalViews: data.totalViews || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/photos");
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Just store the file for later upload
      setNewPhoto({ ...newPhoto, image: file as unknown as string });
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinaryDirect = async (file: File) => {
    // Get signature from our API
    const sigResponse = await fetch('/api/cloudinary-signature');
    const { signature, timestamp, cloudName, apiKey } = await sigResponse.json();
    
    // Upload directly to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', apiKey);
    formData.append('folder', 'photography');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );
    
    if (!response.ok) {
      throw new Error('Failed to upload to Cloudinary');
    }
    
    return response.json();
  };

  const handleAddPhoto = async () => {
    if (!newPhoto.title || !newPhoto.image) return;
    
    try {
      setUploading(true);
      
      // Upload directly to Cloudinary first
      const cloudinaryResult = await uploadToCloudinaryDirect(newPhoto.image as unknown as File);
      
      // Then save metadata to our database
      const response = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPhoto.title,
          location: newPhoto.location,
          description: newPhoto.description,
          cloudinary_url: cloudinaryResult.secure_url,
          cloudinary_public_id: cloudinaryResult.public_id,
          width: cloudinaryResult.width,
          height: cloudinaryResult.height,
        }),
      });
      
      if (response.ok) {
        const photo = await response.json();
        setPhotos([photo, ...photos]);
        setNewPhoto({ title: "", location: "", description: "", image: "" });
        setPreviewImage(null);
        setIsAddDialogOpen(false);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add photo");
      }
    } catch (error) {
      console.error("Error adding photo:", error);
      alert("Failed to add photo");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdatePhoto = async () => {
    if (!editingPhoto) return;
    
    try {
      const response = await fetch("/api/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPhoto.id,
          title: editingPhoto.title,
          location: editingPhoto.location,
          description: editingPhoto.description,
          size: editingPhoto.size,
        }),
      });
      
      if (response.ok) {
        const updatedPhoto = await response.json();
        setPhotos(photos.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
        setEditingPhoto(null);
      }
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    
    try {
      const response = await fetch(`/api/photos?id=${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setPhotos(photos.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  // Auth loading state
  if (authLoading) {
    return (
      <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-32 right-[10%] w-2 h-2 rounded-full bg-blue-500/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 left-[15%] w-3 h-3 rounded-full bg-blue-500/20"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="max-w-md mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
                  <p className="text-muted-foreground text-sm">
                    Enter password to manage photos
                  </p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {authError && (
                    <p className="text-destructive text-sm text-center">{authError}</p>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={loginLoading || !password}>
                    {loginLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Login
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    );
  }

  // Admin dashboard (authenticated)
  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-32 right-[10%] w-2 h-2 rounded-full bg-blue-500/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-[15%] w-3 h-3 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Photography Admin</h1>
              <p className="text-muted-foreground">
                Manage your photography portfolio
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={fetchPhotos} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              
              {/* Add Photo Button */}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Photo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Add New Photo
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        {previewImage ? (
                          <div className="relative w-full h-40">
                            <Image
                              src={previewImage}
                              alt="Preview"
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p>Click to select an image</p>
                            <p className="text-xs mt-1">Supports JPG, PNG, WebP</p>
                            <p className="text-xs text-primary mt-2">Size is auto-detected from image</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Title
                      </label>
                      <Input
                        placeholder="Photo title"
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </label>
                      <Input
                        placeholder="City, Country"
                        value={newPhoto.location}
                        onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Description
                      </label>
                      <Textarea
                        placeholder="Brief description of the photo"
                        value={newPhoto.description}
                        onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddDialogOpen(false);
                          setPreviewImage(null);
                          setNewPhoto({ title: "", location: "", description: "", image: "" });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddPhoto} 
                        disabled={!newPhoto.title || !newPhoto.image || uploading}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Photo
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
              </div>
              <p className="text-3xl font-bold text-primary">{analytics.uniqueVisitors}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
              <p className="text-3xl font-bold text-primary">{analytics.todayVisitors}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-blue-500" />
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
              <p className="text-3xl font-bold text-primary">{analytics.weekVisitors}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Camera className="w-4 h-4 text-purple-500" />
                <p className="text-sm text-muted-foreground">Total Photos</p>
              </div>
              <p className="text-3xl font-bold text-primary">{photos.length}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Photo Grid Preview */}
        {!loading && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Gallery Preview</h2>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group rounded-lg overflow-hidden bg-muted/30 border border-border/50 break-inside-avoid"
                >
                  {/* Image with natural aspect ratio */}
                  <Image
                    src={photo.cloudinary_url}
                    alt={photo.title}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  
                  {/* Edit/Delete buttons */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-7 w-7"
                      onClick={() => setEditingPhoto(photo)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-7 w-7"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Info */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium text-white truncate w-full">{photo.title}</span>
                    <span className="text-xs text-white/70">{photo.size} • {photo.width}×{photo.height}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Photo List */}
        {!loading && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">All Photos</h2>
            <div className="space-y-3">
              {photos.map((photo) => (
                <Card key={photo.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    {editingPhoto?.id === photo.id ? (
                      /* Edit Mode */
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            value={editingPhoto.title}
                            onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                            placeholder="Title"
                          />
                          <Input
                            value={editingPhoto.location}
                            onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                            placeholder="Location"
                          />
                        </div>
                        <Textarea
                          value={editingPhoto.description}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                          placeholder="Description"
                          rows={2}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingPhoto(null)}>
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleUpdatePhoto}>
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={photo.cloudinary_url}
                              alt={photo.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">{photo.title}</h3>
                            {photo.location && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {photo.location}
                              </p>
                            )}
                            {photo.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                {photo.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {photo.size} • {photo.width}×{photo.height}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setEditingPhoto(photo)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeletePhoto(photo.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && photos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Camera className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No photos yet</p>
            <p className="text-muted-foreground text-sm mt-2">
              Click &quot;Add Photo&quot; to upload your first photo
            </p>
          </motion.div>
        )}

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-xl bg-muted/30 border border-border/50"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            System Status
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>✅ PostgreSQL database connected</li>
            <li>✅ Cloudinary image storage active</li>
            <li>✅ Visitor analytics tracking enabled</li>
            <li>✅ Auto card sizing based on image dimensions</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border/50">
            <h4 className="font-medium text-sm mb-2 text-muted-foreground">Pinterest Integration</h4>
            <p className="text-xs text-muted-foreground">
              To sync Pinterest posts, add your Pinterest API credentials to <code className="text-primary">.env.local</code>:
              <br />
              <code className="text-xs text-muted-foreground/70">PINTEREST_ACCESS_TOKEN=your_token</code>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
