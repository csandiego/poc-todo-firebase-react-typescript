import * as firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
  callbacks: {
    signInSuccessWithAuthResult: () => {
      window.close();
      return false;
    }
  },
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: 'select_account'
      }
    }

  ]
};

export default (props: any) => <StyledFirebaseAuth uiConfig={config} firebaseAuth={firebase.auth()} />;
