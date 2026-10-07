import type { LucideIcon } from "lucide-react";

export interface DashbaordStatCardItemsInterface {
  id: string;
  name: string;
  icon: LucideIcon;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ChartDataInterface {
  month: string;
  revenue: number;
  profit: number;
  expenses: number;
}

export interface RecentOrdersInterface {
  id: number;
  customer: string;
  product: string;
  amount: string;
  status: string;
}

export interface TopProducsInterface {
  id: number;
  product: string;
  sales: string;
  revenue: string;
  growth: string;
  isPositive: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}