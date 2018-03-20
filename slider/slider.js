import React, {Component} from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import './slider.css'

class Slider extends Component {
  static propTypes = {
    auto: PropTypes.bool,
    loop: PropTypes.bool,
    interval: PropTypes.number
  }
  static defaultProps = {
    auto: true,
    loop: true,
    interval: 3000
  }
  constructor() {
    super();
    this.state = {
      currentPageIndex: 0,
      dots: []
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this._initSliderWidth();
      this._initDots();
      this._initSlider();
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.banner) {
        return
      }
      this._initSliderWidth(true);
      this.banner.refresh();
    })
    if (this.props.auto) {
      this._play();
    }
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }
  _initSliderWidth = (isResize) => {
    let width = 0;
    let sliderWidth = this.slider.offsetWidth;
    this.children = this.sliderGroup.children;
    for (let child of this.children) {
      child.classList.add('slider-item');
      child.style.width = sliderWidth + 'px';
      width += sliderWidth;
    }
    if (this.props.loop && !isResize) {
      width += 2 * sliderWidth;
    }
    this.sliderGroup.style.width = width + 'px';
  }
  _initSlider = () => {
    this.banner = new BScroll(this.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.props.loop,
        threshold: 0.3,
        speed: 400
      }
    })
    this.banner.on('scrollEnd', () => {
      let pageIndex = this.banner.getCurrentPage().pageX;
      this.setState({
        currentPageIndex: pageIndex
      })
      if (this.props.auto) {
        clearTimeout(this.timer);
        this._play();
      }
    })
  }
  _initDots = () => {
    this.setState({
      dots: new Array(this.children.length).fill(0)
    })
  }
  _play = () => {
    this.timer = setTimeout(() => {
      this.banner.next();
    }, 4000)
  }
  render() {
    let {children} = this.props;
    return (
      <div className="slider" ref={(slider)=>{this.slider = slider}}>
        <div className="slider-group" ref={(sliderGroup)=>{this.sliderGroup=sliderGroup}}>
          {children}
        </div>
        <div className="dots">
          {
            this.state.dots.map((item, index) => (
              <span key={index} className={this.state.currentPageIndex===index?'dot active':'dot'}></span>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Slider
