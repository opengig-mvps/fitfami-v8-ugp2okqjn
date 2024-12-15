'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Star, Home, User, Camera, Image, VideoIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Discover & Share Amazing Recipes
                  </h1>
                  <p className="max-w-[600px] text-xl">
                    Join the ultimate food community where you can share and discover recipes, food photos, and videos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-blue-500 shadow transition-colors hover:bg-gray-200">
                    Get Started
                  </Button>
                  <Button className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-400">
                    Learn More
                  </Button>
                </div>
              </div>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
                <img
                  src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                  alt="Hero"
                  className="object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-xl">
                  Our platform offers a variety of features to enhance your food sharing experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Camera className="h-12 w-12 text-blue-500" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Share Photos</h3>
                  <p>Upload and share your food photos with the community.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Image className="h-12 w-12 text-blue-500" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Discover Recipes</h3>
                  <p>Explore a wide variety of recipes shared by other users.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <VideoIcon className="h-12 w-12 text-blue-500" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Watch Videos</h3>
                  <p>Enjoy cooking videos and learn new techniques.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Testimonials</h2>
                <p className="max-w-[900px] text-xl">
                  Hear what our users have to say about our platform.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://avatars.githubusercontent.com/u/1?v=4" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-gray-500">Food Blogger</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "This platform has revolutionized the way I share my recipes. It's easy to use and the community is fantastic!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://avatars.githubusercontent.com/u/2?v=4" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-gray-500">Home Cook</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "I love discovering new recipes and sharing my own creations. This platform makes it so much fun!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://avatars.githubusercontent.com/u/3?v=4" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-gray-500">Chef</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "As a professional chef, I find this platform invaluable for sharing my work and connecting with food enthusiasts."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Us</h2>
                <p className="max-w-[900px] text-xl">
                  Create an account today and start sharing your food journey with the world.
                </p>
              </div>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600">
                Sign Up Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-blue-500 p-6 text-white">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default LandingPage;