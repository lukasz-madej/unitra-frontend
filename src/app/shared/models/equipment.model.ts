import { Category } from './category.model';
import { Set } from './set.model';

export interface Equipment {
  id: number;
  name: string;
  description: string;
  productionDate: Date;
  serialNumber: string;
  category: Category;
  set: Set;
  createdAt: Date;
  updatedAt: Date;
}
