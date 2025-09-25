import React, { useState, useEffect, useMemo } from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { ListApiResponse, Article } from '../types';
import './ListPage.css';

const ITEMS_PER_PAGE = 10;

const ListPage: React.FC = () => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch('https://proovitoo.twn.ee/api/list');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result: ListApiResponse = await response.json();
        setData(result.list);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  if (loading) return <div className="loading-message">Loading list...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="list-page">
      <h1>Nimekiri</h1>
      <Table data={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ListPage;