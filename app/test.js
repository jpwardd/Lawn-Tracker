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