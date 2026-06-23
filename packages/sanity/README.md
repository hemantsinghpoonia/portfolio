## Overview

Shared Sanity package consumed by both the portfolio application and the content manager.

The goal of this package is to keep content definitions, queries, types, and client configuration in a single location.

## Exports

### Schema

```ts
import { schemaTypes } from "@repo/sanity-schema/schema";
```

### Client

```ts
import { sanityClient } from "@repo/sanity-schema/client";
```

### Queries

```ts
import { allPostsQuery } from "@repo/sanity-schema";
```

### Types

Generated Sanity types are exposed through the package to keep application code strongly typed.

### Utilities

- image URL builder
- reading time estimation
- draft mode client

## Type Generation

```bash
pnpm --filter @repo/sanity-schema typegen
```

Type generation produces strongly typed GROQ query results and schema types used throughout the repository.
