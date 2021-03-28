import React from "react";

const $name = "[Count]";

// https://ko.reactjs.org/docs/react-component.html
export default class Count extends React.Component {
  constructor(props) {
    console.log($name, "constructor");
    super(props);

    this.state = { count: 0 };

    this.myRef = React.createRef();
    this.myRef.current = { count: 0 };
  }

  componentDidMount() {
    console.log($name, "componentDidMount");

    // this.timerID = setInterval(() => this.tick(), 1000);
    this.timerID = setInterval(() => this.tick2(), 1000);
  }

  componentWillUnmount() {
    console.log($name, "componentWillUnmount");
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    console.log($name, "componentDidUpdate");
  }

  tick() {
    this.setState((state) => {
      return {
        count: state.count + 1
      };
    });
    // this.setState({
    //   count: this.state.count + 1
    // });
  }

  tick2() {
    this.myRef.current.count += 1;
    this.forceUpdate(() => {
      console.log($name, "forceUpdate callback");
    });
  }

  render() {
    console.log($name, "render");
    return (
      <div>
        <h2>tick state.count {this.state.count}.</h2>
        <h2>tick2 reRef.current.count {this.myRef.current.count}.</h2>
      </div>
    );
  }
}
