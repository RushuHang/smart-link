// src/app/utils/data.ts
export const transactionData = [
  { key: "1", name: "Stripe Payout", amount: 2400, status: "Completed", date: "Oct 24, 2025" },
  { key: "2", name: "Client Invoice #442", amount: 1200, status: "Pending", date: "Oct 23, 2025" },
  { key: "3", name: "AWS Cloud Billing", amount: 860, status: "Completed", date: "Oct 22, 2025" },
];

export const columns = [
  { title: "Description", dataIndex: "name" },
  { title: "Date", dataIndex: "date" },
  { title: "Amount", dataIndex: "amount", align: "right" as const },
  { title: "Status", dataIndex: "status", align: "center" as const },
];
