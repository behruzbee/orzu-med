import { Modal, TextInput, Button, Stack, LoadingOverlay, MultiSelect } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useGetMarketsQuery } from 'entities/markets/api/query'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateRoleQuery } from 'entities/role'
import { useCreateUserQuery } from '../api/query'
import { useState } from 'react'
import { useGetPermissionsQuery } from 'entities/permissions'

const schema = z.object({
        login: z.string().min(6, 'Минимум 6 символа'),
        password: z.string().min(6, 'Минимум 6 символа'),
})

type FormValues = z.infer<typeof schema>

const CreateUserModal = ({ open, close }: { open: boolean, close: VoidFunction }) => {
        const { mutate: createRole, isPending: isPendingRole } = useCreateRoleQuery()
        const { mutate: createUser, isPending } = useCreateUserQuery()
        const { data: permissisons } = useGetPermissionsQuery()
        const [orders, setOrders] = useState<string[]>([])
        const { data: markets } = useGetMarketsQuery()


        if (!markets) {
                return <LoadingOverlay />
        }

        const {
                register,
                handleSubmit,
                reset,
                formState: { errors },
        } = useForm<FormValues>({
                resolver: zodResolver(schema),
        })

        const onSubmit = (values: FormValues) => {
                if (orders.length > 0) {
                        // @ts-ignore
                        createRole({ name: `User-${Math.floor(Math.random() * 100)}`, permissionsMarket: JSON.stringify(orders), permissionIds: [...permissisons.map(item => item.id)] }, {
                                onSuccess: (data) => {
                                        // @ts-ignore
                                        createUser({ login: values.login, password: values.password, roleId: String(data.data.id) }, {
                                                onSuccess: () => {
                                                        reset()
                                                        close()
                                                }
                                        })

                                }
                        })
                }
        }

        return (
                <Modal
                        opened={open}
                        onClose={close}
                        title="Добавить новый пользователья"
                        centered
                        size="md"
                        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
                >
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack>
                                        <TextInput
                                                label="Login"
                                                placeholder="Например: login1234"
                                                {...register('login')}
                                                error={errors.login?.message}
                                                withAsterisk
                                        />

                                        <TextInput
                                                label="Пароль"
                                                placeholder="Например: 12345678"
                                                {...register('password')}
                                                error={errors.password?.message}
                                                withAsterisk
                                        />

                                        <MultiSelect
                                                label="Филиал"
                                                placeholder="Разришенены"
                                                onChange={(e) => setOrders(e)}
                                                data={markets.map(market => (
                                                        market.name
                                                ))}
                                                comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                                        />

                                        <Button type="submit" loading={isPending || isPendingRole}>
                                                Сохранить
                                        </Button>
                                </Stack>
                        </form>
                </Modal>
        )
}

export default CreateUserModal
