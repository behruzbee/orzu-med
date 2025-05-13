import { Avatar, Button, Card, Flex, Group, LoadingOverlay, Overlay, ScrollArea, Table, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconTrash } from "@tabler/icons-react"
import { CreateUserModal, useDeleteUserQuery, useGetUsersQuery } from "entities/user"
import { сheckPermissions } from "shared/helpers/check-permissions"

const AccountPage = () => {
  const { data: users } = useGetUsersQuery()
  const { mutate: deleteUser } = useDeleteUserQuery()
  const [opened, { close, open }] = useDisclosure(false)

  if (!users) {
    return <LoadingOverlay />
  }

  const rows = users.map((item) => {
    return (
      <Table.Tr key={item.id} >
        <Table.Td>
          {item.id}
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} radius={26} />
            <Text size="sm" fw={500}>
              {item.login}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.password}</Table.Td>
        <Table.Td>{item?.role.name || "не найден"}</Table.Td>
        {item?.role.name !== "admin" && <Table.Td>
          <Button onClick={() => deleteUser(item.id)} size="compact-sm" color="red">
            <IconTrash size={18} />
          </Button>
        </Table.Td>}
      </Table.Tr>
    );
  });

  return (
    <>
      {сheckPermissions("accaount") || <Overlay color="#000" backgroundOpacity={0.2} blur={12} />}
      <Flex justify="space-between" align="center" mb="md">
        <Title order={2}>Пользователи</Title>
        <Button color="green" onClick={open}>Создать пользователя </Button>
        <CreateUserModal close={close} open={opened} />
      </Flex>
      <Card maw="98%" shadow="sm" padding="lg" radius="md" withBorder>
        <ScrollArea>
          <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={40}>
                  ID
                </Table.Th>
                <Table.Th>Login</Table.Th>
                <Table.Th>Хешированный пароль</Table.Th>
                <Table.Th>Роль</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </>
  )
}

export default AccountPage