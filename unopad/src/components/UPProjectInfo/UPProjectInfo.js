import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { projectInfoTabs } from '../../helpers/constants';
import ProjectAboutTheProject from './ProjectAboutTheProject';
import ProjectMediaReleases from './ProjectMediaReleases';
import ProjectSaleInfo from './ProjectSaleInfo';
import ProjectTokenInfo from './ProjectTokenInfo';
import ProjectTradingAnalytics from './ProjectTradingAnalytics';
import ProjectYourAllocations from './ProjectYourAllocations';
import './UPProjectInfo.scss';

function UPProjectInfo({ ...props }) {
  const { project, history } = props;
  const [activeTab, setActiveTab] = useState(projectInfoTabs.PROJECT_INFO_SALE_INFO);

  return (
    <>
      <Row className="mx-0">
        <Col sm="6" md="4" lg="2" className="px-1 mt-2 ps-0">
          <div
            className={
              'project-info-tab text-fs-head-xxs py-3 text-center ' +
              (activeTab === projectInfoTabs.PROJECT_INFO_SALE_INFO
                ? 'project-info-tab-active'
                : '')
            }
            onClick={() => setActiveTab(projectInfoTabs.PROJECT_INFO_SALE_INFO)}
          >
            Sale Info
          </div>
          {activeTab === projectInfoTabs.PROJECT_INFO_SALE_INFO && (
            <div className="project-info-content-container border p-3 d-sm-none d-block">
              <ProjectSaleInfo {...props} />
            </div>
          )}
        </Col>
        <Col sm="6" md="4" lg="2" className="px-1 mt-2">
          <div
            className={
              'project-info-tab text-fs-head-xxs py-3 text-center ' +
              (activeTab === projectInfoTabs.PROJECT_INFO_TOKEN_INFO
                ? 'project-info-tab-active'
                : '')
            }
            onClick={() => setActiveTab(projectInfoTabs.PROJECT_INFO_TOKEN_INFO)}
          >
            Token Info
          </div>
          {activeTab === projectInfoTabs.PROJECT_INFO_TOKEN_INFO && (
            <div className="project-info-content-container border p-3 d-sm-none d-block">
              <ProjectTokenInfo {...props} />
            </div>
          )}
        </Col>
        <Col sm="6" md="4" lg="2" className="px-1 mt-2">
          <div
            className={
              'project-info-tab text-fs-head-xxs py-3 text-center ' +
              (activeTab === projectInfoTabs.PROJECT_INFO_ABOUT_THE_PROJECT
                ? 'project-info-tab-active'
                : '')
            }
            onClick={() => setActiveTab(projectInfoTabs.PROJECT_INFO_ABOUT_THE_PROJECT)}
          >
            About Project
          </div>
          {activeTab === projectInfoTabs.PROJECT_INFO_ABOUT_THE_PROJECT && (
            <div className="project-info-content-container border p-3 d-sm-none d-block">
              <ProjectAboutTheProject {...props} />
            </div>
          )}
        </Col>
        <Col sm="6" md="4" lg="2" className="px-1 mt-2">
          <div
            className={
              'project-info-tab text-fs-head-xxs py-3 text-center ' +
              (activeTab === projectInfoTabs.PROJECT_INFO_YOUR_ALLOCATIONS
                ? 'project-info-tab-active'
                : '')
            }
            onClick={() => setActiveTab(projectInfoTabs.PROJECT_INFO_YOUR_ALLOCATIONS)}
          >
            Your Allocations
          </div>
          {activeTab === projectInfoTabs.PROJECT_INFO_YOUR_ALLOCATIONS && (
            <div className="project-info-content-container border p-3 d-sm-none d-block">
              <ProjectYourAllocations {...props} />
            </div>
          )}
        </Col>
        <Col sm="6" md="4" lg="2" className="px-1 mt-2">
          <div
            className={
              'project-info-tab text-fs-head-xxs py-3 text-center ' +
              (activeTab === projectInfoTabs.PROJECT_INFO_YOUR_MEDIA_RELEASES
                ? 'project-info-tab-active'
                : '')
            }
            onClick={() => setActiveTab(projectInfoTabs.PROJECT_INFO_YOUR_MEDIA_RELEASES)}
          >
            Media Releases
          </div>
          {activeTab === projectInfoTabs.PROJECT_INFO_YOUR_MEDIA_RELEASES && (
            <div className="project-info-content-container border p-3 d-sm-none d-block">
              <ProjectMediaReleases {...props} />
            </div>
          )}
        </Col>
        <Col sm="6" md="4" lg="2" className="px-1 mt-2 pe-0">
          <div
            className={
              'project-info-tab text-fs-head-xxs py-3 text-center ' +
              (activeTab === projectInfoTabs.PROJECT_INFO_YOUR_TRADING_ANALYTICS
                ? 'project-info-tab-active'
                : '')
            }
            onClick={() => setActiveTab(projectInfoTabs.PROJECT_INFO_YOUR_TRADING_ANALYTICS)}
          >
            Trading Analytics
          </div>
          {activeTab === projectInfoTabs.PROJECT_INFO_YOUR_TRADING_ANALYTICS && (
            <div className="project-info-content-container border p-3 d-sm-none d-block">
              <ProjectTradingAnalytics {...props} />
            </div>
          )}
        </Col>
      </Row>
      <div className="project-info-content-container border p-3 d-none d-sm-block">
        {activeTab === projectInfoTabs.PROJECT_INFO_SALE_INFO && (
          <ProjectSaleInfo className="d-none d-sm-block" {...props} />
        )}
        {activeTab === projectInfoTabs.PROJECT_INFO_TOKEN_INFO && (
          <ProjectTokenInfo className="d-none d-sm-block" {...props} />
        )}
        {activeTab === projectInfoTabs.PROJECT_INFO_ABOUT_THE_PROJECT && (
          <ProjectAboutTheProject className="d-none d-sm-block" {...props} />
        )}
        {activeTab === projectInfoTabs.PROJECT_INFO_YOUR_ALLOCATIONS && (
          <ProjectYourAllocations className="d-none d-sm-block" {...props} />
        )}
        {activeTab === projectInfoTabs.PROJECT_INFO_YOUR_MEDIA_RELEASES && (
          <ProjectMediaReleases className="d-none d-sm-block" {...props} />
        )}
        {activeTab === projectInfoTabs.PROJECT_INFO_YOUR_TRADING_ANALYTICS && (
          <ProjectTradingAnalytics className="d-none d-sm-block" {...props} />
        )}
      </div>
    </>
  );
}

export default UPProjectInfo;
