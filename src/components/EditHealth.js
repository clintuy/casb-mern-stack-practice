import React, { Component } from 'react';
import Axios from 'axios';

export default class EditHealth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            temperature: '',
            email: '',
            contact: ''
        }
    }

    componentDidMount() {

        Axios.get(`http://localhost:5000/health/show/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    firstname: res.data.message.firstname,
                    lastname: res.data.message.lastname,
                    temperature: res.data.message.temperature,
                    email: res.data.message.email,
                    contact: res.data.message.contact
                })
            })
            .catch(err => console.log("Error : " + err)); 
    }

    onValueChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        })
    }

    createSubmit = (e) => {
        e.preventDefault();

        const healthDetails = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            temperature: this.state.temperature,
            email: this.state.email,
            contact: this.state.contact
        }
        
        Axios.post(`http://localhost:5000/health/update/${this.props.match.params.id}`, healthDetails)
            .then(res => {
                res.data.status === "SUCCESS" ? window.location = "/" : alert(res.data.message);
            })
            .catch(err => console.log("Error : " + err)); 
    }

    render () {
        return (
            <div className="container">
                <h1>Update Health</h1>

                <form onSubmit={this.createSubmit}>

                    {/* Firstname */}
                    <div className="form-group">
                        <label>First Name</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="firstname"  
                            value={this.state.firstname} 
                            onChange={this.onValueChange} 
                            required
                        />
                    </div>

                    {/* Lastname */}
                    <div className="form-group">
                        <label>Last Name</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="lastname"  
                            value={this.state.lastname} 
                            onChange={this.onValueChange} 
                            required
                        />
                    </div>

                    {/* Temperature */}
                    <div className="form-group">
                        <label>Temperature</label>
                        <input 
                            className="form-control" 
                            type="number"
                            step="0.1" 
                            name="temperature"  
                            value={this.state.temperature} 
                            onChange={this.onValueChange} 
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            name="email"  
                            value={this.state.email} 
                            onChange={this.onValueChange} 
                            required
                        />
                    </div>

                    {/* Contact */}
                    <div className="form-group">
                        <label>Contact</label>
                        <input 
                            className="form-control" 
                            type="tel" 
                            name="contact"  
                            value={this.state.contact} 
                            onChange={this.onValueChange} 
                            required
                        />
                    </div>

                    {/* Button Create */}
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        )
    }
}