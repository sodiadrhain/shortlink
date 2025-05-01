export interface IShortLink {
  id?: string;
  userId?: string;
  fullLink?: string;
  shortLinkCode?: string;
  stats?: number;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
