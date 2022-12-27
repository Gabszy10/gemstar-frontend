import React from 'react';
import { ScheduleComponent, Day, Week, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

const Calendar = (props) => {
  const data = [
    {
      Subject: 'Meeting - 1',
      StartTime: new Date(2021, 0, 11, 4, 0),
      EndTime: new Date(2021, 0, 11, 6, 30),
    },
  ]
  return(
    <>
      <ScheduleComponent 
        currentView='Month'
        eventSettings={{ dataSource: data }}>
        <Inject services={[Day, Week, Month, Agenda]}/>
      </ScheduleComponent>
    </>
  )
};
export default Calendar;