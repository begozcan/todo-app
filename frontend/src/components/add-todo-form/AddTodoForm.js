import {Button, DatePicker, Form, Input} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../../actions/todo';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const dueDate = values.dueDate ? values.dueDate.format('YYYY-MM-DD HH:mm') : undefined;
                this.props.addTodo(values.title, dueDate);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="todo-item add-todo-form">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item label="Title">
                        {getFieldDecorator('title', {rules: [{required: true, message: 'Please input a title!'}]})(
                            <Input
                                placeholder="Buy milk"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="Due Date">
                        {getFieldDecorator('dueDate')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm"/>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: (title, dueDate) => dispatch(addTodo(title, dueDate))
    };
}

const AddTodoForm = Form.create({name: 'add_todo'})(AddTodo);
export default connect(null, mapDispatchToProps)(AddTodoForm);

