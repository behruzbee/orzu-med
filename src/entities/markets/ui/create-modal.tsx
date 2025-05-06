import { Modal, TextInput, Textarea, Button, Stack } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useCreateMarketQuery } from 'entities/markets/api/query'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
        name: z.string().min(2, 'Минимум 2 символа'),
        description: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const CreateMarketModal = ({ open, close }: { open: boolean, close: VoidFunction }) => {
        const { mutate, isPending } = useCreateMarketQuery()

        const {
                register,
                handleSubmit,
                reset,
                formState: { errors },
        } = useForm<FormValues>({
                resolver: zodResolver(schema),
        })

        const onSubmit = (values: FormValues) => {
                mutate(
                        { ...values },
                        {
                                onSuccess: () => {
                                        reset()
                                        close()
                                },
                        }
                )
        }

        return (
                <Modal
                        opened={open}
                        onClose={close}
                        title="Добавить новый филиал"
                        centered
                        size="md"
                        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
                >
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack>
                                        <TextInput
                                                label="Название"
                                                placeholder="Например: Центральный рынок"
                                                {...register('name')}
                                                error={errors.name?.message}
                                                withAsterisk
                                        />

                                        <Textarea
                                                label="Описание"
                                                placeholder="Дополнительная информация (необязательно)"
                                                {...register('description')}
                                                error={errors.description?.message}
                                        />

                                        <Button type="submit" loading={isPending}>
                                                Сохранить
                                        </Button>
                                </Stack>
                        </form>
                </Modal>
        )
}

export default CreateMarketModal
