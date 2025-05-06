import { useState } from 'react';
import {
        IconDeviceDesktopAnalytics,
        IconHome2,
        IconLogout2,
        IconPlus,
        IconSun,
        IconTrash,
        IconUser,
} from '@tabler/icons-react';
import { Button, Flex, LoadingOverlay, Title, Tooltip, UnstyledButton, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './styles.module.scss';
import { CreateMarketModal, useDeleteMarketMutation, useGetMarketsQuery } from 'entities/markets';
import { Link, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { сheckPermissions } from 'shared/helpers/check-permissions';
import { AppPages } from 'shared/constants/routes';

const mainLinksMockdata = [
        { icon: IconHome2, label: 'Филиалов', to: "" },
        { icon: IconDeviceDesktopAnalytics, label: 'Cтатистика', to: AppPages.StatisticsPage },
        { icon: IconUser, label: 'Создать аккаунты', to: AppPages.CreateAccountPage },
        { icon: IconSun, label: 'Тема', to: "" },
];

export function DoubleNavbar() {
        const { setColorScheme } = useMantineColorScheme()
        const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
        const navigate = useNavigate();
        const [opened, { close, open }] = useDisclosure(false)
        const [active, setActive] = useState('Филиалов');
        const [activeLink, setActiveLink] = useState('Settings');
        const { data: markets } = useGetMarketsQuery()
        const { mutate: deleteMarket } = useDeleteMarketMutation()


        if (!markets) {
                return <LoadingOverlay />
        }

        const mainLinks = mainLinksMockdata.map((link) => (
                <Tooltip
                        label={link.label}
                        position="right"
                        withArrow
                        transitionProps={{ duration: 0 }}
                        key={link.label}
                >
                        <UnstyledButton
                                onClick={() => {
                                        if (link.label === 'Тема') {
                                                return setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
                                        }
                                        link.label !== 'Филиалов' && navigate(link.to)
                                        setActive(link.label)
                                }}
                                className={classes.mainLink}
                                data-active={link.label === active || undefined}
                        >
                                <link.icon size={22} stroke={1.5} />
                        </UnstyledButton>
                </Tooltip>
        ));

        const links = markets.map((market) => (
                <Link
                        className={classes.link}
                        data-active={activeLink === market.name || undefined}
                        to={`/markets/${market.id}`}
                        onClick={() => {
                                setActiveLink(market.name);
                        }}
                        key={market.id}
                >
                        {market.name}
                        {сheckPermissions("deleteButton") && <Button onClick={() => deleteMarket(market.id)} color='red' variant='light' size="compact-sm">
                                <IconTrash size={18} stroke={1.5} />
                        </Button>}
                </Link>
        ));

        return (
                <nav className={classes.navbar} data-active={active === 'Филиалов' || undefined}>
                        <div className={classes.wrapper} >
                                <div className={classes.aside}>
                                        <div className={classes.logo}>
                                                <MantineLogo type="mark" size={30} />
                                        </div>
                                        <Flex direction={'column'} align="center" justify="space-between" h="100%">
                                                <div>
                                                        {mainLinks}
                                                </div>
                                                <Tooltip
                                                        label={"Выйти"}
                                                        position="right"
                                                        withArrow
                                                        transitionProps={{ duration: 0 }}
                                                >
                                                        <UnstyledButton
                                                                onClick={() => navigate('/login')}
                                                                className={classes.mainLink}
                                                        >
                                                                <IconLogout2 size={22} stroke={1.5} />
                                                        </UnstyledButton>
                                                </Tooltip>
                                        </Flex>
                                </div>
                                <div className={classes.main} data-active={active === 'Филиалов' || undefined}>
                                        <Title order={4} className={classes.title}>
                                                {active}
                                        </Title>
                                        {links}
                                        {сheckPermissions("createfillial") && <Button
                                                mt="sm"
                                                ml="md"
                                                variant="light"
                                                rightSection={<IconPlus size={14} />}
                                                onClick={open}
                                        >
                                                Создать филиал
                                        </Button>}
                                        <CreateMarketModal open={opened} close={close} />
                                </div>
                        </div>
                </nav>
        );
}