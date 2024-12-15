"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";
import { Search, LoaderCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  cuisine: string;
  cookingTime: number;
}

const SearchPage: React.FC = () => {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCookingTime, setSelectedCookingTime] = useState<string>("");

  const fetchRecipes = async (data: any) => {
    try {
      setLoading(true);
      const res = await axios.get('/api/recipes', {
        params: {
          keywords: data?.keywords,
          cuisine: selectedCuisine,
          ingredients: selectedIngredients?.join(','),
          cookingTime: selectedCookingTime
        }
      });
      setRecipes(res?.data?.data);
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: any) => {
    fetchRecipes(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Recipes</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input id="keywords" placeholder="Enter keywords" {...register("keywords", { required: true })} />
          {errors?.keywords && <p className="text-red-500 text-sm">Keywords are required</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuisine">Cuisine</Label>
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Indian">Indian</SelectItem>
              <SelectItem value="Mexican">Mexican</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ingredients">Ingredients</Label>
          <Input
            id="ingredients"
            placeholder="Enter ingredients (comma separated)"
            value={selectedIngredients?.join(',')}
            onChange={(e: any) => setSelectedIngredients(e?.target?.value?.split(','))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
          <Select value={selectedCookingTime} onValueChange={setSelectedCookingTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select cooking time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">Up to 15 minutes</SelectItem>
              <SelectItem value="30">Up to 30 minutes</SelectItem>
              <SelectItem value="45">Up to 45 minutes</SelectItem>
              <SelectItem value="60">Up to 60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoaderCircleIcon className="animate-spin" /> : <Search className="mr-2" />}
          Search
        </Button>
      </form>

      <div className="mt-8">
        {recipes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes?.map((recipe: Recipe) => (
              <Card key={recipe?.id}>
                <CardHeader>
                  <CardTitle>{recipe?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Cuisine: {recipe?.cuisine}</p>
                  <p className="text-sm">Cooking Time: {recipe?.cookingTime} minutes</p>
                  <p className="text-sm">Ingredients: {recipe?.ingredients?.join(', ')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;