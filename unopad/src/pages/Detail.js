import React from 'react';
import NewContract from "./web3modal/NewContract";

class Detail extends React.Component {

  constructor() {
    super();
    this.state = {
    isLoading: true,
    status: "In progression...",
    data: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      fetch(process.env.REACT_APP_API_URL+'/api/projects/'+this.props.match.params.id).then(response => response.json()).then(data => this.setState({ data, isLoading:false, status:"Completed" }));

    }, 1000);
    }

  render() {
  
  return (
    
    <div>
    {this.state.isLoading ? <h1>Page is Loading.....</h1> :<NewContract{...this.state.data} />}
    </div>
    );
  } 
}
export default Detail;
