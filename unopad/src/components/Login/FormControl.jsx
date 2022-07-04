import React from 'react'
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap'

const FormControl = props => {
    const { label, type, error, handleChange, value } = props
    const name = label.toLowerCase()

    return (
        <FormGroup>
            <Label for={name}  style={{marginTop:"10px"}}>{label}</Label>
            <Input
                type={type}
                id={name}
                invalid={!!error}
                onChange={handleChange}
                value={value}
            />
            <FormFeedback>{error}</FormFeedback>
        </FormGroup>
    )
}

export default FormControl