import axios from 'axios';
import React, { FormEvent, VFC } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

const Login: VFC = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get('/')
      .then((res) => console.log(res))
      .catch((err) => console.dir(err));
  }, []);

  const onChangeUserid = useCallback(() => {}, []);
  const onChangePassword = useCallback(() => {}, []);

  return (
    <div>
      Login PAGE
      <form onSubmit={onSubmit}>
        <input type="text" value={userid} onChange={onChangeUserid} />
        <input type="text" value={password} onChange={onChangePassword} />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
