import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import {
  IconCalendarStats,
  IconChevronRight,
  IconHome,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from "./styles.module.scss"
import { Link } from 'react-router-dom';


const links = [
  {
    label: 'Filiallar',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Zangiota', link: '/fillial/zangiota' },
      { label: 'Yunusobod', link: '/fillial/yunusobod' },
      { label: 'Oqqurg\'on', link: '/fillial/oqqurgon' },
      { label: 'Yangibozor', link: '/fillial/yangibozor' },
      { label: 'Parkent', link: '/fillial/parkent' },
      { label: 'Fotima C', link: '/fillial/fotima-c' },
      { label: 'Chinoz', link: '/fillial/chinoz' },
    ],
  },
  {
    label: 'Akkauntlar yaratish',
    icon: IconCalendarStats,
    link: '/create-accounts',
  },
  { label: 'Analitika', icon: IconPresentationAnalytics, link: '/analytics' },
  {
    label: 'Xavfsizlik',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/security/enable-2fa' },
      { label: 'Change password', link: '/security/change-password' },
      { label: 'Recovery codes', link: '/security/recovery-codes' },
    ],
  },
];

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  links?: { label: string; link: string }[];
  link?: string;
  initiallyOpened?: boolean;
}


export function LinksGroup({ icon: Icon, label, links, link, initiallyOpened }: LinksGroupProps) {
  const [opened, setOpened] = useState(initiallyOpened || false);


  if (link) {
    return (
      <Box component={Link} to={link}>
        <UnstyledButton className={classes.control}>
          <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          </Group>
        </UnstyledButton>
      </Box>
    );
  }

  return (
    <Box>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>

          {links && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {links && (
        <Collapse in={opened}>
          {links.map((item) => (
            <Link
              className={classes.link}
              to={item.link}
              key={item.label}
            >
              {item.label}
            </Link>))}
        </Collapse>
      )}
    </Box>
  );
}

export const NavbarLinksGroup = () => {
  return (
    <>
      {links.map(link => (
        <LinksGroup key={link.label} {...link} />
      ))}
    </>
  )
}
