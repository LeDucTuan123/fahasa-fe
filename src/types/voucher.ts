export interface VoucherType {
    id: any;
    code: string;
    expdate: string;
    valuev: number;
    condition: number;
    active: boolean;
    quantity?: number;
    orders?: [];
  }