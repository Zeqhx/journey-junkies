import { LoaderFunction } from "react-router-dom";
import { Post } from "../types";
import axios, { AxiosResponse } from "axios";
import dummyData, { fetchRandomImages } from "../data";
import { supabase } from "../context/supabase";
interface HomePageLoader {
  message: string;
}

interface PostsLoaderFilter {
  title: string | null;
  author: string | null;
  tag: string | null;
  location: string | null;
  rating: number | null;
}

interface PostsPageLoader {
  posts: Post[];
  formValues: PostsLoaderFilter;
}

export const homeLoader = (async (): Promise<HomePageLoader> => {
  const response = await fetch("/api");
  const message: Promise<HomePageLoader> = response.json();
  return message;
}) satisfies LoaderFunction;

const countries = [];

export const postsLoader = (async ({ request }): Promise<PostsPageLoader> => {
  const url = new URL(request.url);
  const filter = {
    title: url.searchParams.get("title"),
    location: url.searchParams.get("location"),
    tag: url.searchParams.get("tag"),
    author: url.searchParams.get("author"),
    rating: Number(url.searchParams.get("rating")),
  };
  const posts = await retrievePosts(filter);
  return { posts, formValues: filter };
}) satisfies LoaderFunction;

export const postPageLoader = (async ({ params }): Promise<any> => {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id);
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", params.id)
    .order("created_at", { ascending: false });
  const { data: ratings } = await supabase
    .from("rating")
    .select("*")
    .eq("post_id", params.id);

  const post = posts![0] as Post;
  return { post, comments, ratings };
}) satisfies LoaderFunction;

export const dashboardLoader = async (): Promise<any> => {
  const { data: users }: AxiosResponse<[]> = await axios.get("/api/users");
  return users;
};

export const editPostLoader = (async ({ params }): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id);

  const post = data![0] as Post;
  if (error) {
    console.error(error);
  }
  return post;
}) satisfies LoaderFunction;

export const retrievePosts = async (
  filter: PostsLoaderFilter
): Promise<Post[]> => {
  let query = supabase.from("posts").select("*");
  if (filter.title) query = query.filter("title", "ilike", `%${filter.title}%`);
  if (filter.author)
    query = query.filter("author", "ilike", `%${filter.author}`);
  if (filter.tag) query = query.filter("tag", "ilike", `%${filter.tag}`);
  if (filter.location) query = query.filter("location", "eq", filter.location);
  if (filter.rating) query = query.filter("rating", "gte", filter.rating);

  let { data: posts } = await query;
  return posts as Post[];
};

export const profilePageLoader = (userId: string) =>
  (async () => {
    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .eq("author", userId);
    const { data: ratings } = await supabase
      .from("rating")
      .select("created_at, rating")
      .eq("post_author", userId)
      .order("created_at", { ascending: false });
    return { ratings, posts };
  }) satisfies LoaderFunction;
