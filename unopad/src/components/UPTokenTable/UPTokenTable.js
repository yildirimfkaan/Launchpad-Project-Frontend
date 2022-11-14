import { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './UPTokenTable.scss';

function UPTokenTable(props) {
  const tokens = props.filteredTokens?.length ? props.filteredTokens : props.tokens;
  const { history } = props;

  const maxRowCountPerPage = 10;
  const maxShowingPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [renderedTokens, setRenderedTokens] = useState([]);
  const [renderedPages, setRenderedPages] = useState([]);
  const [lastPageOfPagination, setLastPageOfPagination] = useState(maxShowingPage);

  useEffect(() => {
    if (tokens?.length) {
      setCurrentPage(1);
      const tempPages = [];
      for (let index = 0; index < Math.ceil(tokens.length / maxRowCountPerPage); index++) {
        tempPages.push(index + 1);
      }
      setPages([...tempPages]);
      setRenderedPages([
        ...tempPages.slice(lastPageOfPagination - maxShowingPage, lastPageOfPagination),
      ]);
    }
  }, [tokens]);

  useEffect(() => {
    if (tokens?.length && currentPage) {
      const firstIndex = maxRowCountPerPage * currentPage - maxRowCountPerPage;
      const lastIndex = maxRowCountPerPage * currentPage;
      const tempRendered = tokens?.slice(firstIndex, lastIndex);
      setRenderedTokens([...tempRendered]);
    }
  }, [currentPage, tokens]);

  const setPaginationPages = (page) => {
    if (
      renderedPages.findIndex((p) => p === page + 1) === -1 &&
      pages.slice(lastPageOfPagination + 1 - maxShowingPage, lastPageOfPagination + 1).length ===
        maxShowingPage
    ) {
      setLastPageOfPagination(lastPageOfPagination + 1);
      setRenderedPages(
        pages.slice(lastPageOfPagination + 1 - maxShowingPage, lastPageOfPagination + 1),
      );
    } else if (
      renderedPages.findIndex((p) => p === page - 1) === -1 &&
      pages.slice(lastPageOfPagination - 1 - maxShowingPage, lastPageOfPagination - 1).length ===
        maxShowingPage
    ) {
      setLastPageOfPagination(lastPageOfPagination - 1);
      setRenderedPages(
        pages.slice(lastPageOfPagination - 1 - maxShowingPage, lastPageOfPagination - 1),
      );
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    if (page === lastPageOfPagination) {
      setPaginationPages(page);
    } else if (page === lastPageOfPagination - maxShowingPage + 1) {
      setPaginationPages(page);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
    setLastPageOfPagination(maxShowingPage);
    setRenderedPages(pages.slice(0, maxShowingPage));
  };

  const prevPage = () => {
    if (currentPage - 1 !== 0) {
      setCurrentPage(currentPage - 1);
      setPaginationPages(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage + 1 <= pages.length) {
      setCurrentPage(currentPage + 1);
      setPaginationPages(currentPage + 1);
    }
  };

  const lastPage = () => {
    setCurrentPage(pages.length);
    if (pages.length > maxShowingPage) {
      setLastPageOfPagination(pages.length);
      setRenderedPages(pages.slice(pages.length - maxShowingPage, pages.length));
    }
  };

  const TableSelectRow = (nums) => {
    return history.push('project/' + nums);
  };

  console.log(tokens);

  return (
    <>
      <Table className="sales-table-design" responsive hover borderless>
        <thead>
          <tr className="text-t-body-color text-fs-tag">
            <th>#</th>
            <th>Project Name</th>
            <th>IDO Token Price</th>
            <th>Current Price</th>
            <th>ATH</th>
            <th>ATH IDO ROI</th>
            <th>No. Registration</th>
            <th>Total Raised</th>
            <th>Total Tokens Sold</th>
            <th>Sale Ended At</th>
          </tr>
        </thead>
        <tbody>
          {renderedTokens?.length ? (
            Object.entries(renderedTokens).map((item, index) => {
              if (currentPage * index < currentPage * maxRowCountPerPage) {
                return (
                <tr
                  onClick={() => {
                    TableSelectRow(item[1].id);
                  }}
                  className="text-t-head-color"
                >
                  <td>{index + 1}</td>
                  <td>{item[1].token_name}</td>
                  <td>{item[1].token_symbol}</td>
                  <td>text</td>
                  <td>text</td>
                  <td>text</td>
                  <td>text</td>
                  <td>text</td>
                  <td>text</td>
                  <td>text</td>
                </tr>
              );
              }
              
            })
          ) : (
            <div className="text-muted">No token found according to search results.</div>
          )}
        </tbody>
      </Table>
      {pages?.length > 1 ? (
        <Pagination className='d-flex justify-content-center'>
          <Pagination.First onClick={() => firstPage()} />
          <Pagination.Prev onClick={() => prevPage()} />
          {renderedPages.map((page, index) => {
            return (
              <Pagination.Item active={page === currentPage} onClick={() => changePage(page)}>
                {page}
              </Pagination.Item>
            );
          })}
          <Pagination.Next onClick={() => nextPage()} />
          <Pagination.Last onClick={() => lastPage()} />
        </Pagination>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tokens: state.tokenReducer.tokens,
  };
};

export default connect(mapStateToProps)(UPTokenTable);
