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
  border: 3px solid lightgrey;
  width: 75%;
  height: 100%;
  margin: 50px auto;
  padding: 20px;
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
    this.addNewCustomer = this.addNewCustomer.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteCustomerHandler = this.deleteCustomerHandler.bind(this)
  }

  componentDidMount() {
    fetch("/api/v1/customers.json")
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
        // console.log("response.status:", response.status);
        // console.log("response.statusText:", response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ customers: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewCustomer(formPayLoad) {
    fetch(`/api/v1/customers`, {
      method: "post",
      body: JSON.stringify(formPayLoad),
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
        let newCustomers = this.state.customers.concat(formPayLoad)
        this.setState({ customers: newCustomers });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(id){
		fetch(`/api/v1/customers`,
		{
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json' } ,
			credentials: 'same-origin'
		})
		.then(response => {
			if (response.ok) {
				alert("Review was deleted!")
				this.deleteReview(id)
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
        this.deleteCustomerHandler(customer.id)
      }
   
      return (
        <div>
          <List>
            <CustomerTile
              key={customer.id}
              id={customer.id}
              firstName={customer.first_name}
              lastName={customer.last_name}
              phoneNumber={customer.phone_number}
              email={customer.email}
              address={customer.address}
              city={customer.city}
              state={customer.state}
              zipCode={customer.zip_code}
              showFullCustomer={showFullCustomer}
              customerId={this.state.customerId}
              deleteCustomer={deleteCustomer}
              
            />
          </List>
        </div>
      );
    });
    return (
      <div>
        <BackButton />
        <Typography align="center" component="h2" variant="h2" gutterBottom>
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
