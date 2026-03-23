import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Hardcoded ID to ensure stability as per previous fix
export const client = createClient({
  projectId: "k52iexh1", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Turn off CDN for instant updates during development
});

const builder = imageUrlBuilder(client);

type ImageSource = Parameters<typeof builder.image>[0];

export const urlFor = (source: ImageSource) => {
  return builder.image(source);
};