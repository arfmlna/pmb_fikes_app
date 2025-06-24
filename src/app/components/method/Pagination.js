import React from 'react'

export function Pagination(totalRows, perPage) {
  const pages = [];
  for (let i = perPage; i < totalRows; i += perPage) {
    pages.push(i);
  }
  pages.push(totalRows);
  return pages;
}
