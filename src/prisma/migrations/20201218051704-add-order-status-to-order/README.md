# Migration `20201218051704-add-order-status-to-order`

This migration has been generated by kingrayhan at 12/18/2020, 11:17:04 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'DONE')

ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT E'PENDING'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201217053040-add-player-id-to-order..20201218051704-add-order-status-to-order
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
@@ -37,14 +37,20 @@
   gameId String?
 }
 model Order {
-  id            String   @id @default(uuid())
+  id            String      @id @default(uuid())
   customerName  String
   customerEmail String
   transactionId String
   game          String
   coin          String
   price         Float
   playerId      String
-  createdAt     DateTime @default(now())
+  status        OrderStatus @default(PENDING)
+  createdAt     DateTime    @default(now())
 }
+
+enum OrderStatus {
+  PENDING
+  DONE
+}
```


