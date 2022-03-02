
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



export default class UserTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.showroom}</td>
                <td>{this.props.obj.employeeId}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.mobile}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.role}</td>
                <td>
                    <Link className="edit-link" to={"/Users/" + this.props.obj.showroom
                    + "/" + this.props.obj.employeeId

                    + "/" + this.props.obj.name
                    + "/" + this.props.obj.mobile
                    + "/" + this.props.obj.email

                    + "/" + this.props.obj.role
                    }>
                        Edit
                    </Link>
                    &nbsp;
                    <Button
                        size="sm" variant="danger">Delete</Button>

                </td>
            </tr>
        );
    }
}
