import React, { useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import MainBody from '../../../../UI/MainBody';
import EditableInput from '../../../../UI/EditableInput';
import NotEditableField from '../../../../UI/NotEditableField';
import CustomSwitch from '../../../../UI/CustomSwitch';
import {
  usersDynamicUpdate,
  getUserData
} from '../../../../../store/action/index';
import { dateFormatting } from '../../../../Shared/Helpers/dateFormat';

const CreateModule = props => {
  const { userData, usersDynamicUpdate, match, getUserData } = props;
  const { userId } = match.params;

  useEffect(() => {
    getUserData(userId);
  }, []);

  return (
    <MainBody>
      <Card.Title className="text-center mt-3">
        <h3>Edit User</h3>
      </Card.Title>
      <hr className="mt-0" />
      <Row className="mb-3 p-3">
        {Object.keys(userData).length > 0 ? (
          <>
            <NotEditableField label="Email:" value={userData.email} />

            <EditableInput
              type="text"
              label="First Name:"
              handleSave={usersDynamicUpdate}
              value={userData.first_name}
              elementId={userId}
              fieldName="first_name"
            />

            <EditableInput
              type="text"
              label="Middle Name:"
              value={userData.middle_name}
              handleSave={usersDynamicUpdate}
              elementId={userId}
              fieldName="middle_name"
            />

            <EditableInput
              type="text"
              label="Last Name:"
              value={userData.last_name}
              handleSave={usersDynamicUpdate}
              elementId={userId}
              fieldName="last_name"
            />

            <NotEditableField
              label="Function:"
              value={userData.user_level_name}
            />

            <CustomSwitch
              label="Confirmed:"
              value={userData.is_confirmed}
              handleSave={usersDynamicUpdate}
              elementId={userId}
              fieldName="is_confirmed"
            />

            <NotEditableField
              label="Birthday:"
              value={dateFormatting(userData.birthday, 'mmdy')}
            />

            <EditableInput
            type="text"
              label="Address:"
              value={userData.address}
              handleSave={usersDynamicUpdate}
              elementId={userId}
              fieldName="address"
            />
          </>
        ) : (
          'Loading'
        )}
      </Row>
    </MainBody>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.usersData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    usersDynamicUpdate: (elementId, fieldName, newValue) =>
      dispatch(usersDynamicUpdate(elementId, fieldName, newValue)),
    getUserData: userId => dispatch(getUserData(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateModule);
