'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/date-picker';
import { LoaderCircleIcon } from 'lucide-react';
import api from '@/lib/api';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
  birthDate: z.date().optional(),
  profilePicture: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/api/users/${(session?.user as any)?.id}/profile`);
        setValue('name', data?.name);
        setValue('email', data?.email);
        setValue('bio', data?.bio);
        setValue('birthDate', new Date(data?.birthDate));
      } catch (error) {
        console.error(error);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('email', data?.email);
      formData.append('bio', data?.bio || '');
      if (data?.birthDate) formData.append('birthDate', data?.birthDate.toISOString());
      if (data?.profilePicture?.[0]) formData.append('profilePicture', data?.profilePicture?.[0]);

      const response = await api.put(`/api/users/${(session?.user as any)?.id}/profile`, formData);

      if (response?.data?.success) {
        toast.success('Profile updated successfully!');
        router.push('/dashboard/user');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      } else {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Profile Management</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register('name')} placeholder="Enter your name" />
              {errors?.name && <p className="text-red-500 text-sm">{errors?.name?.message as any}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} type="email" placeholder="Enter your email" />
              {errors?.email && <p className="text-red-500 text-sm">{errors?.email?.message as any}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea {...register('bio')} placeholder="Tell us about yourself" />
              {errors?.bio && <p className="text-red-500 text-sm">{errors?.bio?.message as any}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <DateTimePicker
                date={undefined}
                setDate={(date: any) => setValue('birthDate', date)}
              />
              {errors?.birthDate && <p className="text-red-500 text-sm">{errors?.birthDate?.message as any}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <Input {...register('profilePicture')} type="file" accept="image/*" />
              {errors?.profilePicture && <p className="text-red-500 text-sm">{errors?.profilePicture?.message as any}</p>}
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={(session?.user as any)?.profilePicture} />
                <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{session?.user?.name}</p>
                <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting || loading}>
              {loading ? <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" /> : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;