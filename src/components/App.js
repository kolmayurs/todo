import React from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { todoData, removeTodo } from '../action/action';

const mapStateToProps = (state) => {
    return {
        todo: state.todo.todo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ todoData, removeTodo }, dispatch)
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }
    componentDidMount() {}
    add() {
        if (this.props.todo && this.props.todo.length > 0) {
            this.props.todoData(parseInt(this.props.todo[this.props.todo.length - 1].id) + 1, this.state.text, 'Pending');

        } else {
            this.props.todoData(parseInt(0), this.state.text, 'Pending');
        }

        this.setState({ text: '' });
    }

    remove(id) {
        this.props.removeTodo(id);
    }

    render() {
        const list = this.props.todo.map((items, key) => {
            return (
                <li key={'id_'+key}> <div className="round">
    <input type="checkbox" id={'checkbox_'+key} defaultChecked={(items.status === 'Pending'?false:true)} />
    <label htmlFor={'checkbox_'+key}></label>
  </div>||{items.id} || {items.text} || {items.status} || <span onClick={this.remove.bind(this,items.id)}>X</span></li>
            )
        })
        return (
            <div className="App">
      <input type="text" value={this.state.text} onChange={e => {this.setState({text: e.target.value})}} />
      <button onClick={this.add.bind(this)}>Submit</button>
      <div>List:</div>
      <ol>{list}</ol>

    </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);