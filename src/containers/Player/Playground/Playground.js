import React from 'react';
import './Playground.scss';
import propTypes from 'prop-types';

class Playground extends React.Component {
  constructor() {
    super();
    this.zones = undefined;
  }
  componentDidUpdate() {
    if (this.isPlayer()) {
      console.log('HERE');
        this.zones = this.props.player.stats.zones;
        console.log(this.zones)
    }
  }
  isPlayer = () => !!this.props.player;

  render() {
    console.log(this.props.player);
    console.log(this.isPlayer());
  return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          style={{ height: '50vh', cursor: this.props.isPlayerSelected ? 'pointer': 'default'}}
          className="Playground"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 580.6 468"
          enableBackground="new 0 0 580.6 468"
          space="preserve"
        >
          <g id="Field">
            <g id="Wooden_texture">
              <defs>
                <path
                  id="mask"
                  d="M540.7,468H39.9C17.9,468,0,450.1,0,428.1V39.9C0,17.9,17.9,0,39.9,0h500.8c22,0,39.9,17.9,39.9,39.9v388.2
				C580.6,450.1,562.7,468,540.7,468z"
                />
              </defs>
              <clipPath id="mask_1_">
                <use href="#mask" overflow="visible" />
              </clipPath>
              <g transform="matrix(1 0 0 1 0 -1.525879e-05)" clipPath="url(#mask_1_)">

                <image
                  overflow="visible"
                  width="1228"
                  height="960"
                  id="texture"
                  href="/TexturesCom_WoodFine0015_seamless_S.jpg"
                  transform="matrix(0 0.6325 -0.6325 0 593.8894 -183.0654)"
                />
              </g>
            </g>
            <g id="Sectors" opacity="1">
              <rect className="sector"  id="_x30_1" x="201.3" fill="#4681BD" width="181" height="260" />
              <path className="sector" id="_x30_2" fill="#A6CE39" d="M201.3,0v136h-155c0-85,0-136,0-136H201.3z" />
              <path className="sector" id="_x30_3" fill="#EC6F23" d="M534.3,0c0,0,0,47,0,136h-152V0H534.3z" />
              <path className="sector" id="_x30_4" fill="#20562B" d="M201.3,136v219.3c-86.1-26.9-155-98.7-155-219.3H201.3z" />
              <path className="sector"  id="_x30_5" fill="#A24D9D" d="M382.3,260v89.8c-57.6,21.3-123.1,23.5-181,5.5V260H382.3z" />
              <path className="sector"  id="_x30_6" fill="#E2BD23" d="M534.3,136c0,110-67.3,182.5-152,213.8V136H534.3z" />
              <path className="sector"  id="_x30_7" fill="#B993C4" d="M46.3,0v136H0V39.9C0,17.9,17.9,0,39.9,0H46.3z" />
              <g
                id="_x30_8">
                <path
                  className="sector"
                  fill="#3D469D"
                  d="M201.3,355.3V468H39.9C17.9,468,0,450.1,0,428.1V136h46.3C46.3,256.6,115.2,328.4,201.3,355.3z"
                />
              </g>
              <g

                id="_x30_9">
                <path  className="sector" fill="#4DB67D" d="M382.3,349.8V468h-181V355.3C259.2,373.4,324.7,371.1,382.3,349.8z" />
              </g>
              <g
                id="_x31_0">
                <path
                  className="sector"
                  fill="#E63851"
                  d="M580.6,136v292.1c0,22-17.9,39.9-39.9,39.9H382.3V349.8c84.7-31.3,152-103.9,152-213.8H580.6z"
                />
              </g>
              <path
                id="_x31_1"
                className="sector"
                fill="#46C5E1"
                d="M580.6,39.9V136h-46.3c0-89,0-136,0-136h6.4C562.7,0,580.6,17.9,580.6,39.9z"
              />
            </g>
            <g id="Marks" opacity="0.74">
              <path
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                d="M46.3,0c0,0,0,51,0,136c0,321,488,296,488,0
			c0-89,0-136,0-136"
              />
              <line
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                x1="201.3"
                y1="0"
                x2="201.3"
                y2="468"
              />
              <line
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                x1="382.3"
                y1="0"
                x2="382.3"
                y2="468"
              />
              <line
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                x1="201.3"
                y1="260"
                x2="382.3"
                y2="260"
              />
              <line
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                x1="46.3"
                y1="136"
                x2="201.3"
                y2="136"
              />
              <line
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                x1="382.3"
                y1="136"
                x2="534.3"
                y2="136"
              />
              <path
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                d="M225.3,260c0,107.5,132,107.5,132,0"
              />
              <path
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeMiterlimit="10"
                d="M346.9,52.8c0,29.3-23.8,53.1-53.1,53.1
			s-53.1-23.8-53.1-53.1"
              />
            </g>
            <g id="hoop">
              <g id="basket">
                <line
                  fill="none"
                  stroke="#E7BB21"
                  strokeMiterlimit="10"
                  x1="293.8"
                  y1="55"
                  x2="293.8"
                  y2="62.6"
                />
                <circle fill="none" stroke="#E7BB21" strokeMiterlimit="10" cx="293.8" cy="71.9" r="9.3" />
              </g>

              <line
                id="board"
                fill="none"
                stroke="#561E1E"
                strokeWidth="7"
                strokeLinecap="round"
                strokeMiterlimit="10"
                x1="257.8"
                y1="55"
                x2="329.8"
                y2="55"
              />
            </g>
            <g id="Border">
              <path
                fill="#542910"
                d="M540.7,7c18.1,0,32.9,14.8,32.9,32.9v388.2c0,18.1-14.8,32.9-32.9,32.9H39.9C21.8,461,7,446.2,7,428.1
			V39.9C7,21.8,21.8,7,39.9,7H540.7 M540.7,0H39.9C17.9,0,0,17.9,0,39.9v388.2c0,22,17.9,39.9,39.9,39.9h500.8
			c22,0,39.9-17.9,39.9-39.9V39.9C580.6,17.9,562.7,0,540.7,0L540.7,0z"
              />
            </g>
            <g id="Marks_copy" opacity="0.74" />
          </g>
          <g id="Numbers" className="Playground-RRR">
            <text transform="matrix(1 0 0 1 258.4282 190.1826)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.paint.made} / ${this.props.player.stats.zones.paint.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 108.8223 85.6428)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.left_two.made} / ${this.props.player.stats.zones.left_two.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 429.1492 85.6428)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.right_two.made} / ${this.props.player.stats.zones.right_two.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 110.4545 229.7614)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.right_two_45deg.made} / ${this.props.player.stats.zones.right_two_45deg.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 268.4282 306.7066)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.center_two.made} / ${this.props.player.stats.zones.center_two.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 431.0753 229.7614)" className="Playground-font">
              {this.isPlayer()
              ? `${this.props.player.stats.zones.right_two_45deg.made} / ${this.props.player.stats.zones.right_two_45deg.total}`
              : '-'}
            </text>
            <text transform="matrix(1 0 0 1 28.8613 85.6428)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.left_three.made} / ${this.props.player.stats.zones.left_three.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 45.1264 340.8184)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.left_three_45deg.made} / ${this.props.player.stats.zones.left_three_45deg.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 267.9544 430.9136)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.center_three.made} / ${this.props.player.stats.zones.center_three.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 475.1664 340.8185)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.right_three_45deg.made} / ${this.props.player.stats.zones.right_three_45deg.total}`
                : '-'}
            </text>
            <text transform="matrix(1 0 0 1 512.8847 85.6425)" className="Playground-font">
              {this.isPlayer()
                ? `${this.props.player.stats.zones.right_three.made} / ${this.props.player.stats.zones.right_three.total}`
                : '-'}
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

Playground.defaultProps = {
  player: null,
};

Playground.propTypes = {
    player: propTypes.object,
};

export default Playground;
