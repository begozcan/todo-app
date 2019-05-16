import {Dropdown, Icon, Menu} from 'antd';
import moment from 'moment';
import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import {fetchTodos} from '../../actions/todo';
import {toggleShowAddForm} from '../../actions/ui';
import AddTodoForm from '../add-todo-form/AddTodoForm';
import TodoItem from '../todo-item/TodoItem';
import './TodoList.scss';

const FILTER_ALL = 'All';
const FILTER_TODAY = 'Today';
const FILTER_COMPLETE = 'Complete';
const FILTER_OVERDUE = 'Overdue';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {currentFilter: FILTER_ALL};

        this.setCurrentFilter = this.setCurrentFilter.bind(this);
        this.filterTodos = this.filterTodos.bind(this);
        this.toggleAddFormVisible = this.toggleAddFormVisible.bind(this);
    }

    componentDidMount() {
        this.props.fetchTodos();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // If new todos were added, clear the filter
        if (nextProps.todos.length > this.props.todos.length) {
            this.setState(Object.assign({}, this.state, {currentFilter: FILTER_ALL}));
        }
    }

    setCurrentFilter(filter) {
        this.setState(Object.assign({}, this.state, {currentFilter: filter}));
    }

    filterTodos() {
        if (!this.props.todos || this.props.todos.length === 0) {
            return [];
        }

        const today = moment();

        switch (this.state.currentFilter) {
            case FILTER_TODAY:
                return this.props.todos.filter(todo => moment(todo.dueDate).isSame(today.startOf('day'), 'd'));
            case FILTER_COMPLETE:
                return this.props.todos.filter(todo => todo.isComplete);
            case FILTER_OVERDUE:
                return this.props.todos.filter(todo => !todo.isComplete && moment(todo.dueDate).isBefore(today));
            case FILTER_ALL:
                return this.props.todos;
            default:
                return this.props.todos;
        }
    }

    toggleAddFormVisible() {
        this.props.toggleShowAddForm(!this.props.showAddForm);
    }

    render() {
        const filters = (
            <Menu>
                <Menu.Item onClick={() => this.setCurrentFilter(FILTER_TODAY)}>Today</Menu.Item>
                <Menu.Item onClick={() => this.setCurrentFilter(FILTER_COMPLETE)}>Complete</Menu.Item>
                <Menu.Item onClick={() => this.setCurrentFilter(FILTER_OVERDUE)}>Overdue</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => this.setCurrentFilter(FILTER_ALL)}>Clear</Menu.Item>
            </Menu>
        );

        const todos = this.filterTodos().map(todo => {
            return <TodoItem todo={todo} isComplete={todo.isComplete} key={todo._id}/>
        });

        return (
            <div className="todo-list-container">
                <div className="header">
                    <Dropdown overlay={filters} className="filter-dropdown">
                        <a className="ant-dropdown-link" href="#">
                            {this.state.currentFilter} <Icon type="down"/>
                        </a>
                    </Dropdown>
                    <h1>To-Do List</h1>
                    <Icon type="plus" className="add-icon" onClick={this.toggleAddFormVisible}/>
                </div>
                <hr/>
                <div className="todo-list">
                    <ReactCSSTransitionGroup
                        transitionName="slide"
                        transitionEnterTimeout={300}
                        transitionLeave={false}>
                        {this.props.showAddForm && <AddTodoForm/>}
                    </ReactCSSTransitionGroup>

                    {todos.length > 0 ?
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            {todos}
                        </ReactCSSTransitionGroup> :
                        <div className="no-data-container">
                            <Icon type="inbox" className="no-data-icon"/>
                            <p>No items</p>
                        </div>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {todos: state.todos, showAddForm: state.ui.showAddForm};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTodos: () => dispatch(fetchTodos()),
        toggleShowAddForm: (status) => dispatch(toggleShowAddForm(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
