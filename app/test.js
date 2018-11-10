componentDidMount() {
    fetch(process.env.JOB_TRAC_SECRET_KEY)
      .then(response => {
        if (response.ok) {
          return response;
          console.log(response)
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => {
        console.log("response.status:", response.status);
        console.log("response.statusText:", response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ contacts: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  addNewContact(formPayload) {
    fetch("/api/v1/contacts.json", {
      credentials: "same-origin",
      method: "post",
      body: JSON.stringify(formPayload),
      headers: { "Content-Type": "application/json" }
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
        console.log(body);
        this.setState({ contacts: this.state.contacts.concat(body) });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }



  let jobs = this.state.jobs.map((job) => {
      return(
        <Fragment>
          
            <JobTile
              key={job.id}
              date={job.job_date}
              firstName={job.customer.first_name}
              lastName={job.customer.last_name}
              phoneNumber={job.customer.phone_number}
              address={job.customer.address}
              city={job.customer.city}
        
              state={job.customer.state}
              zipCode={job.customer.zip_code}
              notes={job.customer.notes}
            /> 
        </Fragment>
      )
    })


     <Droppable droppableId={this.state.customers.id}>
          {(provided) => (
          <main ref={provided.innerRef} className={classes.content}>
            <div className={classes.toolbar} />
              <JobList 
              {...provided.droppableProps}
              jobs={this.state.jobs} 
            />
            {provided.placeholder}
            
          </main>
            )}
          </Droppable>


   addNewJob(formPayLoad) {
    fetch(`/api/v1/jobs`, {
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
        this.setState({ jobs: [...this.state.jobs, body] });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
            label="Job"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
           
          />
        <Button onClick={this.handleSubmit}>add job</Button>
        </MuiPickersUtilsProvider>
        </form>

         let newJob = formPayLoad => {
        this.addNewJob(formPayLoad);
      };

       handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      customer_id: this.props.id,
      
      job_date: this.state.selectedDate
    };
    this.props.newJob(formPayload);
  }

  export default class CustomerTile extends Component { 
  constructor(props) {
  super(props);
    this.state = {
    selectedDate: new Date(),
   
   
  }
  this.handleSubmit = this.handleSubmit.bind(this)
}

handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

handleSelect(date){
  this.setState({ selectedDate: date })
}

 
    let jobs = this.props.jobs.map((job, index) => {
    
      return(
        <Droppable droppableId={job.id}>
        {(provided) => (
          <div ref={provided.innerRef}>
              <JobTile
                {...provided.droppableProps}
                index={index}
                key={job.customer.id}
                date={job.job_date}
                firstName={job.customer.first_name}
                lastName={job.customer.last_name}
                phoneNumber={job.customer.phone_number}
                address={job.customer.address}
                city={job.customer.city}
                state={job.customer.state}
                zipCode={job.customer.zip_code}
                notes={job.customer.notes}
              /> 
            {provided.placeHolder}
          </div>
          )}
        </Droppable>
      )
    })
    return (
      <Fragment>
      {jobs}
      </Fragment>

    )



    react beautiful dnd

     render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));


login log out MediaDevices


import React, { Component } from 'react';
import { Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
    this.userSignOut = this.userSignOut.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/users',
    {
      credentials: 'same-origin'
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
    .then(data => {
      if (data) {
        this.setState({ currentUser: data.user });
      } else {
        this.setState({ currentUser: null });
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  userSignOut(event) {
    fetch('/users/sign_out',
    {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
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
      this.setState({ currentUser: null });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        currentUser: this.state.currentUser
      });
    });

    if (this.state.currentUser) {
      return(
        <div>
          <header className="subnav-hero-section">
            <h1 className="subnav-hero-headline"><Link to='/'><img src="https://s3.us-east-2.amazonaws.com/doggy-dudes-images/images/logo.png"></img></Link></h1>
            <ul className="subnav-hero-subnav">
              <div className="left">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>About Us</Link></li>
                <li><Link to='/'>Services</Link></li>
                <li><Link to='/pickups'>Schedule Pickups</Link></li>
              </div>
                <div className="right">
                  <li><Link to='/' onClick={this.userSignOut}>Sign Out</Link></li>
                </div>
            </ul>
          </header>
          <div className="content">
            { children }
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <header className="subnav-hero-section">
            <h1 className="subnav-hero-headline"><img src="https://s3.us-east-2.amazonaws.com/doggy-dudes-images/images/logo.png"></img></h1>
            <ul className="subnav-hero-subnav">
              <div className="left">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>About Us</Link></li>
                <li><Link to='/'>Services</Link></li>
              </div>
                <div className="right">
                  <li><a href="/users/sign_in">Sign In</a></li>
                  <li><a href="/users/sign_up">Sign Up</a></li>
                </div>
            </ul>
          </header>
          <div className="content">
            { children }
          </div>
        </div>
      )
    }

  }
}

export default NavBar

user module
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         STATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
  ]

  has_many :dogs
  has_many :pickups
  

  validates_presence_of :first_name, :last_name, :email, :phone, :address, :city, :state, :zip_code, :pickup_permission
  validates :phone, format: { with: /\A[\d -]*\z/ }, length: { is: 10 }
  validates :zip_code, format: { with: /[0-9]*/ }
  validates :state, inclusion: { in: STATES }
  validates_uniqueness_of :email

end

users <table></table>
create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "phone", null: false
    t.string "address", null: false
    t.string "unit_number"
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.boolean "pickup_permission", null: false
    t.string "vet"
    t.string "vet_phone"
    t.boolean "free_trial", default: false, null: false
    t.string "business_discover"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "pickup_instructions"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

end




auth AbortController

class Api::V1::DogsController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}
  protect_from_forgery except: :create

  prepend_before_action(only: [:index, :destroy]) { request.env["devise.skip_timeout"] = true }

  before_action :authenticate_user!, only: [:destroy]



  def create
		dog = Dog.new(dog_params)
		if dog.save!
			render json: current_user.dogs
		else
			render json: {error: dog.errors.full_messages.join(', ') }, status: :unprocessable_entity
		end
	end

  private

  def dog_params
    params.require(:dog).permit(:name, :breed, :size, :birthday, :rabies, :rabies_docs, :shots, :dog_handling, :voice_commands, :dog_aggression, :fixed, :dog_return, :dog_issues, :tos_accept, :tos_name).merge(tos_date: Time.now, user: current_user)
  end
end

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './tileData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function SingleLineGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);

 <Toolbar variant="regular">
          <Link to="/customers">
            <Button variant="contained" color="primary" className={classes.button}>
              Customers
            </Button>
          </Link>
         <JobFormDialog 
           jobs={props.jobs}
           addNewJob={props.addNewJob}
         />
        </Toolbar>

        <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Item One" />





            dfjasdfjhasdjkkhfhdsf


            import React, { Component, Fragment } from 'react'
import JobList from "../components/JobList"
import JobFormDialog from "../components/JobFormDialog"
import { Link } from "react-router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"


import BottomTabs from '../components/BottomTabs';


export default class JobsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobs: [],
      
    }
    this.addNewJob = this.addNewJob.bind(this)
    this.deleteJobHandler = this.deleteJobHandler.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.editJobHandler = this.editJobHandler.bind(this)
  }
  
   componentDidMount() {
    fetch("/api/v1/jobs.json")
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
        this.setState({ jobs: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewJob(formPayLoad) {
    fetch(`/api/v1/jobs`, {
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
        this.setState({ jobs: [...this.state.jobs, body] });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  handleDelete(id){
		fetch(`/api/v1/jobs/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json' } ,
			credentials: 'same-origin'
		})
		.then(response => {
			if (response.ok) {
        this.deleteJobHandler(id)
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
  
  deleteJobHandler(id){
    let updatedJobList = this.state.jobs.filter((job) => job.id !== id)
    this.setState({
      jobs: updatedJobList
    })
  }

  

  editJobHandler(formPayload) {
      fetch(`/api/v1/jobs/${formPayload.id}`, {
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
          let findJob = job => {
            return job.id === formPayload.id;            
          }
          let jobIndex = this.state.jobs.findIndex(findJob)
          let newJobs = this.state.jobs
          newJobs.splice(jobIndex, 1, body)
      
         this.setState({ jobs: newJobs })
        })
        .catch(error =>
          console.error(`Error in fetch: ${error.message}`)
        );
    }
    
  render() {
 
    return (
        <div>
        <main>
        <BottomTabs 
        // this is to pass the state to make a new job
          jobs={this.state.jobs}
          addNewJob={this.addNewJob}

        />
        <Typography align="center" variant="h3">
            Your Jobs 
        </Typography>
        
        <JobList  
          editJobHandler={this.editJobHandler}
          handleDelete={this.handleDelete}
          jobs={this.state.jobs}
          
        />
        </main>
        <Link to="/customers">
            <Button variant="contained" color="primary">
              Customers
            </Button>
          </Link>
         <JobFormDialog 
           jobs={this.props.jobs}
           addNewJob={this.addNewJob}
         />
     
      </div>
   
  

    )
  }
}

import React, { Component, Fragment } from 'react'
import JobTile from '../components/JobTile'
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List"
import styled from "styled-components"
import Grid from "@material-ui/core/Grid";



export default class JobList extends Component {
  constructor(props){
    super(props)
    this.state = {
      jobs: this.props.jobs
    }

  }

  render() {
    let jobCards = this.props.jobs.map((job) => {

      let deleteJob = () => {
        this.props.handleDelete(job.id)
      }

      return(
        <div key={job.id}>
          <JobTile
            editJobHandler={this.props.editJobHandler}
            jobId={job.id}
            jobName={job.name}
            notes={job.notes}
            date={job.job_date}
            firstName={job.customer.first_name}
            lastName={job.customer.last_name}
            phoneNumber={job.customer.phone_number}
            address={job.customer.address}
            city={job.customer.city}
            state={job.customer.state}
            zipCode={job.customer.zip_code}
            notes={job.notes}
            deleteJob={deleteJob}
            
          /> 
        </div>
      )
    })
    return (
    
      <div>
          {jobCards}

      </div>
      
    )
  }
}

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router"
import Button from "@material-ui/core/Button"
import JobFormDialog from "../components/JobFormDialog"
import AppBar from "@material-ui/core/AppBar"

const styles = {
  root: {
    flexGrow: 1
  }
};

class CenteredTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>

      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
        >
          <Tab label="Monday" />
          <Tab label="Tuesday" />
          <Tab label="Wednesday" />
          <Tab label="Thursday" />
          <Tab label="Friday" />
          <Tab label="Saturday" />
          <Tab label="Sunday" />
        </Tabs>
      </Paper>
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);

