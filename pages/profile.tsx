import { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  User as UserIcon,
  Mail,
  Lock,
  Loader2,
  Save,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";

/**
 * User Profile Page
 * Allows users to view and update their profile information
 */
export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userDetails, setUserDetails] = useState<any>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/users/profile");
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.user);
          setName(data.user.name);
          setEmail(data.user.email);
        }
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    };

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation for password update
    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword && !currentPassword) {
      setError("Please enter your current password to change it");
      return;
    }

    setIsLoading(true);

    try {
      const body: any = { name };

      if (newPassword && currentPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }

      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      setSuccess("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || !userDetails) {
    return (
      <Layout>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Overview Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={session?.user?.image || ""} alt={name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-500 text-white text-2xl">
                    {name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="text-sm text-neutral-500">{email}</p>
                </div>
                <Separator />
                <div className="w-full space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <UserIcon className="h-4 w-4" />
                    <span>
                      Provider:{" "}
                      <span className="font-medium">
                        {userDetails.provider || "credentials"}
                      </span>
                    </span>
                  </div>
                  {userDetails.createdAt && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined:{" "}
                        <span className="font-medium">
                          {new Date(userDetails.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Update Profile Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your personal information and password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold">
                      Personal Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-9"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-9"
                          value={email}
                          disabled
                          title="Email cannot be changed"
                        />
                      </div>
                      <p className="text-xs text-neutral-500">
                        Email addresses cannot be changed
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Change Password (only for credentials users) */}
                  {userDetails.provider === "credentials" && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold">Change Password</h3>

                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                          <Input
                            id="currentPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-9"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-9"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={isLoading}
                            minLength={6}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-9"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                            minLength={6}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                      {success}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
