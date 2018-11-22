import React, { Component } from 'react'
import List from "@material-ui/core/List"
import CustomerTile from "../components/CustomerTile"
import Typography from "@material-ui/core/Typography"
import BackButton from '../components/BackButton';
import styled from "styled-components"
import Card from "@material-ui/core/Card"
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button"
import CustomerFormDialog from "../components/CustomerFormDialog"


const Container = styled.div`

  box-shadow: 3px 5px 7px #ccc;
  border-radius: 20px;
  width: 75%;
  height: 100%;
  margin: 50px auto;
  padding: 20px;
  background-color: #739574;
`;

const FormDialog = styled.div`
  margin: auto;
  text-align: right;
`

export default class CustomersContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      customers: []
    }
    this.addNewCustomer = this.addNewCustomer.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteCustomerHandler = this.deleteCustomerHandler.bind(this);
    this.editCustomerHandler = this.editCustomerHandler.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/customers",
		{
			credentials: 'same-origin',
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ customers: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewCustomer(formPayload) {
    fetch(`/api/v1/customers`, {
      method: "post",
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
  
      .then(response => response.json())
      .then(body => {
        let newCustomers = this.state.customers.concat(body)
        this.setState({ customers: newCustomers });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(id){
		fetch(`/api/v1/customers/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json' } ,
			credentials: 'same-origin'
		})
		.then(response => {
			if (response.ok) {
        this.deleteCustomerHandler(id)
			}
			else {
				let errorMessage = `${response.status} (${response.statusText})`,
					error = new Error(errorMessage)
				throw error
			}
		})
		.catch(error => {
			console.error(`ERROR IN FETCH: ${error}`)
		})
  }
  
  deleteCustomerHandler(id){
    let updatedCustomerList = this.state.customers.filter((customer) => customer.id !== id)
    this.setState({
      customers: updatedCustomerList
    })
  }


  editCustomerHandler(formPayload) {
      fetch(`/api/v1/customers/${formPayload.id}`, {
        method: "PATCH",
        body: JSON.stringify(formPayload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(response => response.json())
        .then(body => {
          let findCustomer = customer => {
            return customer.id === formPayload.id;            
          }
          let customerIndex = this.state.customers.findIndex(findCustomer)
          let newCustomers = this.state.customers
          newCustomers.splice(customerIndex, 1, body)
      
         this.setState({ customers: newCustomers })
        })
        .catch(error =>
          console.error(`Error in fetch: ${error.message}`)
        );
    }

  showFullCustomerHandler(id) {
    if (id === this.state.customerId) {
      this.setState(state => ({ customerId: null }));
    } else {
      this.setState(state => ({ customerId: id }));
    }
  }


  render() {
    let customers = this.state.customers.map(customer => {
      let showFullCustomer = event => {
        this.showFullCustomerHandler(customer.id);
      };

    
      let deleteCustomer = () => {
        this.handleDelete(customer.id)
      }
    
      return (
        <div key={customer.id}>
          <List>
            <CustomerTile
              key={customer.id}
              id={customer.id}
              firstName={customer.first_name}
              lastName={customer.last_name}
              phoneNumber={customer.phone_number}
              email={customer.email}
              address={customer.address}
              showFullCustomer={showFullCustomer}
              customerId={this.state.customerId}
              deleteCustomer={deleteCustomer}
              editCustomerHandler={this.editCustomerHandler}
              lat={+customer.lat}
              lng={+customer.lng}
            />
          </List>
        </div>
      );
    });
    return (
      <div>
        <BackButton />
        <Typography align="center" variant="h4" gutterBottom>
          Customers
        </Typography>
      
      <Container>
      <FormDialog>
        <CustomerFormDialog 
          customers={this.state.customers}
          addNewCustomer={this.addNewCustomer}
        />
      </FormDialog>
        {customers} 
      </Container>
      </div>
    )
  }
}
