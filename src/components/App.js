import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import { simpleBurgers } from "../simple-burgers";
import Burger from "./Burger";
import base from "../base";

class App extends React.Component {
  state = {
    burgers: { ...simpleBurgers },
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    // this.setState({ ...simpleBurgers });

    const localStorageRef = localStorage.getItem(params.restaurantId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: "burgers",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    localStorage.clear();
  }

  addBurger = (burger) => {
    console.log("addBurger ", burger);
    const burgers = { ...this.state.burgers };
    burgers[`burger${Object.keys(burgers).length + 1}`] = burger;
    this.setState({ burgers });
  };

  updateBurger = (key, updeteBurger) => {
    const burgers = { ...this.state.burgers }; //copy
    burgers[key] = updeteBurger; // update
    this.setState({ burgers }); //stage
    console.log("updateBurger");
  };

  deleteBurger = (key) => {
    const burgers = { ...this.state.burgers };
    burgers[key] = null;
    this.setState({ burgers });
    console.log("deleteBurger ");
  };

  loadSimpleBurgers = () => {
    this.setState({ burgers: simpleBurgers });
    console.log("loadSimpleBurgers");
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
    console.log("addToOrder");
  };

  deleteOrderForm = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
    console.log("deleteOrderForm");
  };

  render() {
    return (
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Very hot Burger" amount={10} hot={true} />
          <ul className="burgers">
            {Object.keys(this.state.burgers).map((key) => {
              return (
                <Burger
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order
          burgers={this.state.burgers}
          order={this.state.order}
          deleteOrderForm={this.deleteOrderForm}
        />
        <MenuAdmin
          loadSimpleBurgers={this.loadSimpleBurgers}
          addBurger={this.addBurger}
          burgers={this.state.burgers}
          updateBurger={this.updateBurger}
          deleteBurger={this.deleteBurger}
        />
      </div>
    );
  }
}

export default App;
