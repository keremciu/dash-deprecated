import React from 'react';
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
          <Subheader style={subheaderStyle}>ANALYSE</Subheader>
          <MenuItem
            containerElement={<Link to="/tracking" />}
            style={linkStyle}
            className={s.menuItem}
            leftIcon={<TrackingIcon color={'white'} />}>Tracking</MenuItem>
          <MenuItem
            containerElement={<Link to="/heatmap" />}
            style={linkStyle}
            className={s.menuItem}
            leftIcon={<HeatmapIcon color={'white'} />}>Heatmap</MenuItem>
          <Subheader style={subheaderStyle}>USER</Subheader>
          <MenuItem
            containerElement={<Link to="/login" />}
            style={linkStyle}
            className={s.menuItem}
            leftIcon={<LogoutIcon color={'white'} />}>Logout</MenuItem>
        </List>
        <LanguageSwitcher />
      </Drawer>
    </div>
  );
}

export default withStyles(s)(Sidebar);
