export interface responsePayments {
  payments?: Payments;
}
export interface Payments {
  id: number;
  pricePayment?: number;
  billingDate?: string;
  billingDateDesc?: string;
  paymentDate?: any;
  paymentDateDesc?: any;
  status: "Lunas" | "BelumDibayar" | "Pending";
  package?: Package;
}
export interface Package {
  id?: number;
  packageName?: string;
  pricePackage?: number;
  maxUser?: number;
  maxBandwidth?: number;
}

export const columns = [
  {
    key: "paymentDateDesc",
    label: "Tanggal",
  },
  {
    key: "status",
    label: "Status",
  },
];
