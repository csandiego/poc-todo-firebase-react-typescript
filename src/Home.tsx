import * as firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

export default (props: any) => {
  return (
    <section>
      <AddTodo />
      <TodoList />
      <button onClick={e => firebase.auth().signOut()}>Logout</button>
    </section>
  );
};