import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FilterSelect.css';
import { filterChange } from '../../actions/filter';

// material-ui elements
import { SelectField, MenuItem } from 'material-ui';

class FilterSelect extends Component {
  static propTypes = {
    type: PropTypes.number.isRequired,
    currentValue: PropTypes.number.isRequired,
    availableValues: PropTypes.arrayOf(PropTypes.number).isRequired,
    filterChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    

  }

  render() {
    const { type, currentValue, ...props } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div className={s.root}>
        <SelectField value={currentValue}>
          {availableValues.map(option => (
            <MenuItem value={option.value} primaryText={option.text} />
          ))}
        </SelectField>
      </div>
    );
  }
}

export default connect(state => ({
  currentValue: state.tracking.filter.currentValue,
  availableValues: state.tracking.filter.availableValues,
}), {
  filterChange,
})(withStyles(s)(FilterSelect));
