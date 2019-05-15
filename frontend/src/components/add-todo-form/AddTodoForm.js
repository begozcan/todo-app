import {Button, Form, Input} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../../actions/todo';

class AddTodo extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addTodo(values.title);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="todo-item">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('title')(
                            <Input
                                placeholder="Buy some eggs..."
                            />,
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
        addTodo: (title) => dispatch(addTodo(title))
    };
}

const AddTodoForm = Form.create({name: 'add_todo'})(AddTodo);
export default connect(null, mapDispatchToProps)(AddTodoForm);

