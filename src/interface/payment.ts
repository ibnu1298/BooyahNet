export interface responsePayments {
  payments?: Payments;
}
export interface Payments {
  id: number;
  pricePayment?: number;
  billingDate: number;
  billingDateDesc?: string;
  billingDatelong: number;
  paymentDate?: any;
  paymentDateDesc?: any;
  status: number;
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
