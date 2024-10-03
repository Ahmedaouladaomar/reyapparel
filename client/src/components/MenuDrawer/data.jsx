import {
  ADMIN,
  COLLECTIONS,
  DASHBOARD,
  ORDERS,
  PAYMENTS,
  PRODUCTS,
  SHIPPING,
  USERS,
} from "@/pages/routes";
import {
  IconHome,
  IconUser,
  IconPackage,
  IconMoneybag,
  IconShirt,
  IconFiles,
  IconTruckDelivery,
} from "@tabler/icons-react";

export const items = [
  { path: DASHBOARD, label: "Dashboard", Icon: IconHome },
  { path: ADMIN.replace("/*", USERS), label: "Users", Icon: IconUser },
  { path: ADMIN.replace("/*", COLLECTIONS), label: "Collections", Icon: IconPackage },
  { path: ADMIN.replace("/*", PRODUCTS), label: "Products", Icon: IconShirt },
  { path: ADMIN.replace("/*", ORDERS), label: "Orders", Icon: IconFiles },
  { path: ADMIN.replace("/*", PAYMENTS), label: "Payments", Icon: IconMoneybag },
  { path: ADMIN.replace("/*", SHIPPING), label: "Shipping", Icon: IconTruckDelivery },
];
