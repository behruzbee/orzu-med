import { MantineProvider } from '@mantine/core'
import React from 'react'

import RoutingProvider from './routing-provider'

export const Providers = () => {
        return (
                <React.StrictMode>
                        <MantineProvider>
                                <RoutingProvider />
                        </MantineProvider>
                </React.StrictMode>
        )
}

