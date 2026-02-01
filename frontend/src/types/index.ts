export interface Customer {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  image?: string;
  phone?: string;
  status?: string;
  providerProfile?: ProviderProfile;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  storeName: string;
  description?: string;
  address: string;
  logo?: string;
  cuisineType?: string;
  isApproved: boolean;
}

export interface Meal {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  dietary: string[];
  providerId: string;
  categoryId: string;
  provider?: ProviderProfile;
  reviews?: any[];
}

export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: any;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
  };
}
