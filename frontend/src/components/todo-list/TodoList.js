import {Dropdown, Icon, Menu} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {fetchTodos} from '../../actions/todo';
import AddTodoForm from '../add-todo-form/AddTodoForm';
import TodoItem from '../todo-item/TodoItem';
import './TodoList.scss';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {addTodoFormVisible: false};

        this.toggleAddTodoFormVisible = this.toggleAddTodoFormVisible.bind(this);
    }

    componentDidMount() {
        this.props.fetchTodos();
    }

    toggleAddTodoFormVisible() {
        this.setState({addTodoFormVisible: !this.state.addTodoFormVisible})
    }

    render() {
        const filters = (
            <Menu>
                <Menu.Item>Today</Menu.Item>
                <Menu.Item>Complete</Menu.Item>
                <Menu.Item>Overdue</Menu.Item>
                <Menu.Divider />
                <Menu.Item>Clear</Menu.Item>
            </Menu>
        );

        const todos = this.props.todos.map(todo => {
            return <TodoItem todo={todo} isComplete={todo.isComplete} key={todo._id}/>
        });

        return (
            <div className="todo-list-container">
                <div className="header">
                    <Dropdown overlay={filters} className="filter-dropdown">
                        <a className="ant-dropdown-link" href="#">
                            Filter <Icon type="down"/>
                        </a>
                    </Dropdown>
                    <h1>To-Do List</h1>
                    <Icon type="plus" className="add-icon" onClick={this.toggleAddTodoFormVisible}/>
                </div>
                <hr/>
                <div className="todo-list">
                    {this.state.addTodoFormVisible && <AddTodoForm/>}
                    {todos}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {todos: state.todos};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTodos: () => dispatch(fetchTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
