import {Checkbox} from 'antd';
import * as React from 'react';
import './TodoItem.scss';

export class TodoItem extends React.Component {
    render() {
        return (
            <div className="todo-item">
                <Checkbox>To do Item</Checkbox>
            </div>
        );
    }
}
