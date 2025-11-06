import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// ✅ Fetch all blogs
export const getBlogs = query(async ({ db }) => {
  return await db.query("blogs").collect();
});

// ✅ Fetch a single blog by id
export const getBlogById = query({
  args: { id: v.id("blogs") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

// ✅ Add a blog
export const addBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    image: v.optional(v.string()),
    author: v.string(),
    date: v.number(),
  },
  handler: async ({ db }, args) => {
    return await db.insert("blogs", args);
  },
});

// ✅ Update a blog
export const updateBlog = mutation({
  args: {
    id: v.id("blogs"),
    newData: v.object({
      title: v.string(),
      content: v.string(),
      image: v.optional(v.string()),
      author: v.string(),
      date: v.number(),
    }),
  },
  handler: async ({ db }, { id, newData }) => {
    await db.patch(id, newData);
    return await db.get(id);
  },
});

// ✅ Delete a blog
export const deleteBlog = mutation({
  args: { id: v.id("blogs") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return { success: true, deletedId: id };
  },
});
