import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import Todo from './Todo';

interface State {
  todos: Todo[];
}

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  firebase.firestore().collection('users').doc(firebase.auth().currentUser!.uid)
    .collection('todos').doc(e.target.value).update({ completed: e.target.checked });
};

export default class extends React.Component<any, State> {

  state = { todos: [] }

  unsubscribe: (() => void) | null = null;

  componentDidMount() {
    const db = firebase.firestore();
    this.unsubscribe = db.collection('users').doc(firebase.auth().currentUser!.uid)
      .collection('todos').withConverter(Todo.converter).onSnapshot(snapshot => {
        const todos = snapshot.docs.map(s => s.data());
        this.setState({ ...this.state, todos: todos });
      });
  }

  componentWillUnmount() {
    this.unsubscribe?.();
  }

  render() {
    return (
      <ul>
        {this.state.todos.map((todo: Todo, index: number, todos: Todo[]) => (
          <li key={index}>
            <input type="checkbox" onChange={onChange} value={todo.id} checked={todo.completed} />
            {todo.todo}
          </li>
        ))}
      </ul>
    );
  }

};