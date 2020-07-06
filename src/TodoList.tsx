import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import Todo from './Todo';

enum Filter {
  All,
  Completed,
  Active
}

interface State {
  filter: Filter;
  todos: Todo[];
}

export default class extends React.Component<any, State> {

  state = { filter: Filter.All, todos: [] };

  unsubscribe: (() => void) | null = null;

  componentDidMount() {
    const db = firebase.firestore();
    this.unsubscribe = db.collection('users').doc(firebase.auth().currentUser!.uid)
      .collection('todos').withConverter(Todo.converter).onSnapshot(this.onSnapshot);
  }

  componentWillUnmount() {
    this.unsubscribe?.();
  }

  onSnapshot = (s: firebase.firestore.QuerySnapshot<Todo>) => {
    this.setState({ ...this.state, todos: s.docs.map(d => d.data()) });
  }

  onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const filter: Filter = Number((e.target as HTMLButtonElement).value);
    this.unsubscribe?.();
    const collection = firebase.firestore().collection('users').doc(firebase.auth().currentUser!.uid)
      .collection('todos').withConverter(Todo.converter);
    if (filter === Filter.All) {
      this.unsubscribe = collection.onSnapshot(this.onSnapshot);
    } else {
      this.unsubscribe = collection.where('completed', '==', filter === Filter.Completed).onSnapshot(this.onSnapshot);
    }
    this.setState({ ...this.state, filter: filter});
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser!.uid)
      .collection('todos').doc(e.target.value).update({ completed: e.target.checked });
  };

  render() {
    return (
      <React.Fragment>
        <ul>
          <li><button onClick={this.onClick} value={Filter.All}>All</button></li>
          <li><button onClick={this.onClick} value={Filter.Completed}>Completed</button></li>
          <li><button onClick={this.onClick} value={Filter.Active}>Active</button></li>
        </ul>
        <ul>
          {this.state.todos.map((todo: Todo, index: number, todos: Todo[]) => (
            <li key={index}>
              <input type="checkbox" onChange={this.onChange} value={todo.id} checked={todo.completed} />
              {todo.todo}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }

};