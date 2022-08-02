import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Button } from 'react-bootstrap';

import { addProjectAction } from '../store/project/projectActions';

class ProjectForm extends Component {
  state = {
    project_name: '',
    project_number_of_participants: '',
    project_nameErr: '',
    project_number_of_participantsErr: '',
    project_number_of_registrations: '',
    project_number_of_registrationsErr: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { project_name, project_number_of_participants, project_number_of_registrations } =
      this.state;

    let valid = true;

    if (project_name === '') {
      this.setState({
        project_nameErr: 'project_name cannot be blank.',
      });
      valid = false;
    }

    if (project_number_of_participants === '') {
      this.setState({
        project_number_of_participantsErr: 'project_number_of_participants cannot be blank.',
      });
      valid = false;
    }
    if (project_number_of_registrations === '') {
      this.setState({
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

      this.props.addProject(data);

      this.setState({
        project_name: '',
        project_number_of_participants: '',
        project_nameErr: '',
        project_number_of_participantsErr: '',
        project_number_of_registrations: '',
        project_number_of_registrationsErr: '',
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      [e.target.id + 'Err']: '',
    });
  };

  render() {
    const {
      project_name,
      project_number_of_participants,
      project_nameErr,
      project_number_of_participantsErr,
      project_number_of_registrations,
      project_number_of_registrationsErr,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Form.Label htmlFor="project_name">project_name</Form.Label>
          <Form.Control id="project_name" value={project_name} onChange={this.handleChange} />
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
            onChange={this.handleChange}
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
            onChange={this.handleChange}
          />
          <span id="project_number_of_registrationsErr" style={{ color: 'red', fontSize: '12px' }}>
            {project_number_of_registrationsErr}
          </span>
        </FormGroup>

        {/* <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            type="textarea"
            value={description}
            id="description"
            onChange={this.handleChange}
            rows="5"
          />
          <span id="descriptionErr" style={{ color: 'red', fontSize: '12px' }}>
            {descriptionErr}
          </span>
        </FormGroup> */}

        <Button type='submit' color="primary">Add</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  //store.dispatch
  return {
    addProject: (data) => {
      dispatch(addProjectAction(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProjectForm);
