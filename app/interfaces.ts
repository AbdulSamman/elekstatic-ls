export interface IAppContext {
  products: IProduct[];
  getProductById: (id: any) => void;
  productDetails: any;
}

export interface IAppProvider {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  documentId: string;
  title: string;
  description: Array<{ [key: string]: any }>;
  banner: IBanner | null;
  price: number;
  instantDelivery: boolean;
  files?: any;
  whatsIncluded: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
export interface IBanner {
  alternativeText?: boolean;
  caption?: boolean;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: IBannerFormats;
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: boolean;
  provider: string;
  provider_metadata: boolean;
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}
export interface IFormatDetails {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: boolean;
  size: number;
  sizeInBytes: number;
  url: string;
  width: number;
}
export interface IBannerFormats {
  thumbnail: IFormatDetails;
  small: IFormatDetails;
  hash: string;
  height: number;
  mime: string;
  id: number;
  name: string;
  previewUrl: boolean;

  provider: string;
  provider_metadata: boolean;
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}
