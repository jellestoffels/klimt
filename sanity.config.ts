"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

// Hardcoded values to prevent loading errors
const projectId = "k52iexh1";
const dataset = "production";

export default defineConfig({
  basePath: "/studio",
  name: "Klimt_Content_Studio",
  title: "Klimt Studio CMS",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});