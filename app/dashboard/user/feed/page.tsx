"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Heart, MessageCircle, Send, LoaderCircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import api from "@/lib/api";

const FeedPage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/feed');
        setPosts(response?.data?.data);
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const response = await api.post(`/api/posts/${postId}/like`, { userId: session?.user?.id });
      if (response?.data?.success) {
        toast.success("Liked the post!");
        setPosts((prevPosts) =>
          prevPosts?.map((post: any) =>
            post?.id === postId ? { ...post, likes: post?.likes + 1 } : post
          )
        );
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container px-4 md:px-6 py-6">
          <ScrollArea className="w-full whitespace-nowra">
            <div className="flex w-max space-x-4 mt-10">
              {Array.from({ length: 10 })?.map((_, i) => (
                <Button key={i} variant="ghost" className="flex flex-col items-center space-y-2">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={`https://picsum.photos/seed/${i}/200`} alt={`User ${i + 1}`} />
                    <AvatarFallback>U{i + 1}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">User {i + 1}</span>
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
        <section className="container px-4 md:px-6 py-6 space-y-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <LoaderCircleIcon className="h-10 w-10 animate-spin" />
            </div>
          ) : (
            posts?.map((post: any, i: number) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://picsum.photos/seed/${i + 10}/200`} alt={`User ${i + 1}`} />
                    <AvatarFallback>U{i + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">user{i + 1}</p>
                    <p className="text-xs text-muted-foreground">Posted 2h ago</p>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={`https://picsum.photos/seed/${i + 20}/600/400`}
                    alt={`Post ${i + 1}`}
                    className="w-full h-auto aspect-square object-cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <Button variant="ghost" size="icon" onClick={() => handleLike(post?.id)}>
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-5 w-5" />
                      <span className="sr-only">Comment</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Send className="h-5 w-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">user{i + 1}</span> This is a sample caption for the post. It can be
                      quite long and may contain hashtags and mentions.
                    </p>
                    <p className="text-muted-foreground mt-1">View all 10 comments</p>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default FeedPage;