import { MantineProvider } from '@mantine/core'
import React from 'react'

import RoutingProvider from './routing-provider'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Providers = () => {
        return (
                <React.StrictMode>
                        <QueryClientProvider client={new QueryClient()}>
                                <MantineProvider>
                                        <Notifications />
                                        <RoutingProvider />
                                </MantineProvider>
                        </QueryClientProvider>
                </React.StrictMode>
        )
}

