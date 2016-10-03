/* eslint-disable no-shadow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// material-ui elements
import { SelectField, MenuItem, TextField } from 'material-ui';
import s from './Tracking.css';
import Map from '../../components/Map/Map.js';
import { filterChange } from '../../actions/filter';

const title = 'Tracking';
const page = 'tracking';

function Tracking({filters, maps, tracking, filterChange}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2 className="font-light text-center">Showing tracking data for</h2>
        {filters.map(filter => (
          <SelectField
            onChange={(event, key, value) => {
              filterChange({ filter, value, page });
              event.preventDefault();
            }}
            value={filter.defaultValue !== undefined ? filter.defaultValue : -99}
            style={{ marginLeft: '20px', width: 'auto' }}
          >
            {filter.data.map(option => (
              <MenuItem value={option.value} primaryText={option.text} />
            ))}
          </SelectField>
        ))}
        <TextField
          style={{ marginLeft: '20px', width: 'auto' }}
          hintText="duration value"
          floatingLabelText="Time value here..."
        />
        {maps.map((item) => {
          let trackingData;

          const result = tracking.filter(obj => obj.level === item.level);

          if (result && result !== undefined) {
            trackingData = result;
          }

          return (<div>
            <Map
              name={item.name}
              url={item.url}
              level={item.level}
              trackingData={trackingData}
            />
          </div>);
        })}
      </div>
    </div>
  );
}


Tracking.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    enum: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  filterChange: PropTypes.func.isRequired,
  maps: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  tracking: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    userIdentifier: PropTypes.string.isRequired,
    lastSeenData: PropTypes.string.isRequired,
    rotationDegrees: PropTypes.number.isRequired,
  })).isRequired,
};
Tracking.contextTypes = { setTitle: PropTypes.func.isRequired };

export default connect(state => ({
  filters: state.filter.pages.tracking.filters,
  now: state.runtime.initialNow,
}), {
  filterChange,
})(withStyles(s)(Tracking));
