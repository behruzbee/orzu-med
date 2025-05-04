import { Group, ScrollArea, Title } from '@mantine/core';
import { NavbarLinksGroup } from './navbar-links-group';
import { UserButton } from './user-button';
import classes from './styles.module.scss';

export function MainLayout() {

        return (
                <nav className={classes.navbar}>
                        <div className={classes.header}>
                                <Group justify="space-between">
                                       <Title order={1} className={classes.title}>Orzu Medical Center</Title>
                                </Group>
                        </div>

                        <ScrollArea className={classes.links}>
                                <div className={classes.linksInner}>
                                        <NavbarLinksGroup />
                                </div>
                        </ScrollArea>

                        <div className={classes.footer}>
                                <UserButton />
                        </div>
                </nav>
        );
}