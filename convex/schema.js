import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    // ✅ Projects table
    projects: defineTable({
        title: v.string(),
        description: v.string(),
        image: v.string(), // URL or base64
        link: v.string(), // project link
        technologies: v.array(v.string()) // list of tech
    }),
    // ✅ Blogs table
    blogs: defineTable({
        title: v.string(),
        content: v.string(),
        image: v.optional(v.string()), // base64 or URL
        author: v.string(),
        date: v.number(), // timestamp
    }),
    // ✅ Services table
    services: defineTable({
        title: v.string(),
        description: v.string(),
        icon: v.string(), // icon URL or class name
    }),
    // ✅ Hero images table
    heroImages: defineTable({
        title: v.optional(v.string()),
        subtitle: v.optional(v.string()),
        image: v.optional(v.string()),
    }),
});
