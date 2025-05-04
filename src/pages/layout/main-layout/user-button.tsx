import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'
import classes from "./styles.module.scss"

export const UserButton = () => {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Harriette Spoonlicker
          </Text>

          <Text c="dimmed" size="xs">
            hspoonlicker@outlook.com
          </Text>
        </div>

      </Group>
    </UnstyledButton>
  )
}

