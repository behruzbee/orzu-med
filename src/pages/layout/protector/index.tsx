import { Navigate, Outlet } from 'react-router-dom';
import { Box, Card, Flex } from '@mantine/core';
import { DoubleNavbar } from 'widgets/navbar';
import { useGetMeQuery } from 'entities/auth';

const ProtectorLayout = () => {
        const { data: me } = useGetMeQuery()

        if (!me?.id) {
                return <Navigate to="/login" />
        }

        return (
                <Flex w="100%" mih="100vh">
                        <DoubleNavbar />
                        <Box w="100%" px={20}>
                                <Card mt="md" maw="98%" shadow="sm" padding="lg" radius="md" withBorder>
                                        <Outlet />
                                </Card>
                        </Box>
                </Flex>
        )
}

export default ProtectorLayout