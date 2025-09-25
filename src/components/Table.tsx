import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import './Table.css';

type SortDirection = 'ascending' | 'descending' | 'default';

interface SortConfig {
  key: keyof Article;
  direction: SortDirection;
}

interface TableProps {
  data: Article[];
}

const SortIndicator: React.FC<{ direction: SortDirection }> = ({ direction }) => {
  if (direction === 'ascending') return <span className="sort-indicator">▲</span>;
  if (direction === 'descending') return <span className="sort-indicator">▼</span>;
  return <span className="sort-indicator">↕</span>;
};

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const toSortableDate = (code: string | number) => {
    const c = String(code);
    if (c.length < 7) return '';
    let yearPrefix = '';
    const centuryDigit = parseInt(c[0]);
    if (centuryDigit === 3 || centuryDigit === 4) yearPrefix = '19';
    if (centuryDigit === 5 || centuryDigit === 6) yearPrefix = '20';
    if (centuryDigit < 3) yearPrefix = '18';
    const year = yearPrefix + c.slice(1, 3);
    const month = c.slice(3, 5);
    const day = c.slice(5, 7);
    return `${year}${month}${day}`;
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig && sortConfig.direction !== 'default') {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'personal_code') {
          aValue = toSortableDate(a.personal_code);
          bValue = toSortableDate(b.personal_code);
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof Article) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'default';
      }
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (name: keyof Article): SortDirection => {
    if (!sortConfig || sortConfig.key !== name) {
      return 'default';
    }
    return sortConfig.direction;
  };

  const handleRowClick = (id: string) => {
    setSelectedRow(selectedRow === id ? null : id);
  };
  const getGender = (sex: 'm' | 'f'): string => (sex === 'm' ? 'Mees' : 'Naine');
  const getDOB = (personalCode: string | number): string => {
    const code = String(personalCode);
    if (code.length < 7) return 'Invalid Code';
    let yearPrefix = '';
    const centuryDigit = parseInt(code[0]);
    if (centuryDigit === 3 || centuryDigit === 4) yearPrefix = '19';
    if (centuryDigit === 5 || centuryDigit === 6) yearPrefix = '20';
    if (centuryDigit < 3) yearPrefix = '18';
    const year = yearPrefix + code.slice(1, 3);
    const month = code.slice(3, 5);
    const day = code.slice(5, 7);
    return `${day}.${month}.${year}`;
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th onClick={() => requestSort('firstname')}>
            First Name <SortIndicator direction={getSortDirection('firstname')} />
          </th>
          <th onClick={() => requestSort('surname')}>
            Last Name <SortIndicator direction={getSortDirection('surname')} />
          </th>
          <th onClick={() => requestSort('sex')}>
            Gender <SortIndicator direction={getSortDirection('sex')} />
          </th>
          <th onClick={() => requestSort('personal_code')}>
            Date of Birth <SortIndicator direction={getSortDirection('personal_code')} />
          </th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <React.Fragment key={item.id}>
            <tr onClick={() => handleRowClick(item.id)} className={selectedRow === item.id ? 'selected-row' : ''}>
              <td>{item.firstname}</td>
              <td>{item.surname}</td>
              <td>{getGender(item.sex)}</td>
              <td>{getDOB(item.personal_code)}</td>
              <td>{item.phone}</td>
            </tr>
            {selectedRow === item.id && (
              <tr className="article-intro-row">
                <td colSpan={5}>
                  <div className="article-intro-container">
                    {item.image && (
                      <img src={item.image.small} alt={item.image.alt} className="article-intro-image" />
                    )}
                    <div className="article-intro-content">
                      <div className="article-intro-text" dangerouslySetInnerHTML={{ __html: item.intro }} />
                      <Link to={`/article/${item.id}`} className="read-more-link">Read More</Link>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;