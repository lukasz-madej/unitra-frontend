import { Category } from './category.model';
import { Set } from './set.model';
import { Moment } from 'moment';

export interface EquipmentSearchCriteria {
  category: Category;
  name: string;
  productionDateFrom: Moment;
  productionDateTo: Moment;
  serialNumber: string;
  set: Set;
}
