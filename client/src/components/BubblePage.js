import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Route } from "react-router-dom";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

// const BubblePage = () => {
//   const [colorList, setColorList] = useState([]);
//   // fetch your colors data from the server when the component mounts
//   // set that data to the colorList state property

//   return (
//     <>
//       <ColorList colors={colorList} updateColors={setColorList} />
//       <Bubbles colors={colorList} />
//     </>
//   );
// };

// export default BubblePage;

class BubblePage extends React.Component {

  state = {
    colorList: [] 
  }

componentDidMount() {
    
            axiosWithAuth()
              .get('http://localhost:5000/api/colors')
              .then(response => {
                  console.log(response)
                this.setState({
                  colorList: response.data
                });
              })
              .catch(err => console.log(err));

    if (!localStorage.getItem('token')) {
        console.error("Not Logged In");
    } else {
        console.info("Logged In");
    }
}

  render(){
    return (
      <div>
       <ColorList colors={this.state.colorList} updateColors={this.setState} />
       
       {/* <Route
       render={props => (
          <ColorList {...props} colors={this.state.colorList} updateColors={this.setState}/>
        )} /> */}

       <Bubbles colors={this.state.colorList} />
      </div>
    )

  }
};

export default BubblePage;