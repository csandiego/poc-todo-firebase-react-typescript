import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default class Todo {

    constructor(public todo: string, public completed = false, readonly id?: string) { }

    static converter = {
        toFirestore: (todo: Todo) => ({ todo: todo.todo, completed: todo.completed }),
        fromFirestore: (snapshot: firebase.firestore.DocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
            const data = snapshot.data(options)!;
            return new Todo(data.todo, data.completed, snapshot.id)
        }
    }

}