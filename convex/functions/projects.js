import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
// ✅ Fetch all projects
export const getProjects = query(async ({ db }) => {
    return await db.query("projects").collect();
});
// ✅ Fetch a single project by id
export const getProjectById = query({
    args: { id: v.id("projects") },
    handler: async ({ db }, { id }) => {
        return await db.get(id);
    },
});
// ✅ Add a project
export const addProject = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        image: v.string(),
        link: v.string(),
        technologies: v.array(v.string()),
    },
    handler: async ({ db }, args) => {
        return await db.insert("projects", args);
    },
});
// ✅ Update a project
export const updateProject = mutation({
    args: {
        id: v.id("projects"),
        newData: v.object({
            title: v.optional(v.string()),
            description: v.optional(v.string()),
            image: v.optional(v.string()),
            link: v.optional(v.string()),
            technologies: v.optional(v.array(v.string())),
        }),
    },
    handler: async ({ db }, { id, newData }) => {
        // Only the properties in newData will be patched
        await db.patch(id, newData);
        return await db.get(id);
    },
});
// ✅ Delete a project
export const deleteProject = mutation({
    args: { id: v.id("projects") },
    handler: async ({ db }, { id }) => {
        await db.delete(id);
        return { success: true, deletedId: id };
    },
});
