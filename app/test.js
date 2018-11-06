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