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
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { mutate: login, isPending } = useLoginQuery()
  const [loginText, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleLogin() {
    if (loginText && password) {
      login({ login: loginText, password }, {
        onSuccess: () => {
          navigate("/")
        }
      })
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
        <Button loading={isPending} fullWidth mt="xl" size="md" onClick={handleLogin}>
          Войти
        </Button>
      </Paper>
    </div>
  );
}
export default LoginPage