import React from "react";
import { FormErrors } from "./FormErrors";


class AddBurgerForm extends React.Component {

  state = {
    name: "",
    price: 0,
    status: "Available",
    desc: "",
    image: "",
    formErrors: {
      name: "",
      price: 0,
      status: "",
      desc: "",
      image: "",
    },
    nameValid: false,
    priceValid: false,
    descValid: false,
    statusValid: false,
    imageValid: false,
    formValid: false,
  };

  createBurger = (event) => {
    event.preventDefault();
    const burger = {
      name: this.state.name,
      price: this.state.price,
      status: this.state.status,
      desc: this.state.desc,
      image: this.state.image,
    };

    this.props.addBurger(burger);
    this.setState({name:"",
      price:"",
      desc:"",
      image:""})
    };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let priceValid = this.state.priceValid;
    let descValid = this.state.descValid;
    let statusValid = this.state.statusValid;
    let imageValid = this.state.imageValid;
    switch (fieldName) {
      case "name":
        nameValid = value !== ""||null||{}<[]||false;
        fieldValidationErrors.name = nameValid ? "" : " is invalid";
        break;
      case "price":
        priceValid = value !== 0 || !isNaN(value);
        fieldValidationErrors.price = priceValid ? "" : " is invalid";
        break;
      case "desc":
        descValid =value !== ""||null||{}<[]||false;
        fieldValidationErrors.desc = descValid ? "" : " is invalid";
        break;
      case "image":
        imageValid = value !== false;
        fieldValidationErrors.image = imageValid ? "" : " is invalid";
        break;
      default:
        break;
    }
  
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        priceValid: priceValid,
        descValid: descValid,
        statusValid: statusValid,
        imageValid: imageValid,
      },
      this.validateForm,
    );
  }
  
  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.priceValid && this.state.descValid && this.state.imageValid
    });
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  render() {
    return (
      <>
        <form
          className="burger-edit"
          // onSubmit={this.createBurger}
          onChange={this.handleUserInput}
        >
          <input
            value={this.state.name}
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="off"
          />
          <input
            value={this.state.price}
            name="price"
            type="number"
            placeholder="Price"
            autoComplete="off"
          />
          <select ref={this.statusRef} name="status" className="status">
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <textarea name="desc" value={this.state.desc} placeholder="Dest" />
          <input
            name="image"
            value={this.state.image}
            type="text"
            placeholder="Imade"
            autoComplete="off"
          />
          <button
            className="button"
            disabled={!this.state.formValid}
            type="submit"
            onClick={this.createBurger}
          >
            +Add to Meny
          </button>
        </form>
        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </>
    );
  }
}

export default AddBurgerForm;
