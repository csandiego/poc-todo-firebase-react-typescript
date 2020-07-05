import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    firebase.firestore().collection('users').doc(firebase.auth().currentUser!.uid).collection('todos').add({
        todo: (form.elements.namedItem('todo') as HTMLInputElement).value,
        completed: false
    });
    form.reset();
}

export default (props: any) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="todo" required />
        </form>
    );
};