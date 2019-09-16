import React , {Component} from 'react';
import {add_Reminder , remove_Reminder , clear_Reminder} from "../actions";
import {connect} from "react-redux";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import logo from "../reminder.png";
class App extends Component{
    state = {
        text :'',
        date : ''
    }

    render_Reminders = () => {
        const {reminders} = this.props;
        return (
            <ul className = "list-group">
                {
                    reminders.map(reminder => {
                        return (
                            <li className = "list-group-item">
                                <div>{reminder.text}</div>
                                <div>{moment(new Date(reminder.date)).fromNow()}</div>
                                <div className = "closeIcon remove btn btn-danger" onClick = { () => {this.props.remove_Reminder(reminder.id)}}>X</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render(){
        return (
            <div className = "App">
                <img src = {logo}/>
                <div className = "reminder-title">
                    <h2>What Should U Do ?</h2>
                </div>
                <input className = "form-control" type = "text" value = {this.state.text} placeholder = "Enter What U Think...." onChange = { (e) => this.setState({text : e.target.value})}/>

                <DatePicker 
                    value = {this.state.date}
                    className = "form-control" 
                    selected = {this.state.date}
                    placeholderText = "Enter Date"
                    onChange = {(date) => {this.setState({date:date})}}
                    showTimeSelect
                    timeFormat = "HH:mm"
                    dateFormat = "MMM d, yyyy h:mm aa"
                    timeCaption = "time"
                />

                <button className = "btn btn-primary btn-block" 
                onClick = { () => {
                    this.props.add_Reminder(this.state.text,this.state.date) 
                    this.setState({text : '' , date : ''})
                }}>Add Reminder</button>

                {this.render_Reminders()}

                <button className = "btn btn-danger btn-block clearReminder" onClick = { () => {this.props.clear_Reminder()}}>Clear Reminder</button>
            </div>
        )
    }
}

/*function mapDispatchToProps(dispatch){
    return {
        add_Reminder : () => dispatch(add_Reminder())
    }
}*/

function mapStateToProps(state){
    return {
        reminders : state
    }
}

export default connect(mapStateToProps , {add_Reminder , remove_Reminder , clear_Reminder})(App);