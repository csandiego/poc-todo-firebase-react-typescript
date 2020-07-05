import React from 'react';

const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  window.open('/login/picker', 'Login', 'width=450,height=600');
};

export default (props: any) => {
  return (
    <section>
      <button onClick={onClick}>Login</button>
    </section>
  );
};