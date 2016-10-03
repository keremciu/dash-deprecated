import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Map.css';
import Link from '../Link';
const Leaflet = require('leaflet-headless');
import HeatmapOverlay from './heatmapoverlay.js';

// material-ui elements
import { SelectField, List, Subheader, Card, CardHeader, CardText, Drawer, MenuItem } from 'material-ui';

let svgIcon = `<svg width="28px" height="42px" viewBox="0 0 40 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-1">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
          <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
      </filter>
  </defs>
  <g id="pointer" transform="translate(4.000000, 4.000000)">
    <g id="pointer-regular" filter="url(#filter-1)">
      <path d="M16,52 C7.16333333,52 0,44.8366667 0,36 C0,20 16,0 16,0 C16,0 32,20 32,36 C32,44.8366667 24.8366667,52 16,52 Z" id="Fill-1" fill="#FFFFFF"></path>
      <path d="M24,36 C24,40.4183333 20.4183333,44 16,44 C11.5816667,44 8,40.4183333 8,36 C8,31.5816667 11.5816667,28 16,28 C20.4183333,28 24,31.5816667 24,36" id="Fill-3" fill="#006FBF"></path>
    </g>
  </g>
</svg>`;

class Map extends Component {
  static propTypes = {
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  };

  componentDidMount() {
    const props = this.props;
    const map = this.map = Leaflet.map(ReactDOM.findDOMNode(this).querySelectorAll('#map')[0], {
      minZoom: 0,
      maxZoom: 5,
      zoom: 1,
      center: [
        0, 0
      ],
      attributionControl: false
    });

    const weight = 2043;
    const height = 2043;
    // calculate the edges of the image, in coordinate space
    const southWest = this.unproject([
      0, height
    ], 3);
    const northEast = this.unproject([
      weight, 0
    ], 3);
    const bounds = new Leaflet.LatLngBounds(southWest, northEast);

    this.map = Leaflet.imageOverlay(this.props.url, bounds).addTo(map);

    if (this.props.heatmapData) {
      const cfg = {
        'radius': 7,
        'maxOpacity': 0.9,
        'scaleRadius': true,
        'useLocalExtrema': true,
        latField: 'x',
        lngField: 'y'
      };

      const handleData = {
        max: 15000,
        data: this.props.heatmapData
      };

      const heatmapLayer = new HeatmapOverlay(cfg);
      heatmapLayer.setData(handleData);
      this.map = map.addLayer(heatmapLayer);
    }

    if (props.trackingData !== undefined && props.trackingData.length > 0) {
      // create tracking icons
      {props.trackingData.map((item) => {
        let icon = `<div class="marker-icon"><div class="marker-activated"><div class="marker-icon-svg" style="transform:rotate(${item.rotationDegrees}deg)">${svgIcon}</div></div></div>`;

        let myIcon = Leaflet.divIcon({
          className: 'svg-marker',
          html: icon,
          iconSize: null,
          iconAnchor: null
        });

        function onClick(e) {
          console.dir(e);
        }

        Leaflet.marker([item.x, item.y], {icon: myIcon}).addTo(map).on('click', onClick);
      })}
    }
  }

  unproject(point, zoom) {
    // zoom = zoom === undefined ? this._zoom : zoom;
    return Leaflet.CRS.EPSG3857.pointToLatLng(Leaflet.point(point), zoom);
  }

  render() {
    const { name, level, url, ...props } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div className={s.root}>
        <Card className={s.mapCard}>
          <CardHeader
            title={'Level ' + level}
          />
          <CardText>
            <div id="map" className={s.map}></div>
          </CardText>
        </Card>
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = {};
export default connect(mapState, mapDispatch)(withStyles(s)(Map));
