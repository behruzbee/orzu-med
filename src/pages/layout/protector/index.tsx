import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '../main-layout';
import { Box, Flex } from '@mantine/core';

const ProtectorLayout = () => {
        const isAuth = true;

        if (!isAuth) {
                return <Navigate to="/login" />
        }

        return (
                <Flex>
                        <MainLayout />
                        <Box w="100%" px={20}>
                                <Outlet />
                        </Box>
                </Flex>
        )
}

export default ProtectorLayout