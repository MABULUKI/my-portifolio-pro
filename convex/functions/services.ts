import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// ✅ Fetch all services
export const getServices = query(async ({ db }) => {
  return await db.query("services").collect();
});

// ✅ Fetch single service by id
export const getServiceById = query({
  args: { id: v.id("services") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

// ✅ Add a service
export const addService = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    icon: v.string(),
  },
  handler: async ({ db }, args) => {
    return await db.insert("services", args);
  },
});

// ✅ Update a service
export const updateService = mutation({
  args: {
    id: v.id("services"),
    newData: v.object({
      title: v.string(),
      description: v.string(),
      icon: v.string(),
    }),
  },
  handler: async ({ db }, { id, newData }) => {
    await db.patch(id, newData); // patch the document
    return await db.get(id);      // return updated document
  },
});

// ✅ Delete a service
export const deleteService = mutation({
  args: { id: v.id("services") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);          // delete document
    return { success: true, deletedId: id };
  },
});
