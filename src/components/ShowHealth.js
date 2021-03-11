import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Health = (props) => {
    return(
        <tr>
            <td>{props.health.firstname}</td>
            <td>{props.health.lastname}</td>
            <td>{props.health.temperature}</td>
            <td>{props.health.email}</td>
            <td>{props.health.contact}</td>
            <td className="text-center">
                <Link className="btn btn-sm btn-primary" to={`/edit/${props.health._id}`}>Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => props.deleteHealth(props.health._id)}>Delete</button>
            </td>
        </tr>
    )
}

export default class ShowHealth extends Component {

    constructor(props) {
        super(props)

        this.deleteHealth = this.deleteHealth.bind(this);
        this.state = {healthLists: []}
        
    }

    componentDidMount() {

        Axios.get('http://localhost:5000/health')
            .then(res => {
                this.setState({healthLists: res.data.message})
            })
            .catch(err => console.log("Error : " + err)); 
    }

    deleteHealth = (id) => {
        Axios.delete(`http://localhost:5000/health/delete/${id}`)
            .then(res => console.log(res.data.message))
            .catch(err => console.log("Error : " + err)); 

            this.setState({
                healthLists: this.state.healthLists.filter(el => el._id !== id)
            })
    }

    healthDeclarations = () => {

        return this.state.healthLists.map(healthList => {
            return <Health 
                    key={healthList._id} 
                    health={healthList} 
                    deleteHealth={this.deleteHealth}  />
        })
    }

    render () {
        return (
            <div className="container">
                <h1>Health List</h1>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Temperature</th>
                                <th>Email Address</th>
                                <th>Contact No</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.healthDeclarations()} 
                        </tbody>

                    </table>
                </div>
                
            </div>
        )
    }
}