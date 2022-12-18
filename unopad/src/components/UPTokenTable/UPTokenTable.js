import { useEffect, useState } from 'react';
import { Badge, Pagination, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './UPTokenTable.scss';

function UPTokenTable(props) {
  const { history, filteredTokens } = props;

  const maxRowCountPerPage = 10;
  const maxShowingPage = 5;
  const [tokens, setTokens] = useState(filteredTokens ? filteredTokens : props.tokens);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [renderedTokens, setRenderedTokens] = useState([]);
  const [renderedPages, setRenderedPages] = useState([]);
  const [lastPageOfPagination, setLastPageOfPagination] = useState(maxShowingPage);

  useEffect(() => {
    setTokens(filteredTokens ? filteredTokens : props.tokens);
  }, [props.tokens, filteredTokens]);

  useEffect(() => {
    if (tokens) {
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
    if (tokens && currentPage) {
      const firstIndex = maxRowCountPerPage * currentPage - maxRowCountPerPage;
      const lastIndex = maxRowCountPerPage * currentPage;
      const tempRendered = tokens?.slice(firstIndex, lastIndex);
      setRenderedTokens([...tempRendered]);
      
    }
  }, [currentPage, tokens]);

  function scrollToTokensContainer() {
    const tokensContainer = document.getElementById('tokens-container');
      if (tokensContainer) {
        tokensContainer.scrollIntoView({ behavior: 'smooth' });
      }
  }

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
    scrollToTokensContainer();
  };

  const firstPage = () => {
    setCurrentPage(1);
    setLastPageOfPagination(maxShowingPage);
    setRenderedPages(pages.slice(0, maxShowingPage));
    scrollToTokensContainer();
  };

  const prevPage = () => {
    if (currentPage - 1 !== 0) {
      setCurrentPage(currentPage - 1);
      setPaginationPages(currentPage - 1);
      scrollToTokensContainer();
    }
  };

  const nextPage = () => {
    if (currentPage + 1 <= pages.length) {
      setCurrentPage(currentPage + 1);
      setPaginationPages(currentPage + 1);
      scrollToTokensContainer();
    }
  };

  const lastPage = () => {
    setCurrentPage(pages.length);
    if (pages.length > maxShowingPage) {
      setLastPageOfPagination(pages.length);
      setRenderedPages(pages.slice(pages.length - maxShowingPage, pages.length));
    }
    scrollToTokensContainer();
  };

  const TableSelectRow = (nums) => {
    return history.push('project/' + nums);
  };

  return (
    <>
      <Table className="sales-table-design" responsive hover borderless>
        <thead>
          <tr className="text-t-body-color text-fs-tag">
            <th>#</th>
            <th>Token Name</th>
            <th>Token Symbol</th>
            <th>Token Price in UNO</th>
            <th>Token Price in USD</th>
            <th>Total Raised</th>
            <th>Target Raised</th>
            <th>Total Token Sold</th>
            <th>Distribution</th>
            <th>Total Supply</th>
            <th>Status</th>
          </tr>
        </thead>
        {renderedTokens?.length ? (
          <tbody>
            {Object.entries(renderedTokens).map((item, index) => {
              if (currentPage * index < currentPage * maxRowCountPerPage) {
                return (
                  <tr
                    onClick={() => {
                      TableSelectRow(item[1].token.id);
                    }}
                    className="text-t-head-color"
                  >
                    <td>{index + 1}</td>
                    <td>{item[1].token.name}</td>
                    <td>{item[1].token.symbol}</td>
                    <td>{item[1].token.price_in_uno}</td>
                    <td>
                      {' '}
                      {item[1].token.price_in_usd.toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'USD',
                        currencyDisplay: 'symbol',
                        useGrouping: true,
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      {item[1].total_raised.toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'USD',
                        currencyDisplay: 'symbol',
                        useGrouping: true,
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      {item[1].target_raised.toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'USD',
                        currencyDisplay: 'symbol',
                        useGrouping: true,
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      {item[1].total_tokens_sold.toLocaleString('tr-TR', {
                        useGrouping: true,
                        minimumSignificantDigits: 1,
                      })}
                    </td>
                    <td>
                      {item[1].token.distribution.toLocaleString('tr-TR', {
                        useGrouping: true,
                        minimumSignificantDigits: 1,
                      })}
                    </td>

                    <td>
                      {item[1].token.total_supply.toLocaleString('tr-TR', {
                        useGrouping: true,
                        minimumSignificantDigits: 1,
                      })}
                    </td>

                    <td>
                      {item[1].is_active === 'active' ? (
                        <Badge bg="success">Active</Badge>
                      ) : item[1].is_active === 'completed' ? (
                        <Badge>Completed</Badge>
                      ) : (
                        <Badge bg="secondary">Other</Badge>
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        ) : null}
      </Table>

      {!renderedTokens?.length && (
        <div className="d-flex text-fs-body-md text-t-body-color justify-content-center">
          No token found according to search results.
        </div>
      )}

      {pages?.length > 1 ? (
        <Pagination className="d-flex justify-content-center">
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
