import { query, mutation } from "../_generated/server";

// ✅ Fetch all hero images
export const getHeroImages = query(async ({ db }) => {
  return await db.query("heroImages").collect();
});

// ✅ Fetch single hero image by ID
export const getHeroImageById = query(
  async ({ db }, args: { id: string }) => {
    const allHeroImages = await db.query("heroImages").collect();
    return allHeroImages.find(h => h._id === args.id);
  }
);

// ✅ Add a new hero image
export const addHeroImage = mutation(
  async (
    { db },
    args: { title?: string; subtitle?: string; image?: string }
  ) => {
    const id = await db.insert("heroImages", {
      title: args.title || "",
      subtitle: args.subtitle || "",
      image: args.image || "",
    });
    return id;
  }
);

// ✅ Update an existing hero image
export const updateHeroImage = mutation(
  async (
    { db },
    args: {
      id: string;
      newData: { title?: string; subtitle?: string; image?: string };
    }
  ) => {
    const { id, newData } = args;
    const existing = await db.get(id as any);

    if (!existing) throw new Error("Hero image not found");

    await db.patch(id as any, newData);
    return { ...existing, ...newData, _id: id };
  }
);

// ✅ Delete a hero image
export const deleteHeroImage = mutation(async ({ db }, args: { id: string }) => {
  await db.delete(args.id as any);
  return { success: true, deletedId: args.id };
});
