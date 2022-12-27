import React, { useRef, useEffect, useState } from 'react';
import { Row, Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import MainBody from '../../UI/MainBody';
import EditableInput from '../../UI/EditableInput';
import NotEditableField from '../../UI/NotEditableField';
import { usersDynamicUpdate } from './../../../store/action/index';
import { dateFormatting } from '../../Shared/Helpers/dateFormat';

const CreateModule = props => {
  const { userData, usersDynamicUpdate } = props;
  console.log(userData);
  

  useEffect(() => {
    
    console.log("userData changed!");
  }, [userData]);
  
  return (
    <MainBody>
      <Card.Title className="text-center mt-3">
        <h3>Account Settings</h3>
      </Card.Title>
      <hr className="mt-0" />
      <Row className="mb-3">
          {/* <NotEditableField label="Email:" value={userData.email} /> */}
        <EditableInput
          type="email"
          label="Email"
          handleSave={usersDynamicUpdate}
          value={userData.email}
          fieldName="email"
        />

        <EditableInput
          type="text"
          label="First Name:"
          handleSave={usersDynamicUpdate}
          value={userData.first_name}
          fieldName="first_name"
        />

        <EditableInput
          type="text"
          label="Middle Name:"
          value={userData.middle_name}
          handleSave={usersDynamicUpdate}
          fieldName="middle_name"
        />

        <EditableInput
          type="text"
          label="Last Name:"
          value={userData.last_name}
          handleSave={usersDynamicUpdate}
          fieldName="last_name"
        />

        <NotEditableField label="Function:" value={userData.user_level_name} />

        <NotEditableField
          label="Birthday:"
          value={dateFormatting(userData.birthday, 'mmdy')}
        />

        <EditableInput
          type="text"
          label="Address:"
          value={userData.address}
          handleSave={usersDynamicUpdate}
          fieldName="address"
        />

        <EditableInput
          type="text"
          label="Mobile number:"
          value={userData.contact_number}
          handleSave={usersDynamicUpdate}
          fieldName="contact_number"
        />

        <EditableInput
          type="password"
          label="Change Password:"
          value=""
          handleSave={usersDynamicUpdate}
          fieldName="password"
        />

      
      </Row>
    </MainBody>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    usersDynamicUpdate: (elementId, fieldName, newValue) =>
    dispatch(usersDynamicUpdate(elementId, fieldName, newValue))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateModule);
