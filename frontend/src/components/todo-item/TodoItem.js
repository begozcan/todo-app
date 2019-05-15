import {Checkbox, Icon} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {changeTodoStatus, removeTodo} from '../../actions/todo';
import './TodoItem.scss';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onCheckboxChange(event) {
        this.props.changeTodoStatus(this.props.todo._id, event.target.checked);
    }

    onDeleteClick() {
        this.props.removeTodo(this.props.todo._id);
    }

    render() {
        const todo = this.props.todo;

        return (
            <div className="todo-item">
                <Checkbox checked={todo.isComplete}
                          onChange={this.onCheckboxChange}>
                    {todo.title}
                </Checkbox>
                <Icon type="delete" className="delete-icon" onClick={this.onDeleteClick}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeTodoStatus: (id, isComplete) => dispatch(changeTodoStatus(id, isComplete)),
        removeTodo: (id) => dispatch(removeTodo(id))
    }
}

export default connect(null, mapDispatchToProps)(TodoItem);
