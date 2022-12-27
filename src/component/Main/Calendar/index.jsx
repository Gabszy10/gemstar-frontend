import React, { useEffect } from 'react';
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  Month,
  Agenda
} from '@syncfusion/ej2-react-schedule';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getProjectAsAdmin, getProjects } from './../../../store/action';

const CalendarScheduler = props => {
  const { getProjectAsAdmin, getProjects, projectList, user_level_acc } = props;

  const fetchProjects =
    user_level_acc === 'owner'
      ? getProjectAsAdmin
      : user_level_acc === 'emp'
      ? getProjects
      : getProjects;
  const newData =
    projectList.length > 0
      ? projectList.reduce((acc, cur) => {
          if (cur.status_id !== 1 && cur.status_id !== 5) {
            return [
              ...acc,
              {
                Id: cur.project_id,
                Subject: cur.project_name,
                StartTime: new Date(cur.start_date),
                EndTime: new Date(cur.end_date)
              }
            ];
          }
          return [...acc];
        }, [])
      : [];

  useEffect(() => {
    fetchProjects();
  }, []);

  // const data = [
  //   {
  //     Id: 2,
  //     Subject: 'Meeting',
  //     StartTime: new Date(1636590000000),
  //     EndTime: new Date(1636760000000),
  //     IsAllDay: false,
  //     Status: 'Completed',
  //     Priority: 'High'
  //   }
  // ];
  const fields = {
    Id: { name: 'Id' },
    Subject: { name: 'Subject' },
    StartTime: { name: 'StartTime' },
    EndTime: { name: 'EndTime' }
  };

  // const fields = {
  //   Id: {name: 'project_id'},
  //   Subject: {name: 'project_name'},
  //   StartTime: {name: 'start_date'},
  //   EndTime: {name: 'end_date'}
  // };

  return (
    <>
      <ScheduleComponent
        style={{ minHeight: '91vh' }}
        currentView="Month"
        height="550px"
        eventSettings={{ dataSource: newData, fields: fields }}>
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
    </>
  );
};

const mapStateToProps = state => {
  return {
    projectList: state.projectList,
    user_level_acc: state.auth.user_level_acc
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectAsAdmin: () => dispatch(getProjectAsAdmin()),
    getProjects: () => dispatch(getProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScheduler);
