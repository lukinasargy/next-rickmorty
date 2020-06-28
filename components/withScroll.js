import React from 'react';
export default function withScroll(WrappedComponent, selectData, selectArray) {
  return class extends React.Component {
    state = {
      data: selectData ? selectData[selectArray].slice(0, 20) : null
    };
    handleScroll = () => {
      if ((window.pageYOffset + window.innerHeight) >= window.document.body.offsetHeight) {
        let newLength = this.state.data.length;
        if (newLength < selectData[selectArray].length) {
          newLength += 10;
        }
        const dataNew = selectData[selectArray].slice(this.state.data.length, newLength);
        let dataUpdated = [...this.state.data, ...dataNew]
        this.setState({data: dataUpdated});
      }
    };
    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll, false)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll, false);
    }
    render() {
      return <WrappedComponent data={this.state.data} {...this.props}/>
    }
  }
};
