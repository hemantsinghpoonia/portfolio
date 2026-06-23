import type { SchemaTypeDefinition } from "sanity";

import { postType } from "./post";
import { seoType } from "./seo";
import { youtubeType } from "./youtube";
import { calloutType } from "./callout";
import { bodyImageType } from "./bodyImage";

export const schemaTypes: SchemaTypeDefinition[] = [
  postType,
  seoType,
  youtubeType,
  calloutType,
  bodyImageType,
];
