# Migration `20201206035142-create-orders`

This migration has been generated by kingrayhan at 12/6/2020, 9:51:42 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "coinId" TEXT,

    PRIMARY KEY ("id")
)

ALTER TABLE "Order" ADD FOREIGN KEY("coinId")REFERENCES "Coin"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201118023744-add-created-at-on-game-model..20201206035142-create-orders
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
@@ -34,5 +34,15 @@
   label  String
   price  Float
   Game   Game?   @relation(fields: [gameId], references: [id])
   gameId String?
+  Order  Order[]
 }
+
+model Order {
+  id            String  @id @default(uuid())
+  name          String
+  email         String
+  paymentStatus Boolean @default(false)
+  coin          Coin?   @relation(fields: [coinId], references: [id])
+  coinId        String?
+}
```


