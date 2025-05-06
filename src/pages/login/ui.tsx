import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './styles.module.scss'
import { useLoginQuery } from 'entities/auth';
import { useState } from 'react';

function LoginPage() {
  const { mutate: login } = useLoginQuery()
  const [loginText, setLogin] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin() {
    if (loginText && password) {
      login({ login: loginText, password })
    }
  }



  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Orzu Medical Center!
        </Title>

        <TextInput value={loginText} onChange={(e) => setLogin(e.target.value)} label="Логин" required placeholder="hello@gmail.com" size="md" />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Пароль" required placeholder="Your password" mt="md" size="md" />
        <Button fullWidth mt="xl" size="md" onClick={handleLogin}>
          Войти
        </Button>
      </Paper>
    </div>
  );
}
export default LoginPage