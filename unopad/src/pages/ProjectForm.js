import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Button } from 'react-bootstrap';

import { addProjectAction } from '../store/project/projectActions';

function ProjectForm({ ...props }) {
  const { addProject } = props;
  const [state, setState] = useState({
    project_name: '',
    project_number_of_participants: '',
    project_nameErr: '',
    project_number_of_participantsErr: '',
    project_number_of_registrations: '',
    project_number_of_registrationsErr: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { project_name, project_number_of_participants, project_number_of_registrations } = state;

    let valid = true;

    if (project_name === '') {
      setState({
        project_nameErr: 'project_name cannot be blank.',
      });
      valid = false;
    }

    if (project_number_of_participants === '') {
      setState({
        project_number_of_participantsErr: 'project_number_of_participants cannot be blank.',
      });
      valid = false;
    }
    if (project_number_of_registrations === '') {
      setState({
        project_number_of_registrationsErr: 'project_number_of_registrations cannot be blank.',
      });
      valid = false;
    }

    if (valid) {
      const data = {
        project_name,
        project_number_of_participants,
        project_number_of_registrations,
      };

      addProject(data);

      setState({
        project_name: '',
        project_number_of_participants: '',
        project_nameErr: '',
        project_number_of_participantsErr: '',
        project_number_of_registrations: '',
        project_number_of_registrationsErr: '',
      });
    }
  };

  const handleChange = (e) => {
    setState({
      [e.target.id]: e.target.value,
      [e.target.id + 'Err']: '',
    });
  };

  const {
    project_name,
    project_number_of_participants,
    project_nameErr,
    project_number_of_participantsErr,
    project_number_of_registrations,
    project_number_of_registrationsErr,
  } = state;

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label htmlFor="project_name">project_name</Form.Label>
        <Form.Control id="project_name" value={project_name} onChange={handleChange} />
        <span id="project_nameErr" style={{ color: 'red', fontSize: '12px' }}>
          {project_nameErr}
        </span>
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="project_number_of_participants">
          project_number_of_participants
        </Form.Label>
        <Form.Control
          id="project_number_of_participants"
          value={project_number_of_participants}
          onChange={handleChange}
        />
        <span id="project_number_of_participantsErr" style={{ color: 'red', fontSize: '12px' }}>
          {project_number_of_participantsErr}
        </span>
      </FormGroup>

      <FormGroup>
        <Form.Label htmlFor="project_number_of_registrations">
          project_number_of_registrations
        </Form.Label>
        <Form.Control
          id="project_number_of_registrations"
          value={project_number_of_registrations}
          onChange={handleChange}
        />
        <span id="project_number_of_registrationsErr" style={{ color: 'red', fontSize: '12px' }}>
          {project_number_of_registrationsErr}
        </span>
      </FormGroup>
      <Button type="submit" color="primary">
        Add
      </Button>
    </Form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (data) => {
      dispatch(addProjectAction(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProjectForm);
