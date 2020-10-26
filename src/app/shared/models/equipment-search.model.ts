import { Moment } from 'moment';

export interface EquipmentSearchCriteria {
  categoryName?: string;
  categoryId?: number;
  name: string;
  productionDateFrom: Moment;
  productionDateTo: Moment;
  serialNumber: string;
  setName?: string;
  setId?: number;
}
