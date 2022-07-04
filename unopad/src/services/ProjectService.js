import axios from 'axios'
import * as service from './UserService'



/**
 * 
 * @param {project_name, project_number_of_participants, project_number_of_registrations} data 
 */
export const addProject = (data) => {
    // data.date = new Date()
    // data.completed = false
    const access_token = service.checkUser()['token']
    
    const response = fetch(process.env.REACT_APP_API_URL+'/api/projects',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' +  access_token},
        body: JSON.stringify(data)
    }
    )
    
    return response
    
}

