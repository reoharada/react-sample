import React from 'react';
import axios from 'axios';

// export entry application component
export class App extends React.Component {

    email = '';

    constructor() {
        console.log( 'App.constructor()' );
        super();
        this.findData();
        this.state = {
            email: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    findData() {
        console.log('findData');
        const axiosGet = axios.get('https://script.google.com/macros/s/AKfycbwYl0Pf1tp-R_n1MiLq4vJq7foltArAlgpmutE5nrKcuuSXnuMZnU0CsjDCz9cJi1O0OQ/exec');
        axiosGet.then( res => {
            console.log(res.data.mail);
            const newState = { email: res.data.mail };
            this.setState(newState);
        }).catch( error => {
            console.log(error);
        });
    }

    handleChange(event) {
        this.email = event.target.value;
    }

    handleClick(event) {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({ email: '通信中' });
        event.preventDefault();
        const inputEmail = this.email;
        const axiosPost = axios.post('http://localhost:9000/api', {email: inputEmail});
        axiosPost.then( res => {
            console.log(res.status);
            this.setState({ email: inputEmail });
        } ).catch( error => {
            this.setState({ email: '失敗' });
            console.log(error);
        });
    }

    // render view
    render() {
        const text = this.state.email ? this.state.email : '読込中';

        return (
            <div className='ui-app'>
                <p>{text}</p>
                <form>
                  <input name='email' type='text' onChange={this.handleChange} />
                  <button onClick={this.handleClick}>送信</button>
                </form>
            </div>
        );
    }
}
