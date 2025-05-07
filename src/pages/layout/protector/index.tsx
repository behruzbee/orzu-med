import { Navigate, Outlet } from 'react-router-dom';
import { Box, Card, Flex, LoadingOverlay } from '@mantine/core';
import { DoubleNavbar } from 'widgets/navbar';
import { useGetMeQuery } from 'entities/auth';

const ProtectorLayout = () => {
        const { data: me, isLoading, isError } = useGetMeQuery()

        if (!me?.id && isLoading) {
                return <LoadingOverlay />
        }
        else if (!me?.id && isError) {
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