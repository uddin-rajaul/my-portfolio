"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, FileText, Lock, Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/blog" className="block group">
            <Card className="h-full transition-all group-hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Blog Management</h2>
                <p className="text-muted-foreground mb-6">Create, edit, and manage your blog posts and articles.</p>
                <div className="mt-auto flex items-center text-primary font-medium">
                  Manage Blog <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/photography" className="block group">
            <Card className="h-full transition-all group-hover:border-primary">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Photography Admin</h2>
                <p className="text-muted-foreground mb-6">Upload photos, manage gallery, and organizing your shots.</p>
                <div className="mt-auto flex items-center text-primary font-medium">
                  Manage Photos <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
