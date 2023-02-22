/* eslint-disable max-len */
import UPProjectCard from '../../components/UPProjectCard/UPProjectCard';
import React, { useEffect, useState } from 'react';
import { getProjects } from '../../store/project/projectActions';
import { connect } from 'react-redux';
// import UPQuickHandler from '../../components/UPQuickHandler/UPQuickHandler';
import {
  Container,
  Row,
  Col,
  Dropdown,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import './Staking.scss';
// import { quickHandlerImages } from '../../helpers/quickHandlerImages';
// import TripleCard from '../../components/UPTripleCard/TripleCard';
import SpinnerUnopad from '../../components/UPSpinnerUnopad/UPSpinnerUnopad';
import Subscribe from '../../components/UPSubscribe/Subscribe';
import UPTokenTable from '../../components/UPTokenTable/UPTokenTable';
import { sortKeys, sortTypes } from './stakingConstants';
import UPIcons from '../../components/UPIcons/UPIcons';
import {  stakingSectionConstants } from '../../helpers/constants';
import {
  filterTokensAction,
  sortingTokensAction,
  sortTokenSortData,
  updateQuickFilterAction,
} from '../../store/token/tokenActions';

function Staking({ ...props }) {
  const {
    getProjects,
    projects,
    activeProjects,
    completedProjects,
    setSortData,
    sortingTokens,
    quickFilter,
    updateQuickFilter,
    filterTokens,
    tokenSortData,
  } = props;

  useEffect(() => {
    getProjects();
  }, []);

  const maxRowCountPerPage = 9;
  const maxShowingPage = 5;
  const [activeCurrentPage, setActiveCurrentPage] = useState(0);
  const [activePages, setActivePages] = useState([]);
  const [activeRenderedProjects, setActiveRenderedProjects] = useState([]);
  const [activeRenderedPages, setActiveRenderedPages] = useState([]);
  const [activeLastPageOfPagination, setActiveLastPageOfPagination] = useState(maxShowingPage);

  const [completedCurrentPage, setCompletedCurrentPage] = useState(0);
  const [completedPages, setCompletedPages] = useState([]);
  const [completedRenderedProjects, setCompletedRenderedProjects] = useState([]);
  const [completedRenderedPages, setCompletedRenderedPages] = useState([]);
  const [completedLastPageOfPagination, setCompletedLastPageOfPagination] =
    useState(maxShowingPage);
  const [activeSection, setActiveSection] = useState(stakingSectionConstants.STAKING);
  useEffect(() => {
    filterTokens();
    sortingTokens();
  }, [quickFilter]);

  function changeSortType(sortType) {
    const newTokenSortData = { ...tokenSortData, sortType };
    setSortData(newTokenSortData);
    sortingTokens();
  }

  function changeSortKey(sortKey) {
    const newTokenSortData = { ...tokenSortData, sortKey };
    setSortData(newTokenSortData);
    sortingTokens();
  }

  useEffect(() => {
    if (activeProjects?.length) {
      setActiveCurrentPage(1);
      const tempPages = [];
      for (let index = 0; index < Math.ceil(activeProjects.length / maxRowCountPerPage); index++) {
        tempPages.push(index + 1);
      }
      setActivePages([...tempPages]);
      setActiveRenderedPages([
        ...tempPages.slice(activeLastPageOfPagination - maxShowingPage, activeLastPageOfPagination),
      ]);
    }
  }, [activeProjects]);

  useEffect(() => {
    if (completedProjects?.length) {
      setCompletedCurrentPage(1);
      const tempPages = [];
      for (
        let index = 0;
        index < Math.ceil(completedProjects.length / maxRowCountPerPage);
        index++
      ) {
        tempPages.push(index + 1);
      }
      setCompletedPages([...tempPages]);
      setCompletedRenderedPages([
        ...tempPages.slice(
          completedLastPageOfPagination - maxShowingPage,
          completedLastPageOfPagination,
        ),
      ]);
    }
  }, [completedProjects]);

  useEffect(() => {
    if (activeProjects?.length && activeCurrentPage) {
      const firstIndex = maxRowCountPerPage * activeCurrentPage - maxRowCountPerPage;
      const lastIndex = maxRowCountPerPage * activeCurrentPage;
      const tempRendered = activeProjects?.slice(firstIndex, lastIndex);
      setActiveRenderedProjects([...tempRendered]);
    }
  }, [activeCurrentPage, activeProjects]);

  useEffect(() => {
    if (completedProjects?.length && completedCurrentPage) {
      const firstIndex = maxRowCountPerPage * completedCurrentPage - maxRowCountPerPage;
      const lastIndex = maxRowCountPerPage * completedCurrentPage;
      const tempRendered = completedProjects?.slice(firstIndex, lastIndex);
      setCompletedRenderedProjects([...tempRendered]);
    }
  }, [completedCurrentPage, completedProjects]);

  const setPaginationPages = (page, isActive) => {
    if (isActive === 'active') {
      if (
        activeRenderedPages.findIndex((p) => p === page + 1) === -1 &&
        activePages.slice(
          activeLastPageOfPagination + 1 - maxShowingPage,
          activeLastPageOfPagination + 1,
        ).length === maxShowingPage
      ) {
        setActiveLastPageOfPagination(activeLastPageOfPagination + 1);
        setActiveRenderedPages(
          activePages.slice(
            activeLastPageOfPagination + 1 - maxShowingPage,
            activeLastPageOfPagination + 1,
          ),
        );
      } else if (
        activeRenderedPages.findIndex((p) => p === page - 1) === -1 &&
        activePages.slice(
          activeLastPageOfPagination - 1 - maxShowingPage,
          activeLastPageOfPagination - 1,
        ).length === maxShowingPage
      ) {
        setActiveLastPageOfPagination(activeLastPageOfPagination - 1);
        setActiveRenderedPages(
          activePages.slice(
            activeLastPageOfPagination - 1 - maxShowingPage,
            activeLastPageOfPagination - 1,
          ),
        );
      }
    } else if (isActive === 'completed') {
      if (
        completedRenderedPages.findIndex((p) => p === page + 1) === -1 &&
        completedPages.slice(
          completedLastPageOfPagination + 1 - maxShowingPage,
          completedLastPageOfPagination + 1,
        ).length === maxShowingPage
      ) {
        setCompletedLastPageOfPagination(completedLastPageOfPagination + 1);
        setCompletedRenderedPages(
          completedPages.slice(
            completedLastPageOfPagination + 1 - maxShowingPage,
            completedLastPageOfPagination + 1,
          ),
        );
      } else if (
        completedRenderedPages.findIndex((p) => p === page - 1) === -1 &&
        completedPages.slice(
          completedLastPageOfPagination - 1 - maxShowingPage,
          completedLastPageOfPagination - 1,
        ).length === maxShowingPage
      ) {
        setCompletedLastPageOfPagination(completedLastPageOfPagination - 1);
        setCompletedRenderedPages(
          completedPages.slice(
            completedLastPageOfPagination - 1 - maxShowingPage,
            completedLastPageOfPagination - 1,
          ),
        );
      }
    }
  };

  const changePage = (page, isActive) => {
    if (isActive === 'active') {
      setActiveCurrentPage(page);
      if (page === activeLastPageOfPagination) {
        setPaginationPages(page, isActive);
      } else if (page === activeLastPageOfPagination - maxShowingPage + 1) {
        setPaginationPages(page, isActive);
      }
    } else if (isActive === 'completed') {
      setCompletedCurrentPage(page);
      if (page === completedLastPageOfPagination) {
        setPaginationPages(page, isActive);
      } else if (page === completedLastPageOfPagination - maxShowingPage + 1) {
        setPaginationPages(page, isActive);
      }
    }
  };

  const firstPage = (isActive) => {
    if (isActive === 'active') {
      setActiveCurrentPage(1);
      setActiveLastPageOfPagination(maxShowingPage);
      setActiveRenderedPages(activePages.slice(0, maxShowingPage));
    } else if (isActive === 'completed') {
      setCompletedCurrentPage(1);
      setCompletedLastPageOfPagination(maxShowingPage);
      setCompletedRenderedPages(completedPages.slice(0, maxShowingPage));
    }
  };

  const prevPage = (isActive) => {
    if (isActive === 'active') {
      if (activeCurrentPage - 1 !== 0) {
        setActiveCurrentPage(activeCurrentPage - 1);
        setPaginationPages(activeCurrentPage - 1, isActive);
      }
    } else if (isActive === 'completed') {
      if (completedCurrentPage - 1 !== 0) {
        setCompletedCurrentPage(completedCurrentPage - 1);
        setPaginationPages(completedCurrentPage - 1, isActive);
      }
    }
  };

  const nextPage = (isActive) => {
    if (isActive === 'active') {
      if (activeCurrentPage + 1 <= activePages.length) {
        setActiveCurrentPage(activeCurrentPage + 1);
        setPaginationPages(activeCurrentPage + 1, isActive);
      }
    } else if (isActive === 'completed') {
      if (completedCurrentPage + 1 <= completedPages.length) {
        setCompletedCurrentPage(completedCurrentPage + 1);
        setPaginationPages(completedCurrentPage + 1, isActive);
      }
    }
  };

  const lastPage = (isActive) => {
    if (isActive === 'active') {
      setActiveCurrentPage(activePages.length);
      if (activePages.length > maxShowingPage) {
        setActiveLastPageOfPagination(activePages.length);
        setActiveRenderedPages(
          activePages.slice(activePages.length - maxShowingPage, activePages.length),
        );
      }
    } else if (isActive === 'completed') {
      setCompletedCurrentPage(completedPages.length);
      if (completedPages.length > maxShowingPage) {
        setCompletedLastPageOfPagination(completedPages.length);
        setCompletedRenderedPages(
          completedPages.slice(completedPages.length - maxShowingPage, completedPages.length),
        );
      }
    }
  };
  console.log(activeProjects, completedProjects);
  console.log(projects);
  if(activeSection === stakingSectionConstants.STAKING){
    return (
      <Container>
        <br></br>
  
        <div className="completed-sales-div align-items-center justify-content-center">
          {/* <div>
            <div
              className="d-flex align-items-center justify-content-center text-fs-body-lg 
          text-t-body-color mb-3 completed-sales-description"
            ></div>
          </div> */}
          <Row>
            <Col className="text-md-center">
              <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
  
                <ToggleButton
                  variant={activeSection === stakingSectionConstants.STAKING ? 'primary' : 'light'}
                  className={activeSection !== stakingSectionConstants.STAKING ? 'text-t-body-color' : ''}
                  id="tbg-radio-2"
                  value={stakingSectionConstants.STAKING}
                  onClick={() => setActiveSection(stakingSectionConstants.STAKING)}
                >
                  Staking
                </ToggleButton>
                <ToggleButton
                  variant={activeSection === stakingSectionConstants.LOCKING ? 'primary' : 'light'}
                  className={
                    activeSection !== stakingSectionConstants.LOCKING ? 'text-t-body-color' : ''
                  }
                  id="tbg-radio-3"
                  value={stakingSectionConstants.LOCKING}
                  onClick={() => setActiveSection(stakingSectionConstants.LOCKING)}
                >
                  Locking
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
          {/* <UPQuickHandler
            isSignUpAndKYC={true}
            signUpAndKYCImg={quickHandlerImages.lpSignUpAndKYCImg}
            isVerifyWallet={true}
            verifyWalletImg={quickHandlerImages.lpVerifyWalletImg}
            isStakeUnoToken={true}
            stakeUnoTokenImg={quickHandlerImages.lpStakeUnoTokenImg}
            registerForSaleImg={quickHandlerImages.lpRegisterForProject}
            href="#launchpad-projects"
            history={props.history}
          /> */}
          {projects ? (
            <>
              <div className="completed-sales-title-container">
                <div
                  className="d-flex align-items-center justify-content-center 
                text-fs-head-lg my-5"
                >
                  PROJECTS
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-fs-body-lg 
          text-t-body-color mb-5 completed-sales-description"
                >
                  <span>
                    Leverage on any tokens with a protocol trusted with billions for its performance
                    and reliability.
                  </span>
                </div>
              </div>
              <Row className="justify-content-center">
                {Object.entries(projects).map((item, index,) => {
                  
                    return <UPProjectCard item={item} redirectBaseUrl={"/staking-project"} {...props} />;
                  
                })}
              </Row>
              {/* {activePages?.length > 1 ? (
                <Pagination className="d-flex justify-content-center mt-5">
                  <Pagination.First onClick={() => firstPage('active')} />
                  <Pagination.Prev onClick={() => prevPage('active')} />
                  {activeRenderedPages.map((page, index) => {
                    return (
                      <Pagination.Item
                        active={page === activeCurrentPage}
                        onClick={() => changePage(page, 'active')}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  })}
                  <Pagination.Next onClick={() => nextPage('active')} />
                  <Pagination.Last onClick={() => lastPage('active')} />
                </Pagination>
              ) : null} */}
            </>
          ) : !projects ? (
            <SpinnerUnopad />
          ) : null}
          {/* {completedProjects?.length ? (
            <>
              <div className="completed-sales-title-container">
                <div
                  className="d-flex align-items-center justify-content-center 
                text-fs-head-lg my-5"
                >
                  COMPLETED SALES
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-fs-body-lg 
          text-t-body-color mb-5 completed-sales-description"
                >
                  <span>
                    Leverage on any tokens with a protocol trusted with billions for its performance
                    and reliability.
                  </span>
                </div>
              </div>
              <Row className="justify-content-center">
                {Object.entries(completedRenderedProjects).map((item, index) => {
                  if (completedCurrentPage * index < completedCurrentPage * maxRowCountPerPage) {
                    return <UPProjectCard item={item} {...props} />;
                  }
                })}
              </Row>
  
              {completedPages?.length > 1 ? (
                <Pagination className="d-flex justify-content-center mt-5">
                  <Pagination.First onClick={() => firstPage('completed')} />
                  <Pagination.Prev onClick={() => prevPage('completed')} />
                  {completedRenderedPages.map((page, index) => {
                    return (
                      <Pagination.Item
                        active={page === completedCurrentPage}
                        onClick={() => changePage(page, 'completed')}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  })}
                  <Pagination.Next onClick={() => nextPage('completed')} />
                  <Pagination.Last onClick={() => lastPage('completed')} />
                </Pagination>
              ) : null}
            </>
          ) : !completedProjects ? (
            <SpinnerUnopad />
          ) : null}
          <TripleCard />
   */}
          <Row
            id="tokens-container"
            className="d-flex align-items-center justify-content-between mt-4"
          >
            <Col>
              <div id="token-sorting-section" className="d-flex align-items-center py-2">
                <Dropdown className="me-2 sales-table-button">
                  <Dropdown.Toggle className="d-flex align-items-center">
                    <UPIcons name="MdSort" size="18" />
                    <span className="ms-1">{sortTypes[tokenSortData.sortType].name}</span>
                  </Dropdown.Toggle>
  
                  <Dropdown.Menu className="py-1">
                    {sortTypes.map((sortType, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          className="d-flex align-items-center px-1"
                          onClick={() => changeSortType(index)}
                        >
                          <UPIcons name={sortType.icon} size="18" />
                          <span className="ms-2">{sortType.name}</span>
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="sales-table-button">
                  <Dropdown.Toggle className="d-flex align-items-center">
                    <UPIcons name="BiFilterAlt" size="18" />
                    <span className="ms-1">{sortKeys[tokenSortData.sortKey].name}</span>
                  </Dropdown.Toggle>
  
                  <Dropdown.Menu className="py-1">
                    {sortKeys.map((sortKey, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          className="d-flex align-items-center px-1"
                          onClick={() => changeSortKey(index)}
                        >
                          <span>{sortKey.name}</span>
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
  
          <div id="sales-table" className="mt-2">
            {projects && (
              <>
                <UPTokenTable {...props} />
              </>
            )}
          </div>
          <Subscribe />
        </div>
      </Container>
    );
  }
  else if (activeSection === stakingSectionConstants.LOCKING){
    return (
      <div>locking</div>
    );
  }
 
}
const mapStateToProps = (state) => {
  return {
    activeProjects: state.projectReducer.activeProjects,
    completedProjects: state.projectReducer.completedProjects,
    projects: state.projectReducer.projects,
    filteredTokens: state.tokenReducer.filteredTokens,
    tokenSortData: state.tokenReducer.tokenSortData,
    quickFilter: state.tokenReducer.quickFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (payload) => {
      dispatch(getProjects(payload));
    },
    filterTokens: (payload) => {
      dispatch(filterTokensAction(payload));
    },
    setSortData: (payload) => {
      dispatch(sortTokenSortData(payload));
    },
    sortingTokens: (payload) => {
      dispatch(sortingTokensAction(payload));
    },
    updateQuickFilter: (payload) => {
      dispatch(updateQuickFilterAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staking);
