import { marked } from 'marked';
import React from 'react';
import Badge from "react-bootstrap/Badge"

export default class App extends React.Component{ 
constructor(props){
  super(props);
  this.state = {
    markdown: ""
  };
}

updateMarkdown(markdown){
  this.setState({markdown});
}

render(){
  const inputStyle = {
    width: "400px",
    height: "50vh",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "10px"
  };
  const outputStyle = {
    width: "400px",
    height: "50vh",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#DCDCDC"
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row mt-4">
          <div className="col text-center">
              <h1>
                <Badge className="text-align-center bg-light text-black">
                  Markdown Previewer
                </Badge>
              </h1>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="col text-center">
              <h4>
                <Badge className="text-align-center bg-secondary">
                  Markdown Input
                </Badge>
              </h4>
              <div className="mark-input">
                <textarea className="input" 
                  style={inputStyle} 
                  value={this.state.markdown}
                  onChange = {(e) => {
                    this.updateMarkdown(e.target.value);
                  }}>
                    {console.log(this.state.markdown)}
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col text-center">
              <h4>
                <Badge className="text-align-center bg-secondary">
                  Preview
                </Badge>
              </h4>
              <div style={outputStyle}
                dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );}
}
