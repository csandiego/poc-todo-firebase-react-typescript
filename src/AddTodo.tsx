import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import Todo from './Todo';

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    firebase.firestore().collection('users').doc(firebase.auth().currentUser!.uid)
        .collection('todos').withConverter(Todo.converter).add(
            new Todo((form.elements.namedItem('todo') as HTMLInputElement).value)
        );
    form.reset();
}

export default (props: any) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="What do you want to do?" name="todo" required />
        </form>
    );
};