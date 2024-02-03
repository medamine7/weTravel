import { Travel } from '../entities/travel.entity';

export interface FindAllOptions {
  publicOnly?: boolean;
  limit?: number;
  skip?: number;
}

export interface FindAllResponse {
  items: Travel[];
  count: number;
}

export interface FindOneOptions {
  publicOnly?: boolean;
}
