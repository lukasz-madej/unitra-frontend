import { MatPaginatorIntl } from '@angular/material/paginator';

const getRageLabel = (page: number, pageSize: number, length: number): string => {
  if (length === 0 || pageSize === 0) { return `0 z ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
};

export function getPaginatorTranslation(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Na stronie:';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  paginatorIntl.lastPageLabel = 'Ostatnia strona';
  paginatorIntl.firstPageLabel = 'Pierwsza strona';
  paginatorIntl.getRangeLabel = getRageLabel;

  return paginatorIntl;
}
