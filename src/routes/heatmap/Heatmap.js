import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// material-ui elements
import { SelectField, MenuItem } from 'material-ui';
import s from './Heatmap.css';
import Map from '../../components/Map/Map.js';
import { filterChange } from '../../actions/filter';
// import { setLocale } from '../../actions/intl';

const title = 'Heatmap';
const page = 'heatmap';

function Heatmap({filters, maps, now, heatmap, filterChange}) {
  // const data = filters.heatmap.filters;
  // context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2 className="font-light text-center">Showing heatmap data for</h2>
        {filters.map(filter => (
          <SelectField
            onChange={(event, index, value) => {
              filterChange({ index, value, page });
              event.preventDefault();
            }}
            value={filter.defaultValue !== undefined ? filter.defaultValue : -99}
            floatingLabelText={filter.enum}
            style={{ marginLeft: '20px', width: 'auto' }}
          >
            {filter.data.map(option => (
              <MenuItem value={option.value} primaryText={option.text} />
            ))}
          </SelectField>
        ))}
        {maps.map((item) => {
          let heatmapData = [];

          const result = heatmap.find(obj => obj.key === item.level);

          if (result && result !== undefined) {
            heatmapData = result.value;
          }

          return (<div>
            <Map
              name={item.name}
              url={item.url}
              level={item.level}
              heatmapData={heatmapData}
            />
          </div>);
        })}
      </div>
    </div>
  );
}

Heatmap.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    enum: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  setLocale: PropTypes.func.isRequired,
  maps: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  heatmap: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    value: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};
Heatmap.contextTypes = { setTitle: PropTypes.func.isRequired };

export default connect(state => ({
  filters: state.runtime.pageOptions.heatmap.filters,
  now: state.runtime.initialNow,
}), {
  filterChange,
})(withStyles(s)(Heatmap));
