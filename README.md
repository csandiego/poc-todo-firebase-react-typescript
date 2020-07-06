A simple todo web app written using TypeScript, React and Firebase.

## Setup

### 1. Create a Firebase project and register a web app

Instructions can be found [here](https://firebase.google.com/docs/web/setup). Only steps 1 and 2 are required, but take note of the Firebase config object.

### 2. Enable Google Sign-In

In the **Auth** section of the [Firebase console](https://console.firebase.google.com/), under the **Sign in method** tab, enable the **Google** sign in method.

### 3. Get the code and add the Firebase config

In the project root directory, run `npm install`. Then create a `/src/config.ts` file that exports the Firebase config object as the default.

```
const firebaseConfig = {
    // ...
};

export default firebaseConfig;
```

### 4. Run `npm start`

After starting the dev server, a web browser will load `http://localhost:3000`.

## Tech Stack

* [TypeScript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* Firebase [Auth](https://firebase.google.com/products/auth) and [Cloud Firestore](https://firebase.google.com/products/firestore)