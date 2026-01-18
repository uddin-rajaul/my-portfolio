"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Upload, 
  FileText,
  Loader2,
  Lock,
  LogOut,
  Eye,
  EyeOff
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";

interface Blog {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  read_time: string;
  published_at: string;
}

export default function BlogAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  
  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            fetchBlogs();
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        fetchBlogs();
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      
      let title = currentBlog.title || "";
      let content = text;
      
      const titleMatch = text.match(/^#\s+(.+)$/m);
      if (titleMatch && !title) {
        title = titleMatch[1];
      }

      setCurrentBlog(prev => ({
        ...prev,
        content: content,
        title: title,
        slug: !isEditing && title ? generateSlug(title) : prev.slug
      }));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (!currentBlog.title || !currentBlog.slug || !currentBlog.content) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoadingSubmit(true);
    try {
      const url = isEditing ? `/api/blogs/${currentBlog.id}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      // Ensure tags is array
      let formattedTags = currentBlog.tags;
      if (typeof currentBlog.tags === 'string') {
          // @ts-ignore
          formattedTags = currentBlog.tags.split(",").map(t => t.trim());
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentBlog,
          tags: formattedTags
        }),
      });

      if (res.ok) {
        setIsDialogOpen(false);
        fetchBlogs();
        setCurrentBlog({});
        setIsEditing(false);
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog", error);
      alert("Error saving blog");
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        fetchBlogs();
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  const openEditDialog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setCurrentBlog({
      tags: [],
      read_time: "5 min read"
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h1 className="text-2xl font-bold">Admin Access</h1>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Management</h1>
                <div className="flex gap-4">
                    <Button onClick={openNewDialog}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Post
                    </Button>
                    <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {blogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                                    <p className="text-sm text-muted-foreground mb-4">{blog.description}</p>
                                    <div className="flex gap-2 mb-4">
                                        {blog.tags && blog.tags.map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span>Slug: {blog.slug}</span>
                                        <span>Read Time: {blog.read_time}</span>
                                        <span>Published: {new Date(blog.published_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(blog)}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(blog.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {blogs.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No blog posts found. Create one to get started!
                    </div>
                )}
            </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Post" : "New Post"}</DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input 
                                value={currentBlog.title || ""} 
                                onChange={(e) => {
                                  const title = e.target.value;
                                  setCurrentBlog({
                                    ...currentBlog, 
                                    title,
                                    slug: !isEditing ? generateSlug(title) : currentBlog.slug
                                  });
                                }}
                                placeholder="Post Title"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <Input 
                                value={currentBlog.slug || ""} 
                                onChange={(e) => setCurrentBlog({...currentBlog, slug: e.target.value})}
                                placeholder="post-url-slug"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input 
                             value={currentBlog.description || ""} 
                             onChange={(e) => setCurrentBlog({...currentBlog, description: e.target.value})}
                             placeholder="Short description for the card"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Read Time</label>
                            <Input 
                                value={currentBlog.read_time || ""} 
                                onChange={(e) => setCurrentBlog({...currentBlog, read_time: e.target.value})}
                                placeholder="e.g. 5 min read"
                            />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Tags (comma separated)</label>
                            <Input 
                                value={Array.isArray(currentBlog.tags) ? currentBlog.tags.join(", ") : currentBlog.tags || ""} 
                                onChange={(e) => setCurrentBlog({...currentBlog, tags: e.target.value.split(",").map((s: string) => s.trim())})}
                                placeholder="React, Next.js, Tutorial"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                             <label className="text-sm font-medium">Content</label>
                             <div className="flex items-center gap-2">
                                <label htmlFor="md-upload" className="text-xs flex items-center gap-1 cursor-pointer bg-secondary px-2 py-1 rounded hover:bg-secondary/80">
                                    <Upload className="w-3 h-3" /> Import .md
                                </label>
                                <input 
                                    id="md-upload" 
                                    type="file" 
                                    accept=".md" 
                                    className="hidden" 
                                    onChange={handleFileUpload}
                                />
                             </div>
                        </div>
                        
                        <Tabs defaultValue="editor" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="editor">Editor</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                            </TabsList>
                            <TabsContent value="editor">
                                <Textarea 
                                    className="min-h-[400px] font-mono"
                                    value={currentBlog.content || ""}
                                    onChange={(e) => setCurrentBlog({...currentBlog, content: e.target.value})}
                                    placeholder="# Write your markdown here..."
                                />
                            </TabsContent>
                            <TabsContent value="preview">
                                <div className="border rounded-md p-4 min-h-[400px] bg-background">
                                    <article className="prose prose-invert max-w-none">
                                        <ReactMarkdown>
                                            {currentBlog.content || "*No content*"}
                                        </ReactMarkdown>
                                    </article>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <Button onClick={handleSubmit} disabled={isLoadingSubmit}>
                        {isLoadingSubmit ? (
                             <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                             </>
                        ) : (
                             <>
                                <Save className="w-4 h-4 mr-2" /> Save Post
                             </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  );
}
