/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  ArrowLeft,
  Loader2,
  Save,
  MoreVertical,
} from "lucide-react";

// Shadcn UI Imports
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type definition for strict safety
interface Lesson {
  id?: number;
  title: string;
  part: string;
  description: string;
  audioUrl: string;
  minRole: "USER" | "ADMIN";
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize with a proper default object structure
  const [editingLesson, setEditingLesson] = useState<Lesson>({
    title: "",
    part: "",
    description: "",
    audioUrl: "",
    minRole: "USER",
  });

  const fetchLessons = async () => {
    try {
      const res = await fetch("/api/admin/lessons");
      const data = await res.json();
      if (data.lessons) {
        setLessons(data.lessons);
      }
    } catch (error) {
      console.error("Failed to fetch lessons", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleCreate = () => {
    setEditingLesson({
      title: "",
      part: "",
      description: "",
      audioUrl: "",
      minRole: "USER",
    });
    setIsEditing(true);
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson({ ...lesson });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await fetch(`/api/admin/lessons/${id}`, { method: "DELETE" });
      setLessons((prev) => prev.filter((l) => l.id !== id));
    } catch {
      alert("Failed to delete lesson.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editingLesson.id;
    const url = isNew
      ? "/api/admin/lessons"
      : `/api/admin/lessons/${editingLesson.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLesson),
      });
      const data = await res.json();
      if (res.ok) {
        setIsEditing(false);
        fetchLessons(); // Refresh list
      } else {
        alert(data.error || "Save failed");
      }
    } catch {
      alert("Error saving lesson");
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Edit / Create View
  if (isEditing) {
    return (
      <div className="mx-auto max-w-3xl py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(false)}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {editingLesson.id ? "Edit Lesson" : "Create New Lesson"}
            </h2>
            <p className="text-muted-foreground">
              {editingLesson.id
                ? "Update lesson details and access controls."
                : "Add a new lesson to the curriculum."}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Introduction to React"
                    value={editingLesson.title}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="part">Category / Part</Label>
                  <Input
                    id="part"
                    placeholder="e.g. Module 1"
                    value={editingLesson.part}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        part: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Summarize the content of this lesson..."
                  className="min-h-[120px] resize-y"
                  value={editingLesson.description}
                  onChange={(e: { target: { value: any; }; }) =>
                    setEditingLesson({
                      ...editingLesson,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audioUrl">Audio / Resource URL</Label>
                <Input
                  id="audioUrl"
                  placeholder="https://..."
                  value={editingLesson.audioUrl}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      audioUrl: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
                <Label className="text-base font-semibold">
                  Access Control
                </Label>
                <p className="mb-3 text-sm text-muted-foreground">
                  Determine who can view this lesson content.
                </p>
                <Select
                  value={editingLesson.minRole}
                  onValueChange={(val: "USER" | "ADMIN") =>
                    setEditingLesson({ ...editingLesson, minRole: val })
                  }
                >
                  <SelectTrigger className="w-full md:w-[240px] bg-background">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">All Users</SelectItem>
                    <SelectItem value="ADMIN">Admins Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
          <p className="text-muted-foreground">
            Manage your course content and visibility settings.
          </p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" />
          Add Lesson
        </Button>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No lessons found. Click &quot;Add Lesson&quot; to create one.
                  </TableCell>
                </TableRow>
              ) : (
                lessons.map((lesson) => (
                  <TableRow key={lesson.id} className="group">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{lesson.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1 md:hidden">
                          {lesson.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{lesson.part}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          lesson.minRole === "ADMIN"
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {lesson.minRole === "ADMIN" ? "Admin Only" : "Public"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Desktop Actions */}
                      <div className="hidden sm:flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(lesson)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(lesson.id!)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>

                      {/* Mobile Actions Dropdown */}
                      <div className="sm:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleEdit(lesson)}
                            >
                              <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(lesson.id!)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
