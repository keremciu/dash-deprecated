import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.css';
import Link from '../Link';
import Navigation from '../Navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import logoUrl from './logo.png';

// material-ui elements
import { List, Subheader, Card, CardHeader, Avatar, Drawer, MenuItem } from 'material-ui';

// colors
import { blueGrey800 } from 'material-ui/styles/colors';

// icons
import TrackingIcon from 'material-ui/svg-icons/maps/near-me';
import HeatmapIcon from 'material-ui/svg-icons/maps/satellite';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';

const subheaderStyle = {
  backgroundColor: '#0f2135',
  color: 'rgba(112, 180, 205, 0.8)',
  fontSize: '11px',
  fontWeight: 'normal',
  lineHeight: '20px'
};

const linkStyle = {
  color: '#fff',
  fontSize: '14px',
};

const messages = defineMessages({
  analyse: {
    id: 'sidebar.analyse',
    defaultMessage: 'ANALYSE',
    description: 'Subheader of analyse section of sidebar',
  },
  tracking: {
    id: 'sidebar.tracking',
    defaultMessage: 'Tracking',
    description: 'Tracking menu item of sidebar',
  },
  heatmap: {
    id: 'sidebar.heatmap',
    defaultMessage: 'Heatmap',
    description: 'Heatmap menu item of sidebar',
  },
  user: {
    id: 'sidebar.user',
    defaultMessage: 'USER',
    description: 'Subheader of user section of sidebar',
  },
  logout: {
    id: 'sidebar.logout',
    defaultMessage: 'Logout',
    description: 'Logout text',
  },
});

function Sidebar() {
  return (
    <div className={s.root}>
      <Drawer>
        <Card containerStyle={{ backgroundColor: '#06284C' }}>
          <CardHeader
            title="EMIRATES"
            subtitle="Dubai"
            avatar={
              <Avatar src={ logoUrl } backgroundColor={ 'none' }/>
            }
            className="headerTitle"
            titleStyle={{color: '#eee'}}
            subtitleStyle={{color: '#bbb'}}
          />
        </Card>
        <List>
          <Subheader style={subheaderStyle}><FormattedMessage {...messages.analyse} /></Subheader>
          <MenuItem
            containerElement={<Link to="/tracking" />}
            style={linkStyle}
            className={s.menuItem}
            leftIcon={<TrackingIcon color={'white'} />}><FormattedMessage {...messages.tracking} /></MenuItem>
          <MenuItem
            containerElement={<Link to="/heatmap" />}
            style={linkStyle}
            className={s.menuItem}
            leftIcon={<HeatmapIcon color={'white'} />}><FormattedMessage {...messages.heatmap} /></MenuItem>
          <Subheader style={subheaderStyle}><FormattedMessage {...messages.user} /></Subheader>
          <MenuItem
            containerElement={<Link to="/login" />}
            style={linkStyle}
            className={s.menuItem}
            leftIcon={<LogoutIcon color={'white'} />}><FormattedMessage {...messages.logout} /></MenuItem>
        </List>
        <LanguageSwitcher />
      </Drawer>
    </div>
  );
}

export default injectIntl(withStyles(s)(Sidebar));
