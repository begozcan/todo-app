import {Dropdown, Icon, Menu} from 'antd';
import * as React from 'react';
import {TodoItem} from '../todo-item/TodoItem';
import './TodoList.scss';

export class TodoList extends React.Component {
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

        return (
            <div className="todo-list-container">
                <div className="header">
                    <Dropdown overlay={filters} className="filter-dropdown">
                        <a className="ant-dropdown-link" href="#">
                            Filter <Icon type="down"/>
                        </a>
                    </Dropdown>
                    <h1>To-Do List</h1>
                    <Icon type="plus" className="add-icon"/>
                </div>
                <hr/>
                <div className="todo-list">
                    <TodoItem/>
                    <TodoItem/>
                    <TodoItem/>
                    <TodoItem/>
                    <TodoItem/>
                </div>
            </div>
        );
    }
}
