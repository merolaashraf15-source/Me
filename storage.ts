import type { Order, OrderFormData } from "./types";

const STORAGE_KEY = "medicine_orders";

export function getOrders(): Order[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Order[];
  } catch {
    return [];
  }
}

export function saveOrder(formData: OrderFormData): Order {
  const orders = getOrders();
  const newOrder: Order = {
    id: crypto.randomUUID(),
    ...formData,
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return newOrder;
}

export function deleteOrder(id: string): void {
  const orders = getOrders();
  const filtered = orders.filter((order) => order.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllOrders(): void {
  localStorage.removeItem(STORAGE_KEY);
}
