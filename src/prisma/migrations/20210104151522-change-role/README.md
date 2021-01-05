# Migration `20210104151522-change-role`

This migration has been generated by kingrayhan at 1/4/2021, 9:15:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."UserRule" AS ENUM ('ADMIN', 'MODERATOR')

ALTER TABLE "User" ADD COLUMN     "role" "UserRule" NOT NULL DEFAULT E'MODERATOR'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201218051704-add-order-status-to-order..20210104151522-change-role
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,8 +14,9 @@
   id        String   @id @default(uuid())
   email     String   @unique
   name      String
   password  String
+  role      UserRule @default(MODERATOR)
   createdAt DateTime @default(now())
 }
 model Game {
@@ -53,4 +54,9 @@
 enum OrderStatus {
   PENDING
   DONE
 }
+
+enum UserRule {
+  ADMIN
+  MODERATOR
+}
```

