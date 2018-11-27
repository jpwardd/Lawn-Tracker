import React from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styled from "styled-components"
import Typography from "@material-ui/core/Typography"

const Container = styled.div`
  border: 1px solid lightgrey;
  margin: 8px;
  background-color: white;
  border-radius: 10px;
`;

const WorkLoad = (props) => {
  let employeesWorkload = props.workLoad.map(job => {
    return(
      <div key={job.id}>
        <Container>
          <List>  
            <ListItem>{job.customer.first_name} {job.customer.last_name}</ListItem>
            <ListItem>{job.customer.address}</ListItem>
            <ListItem>{job.presentable_job_date}</ListItem>
          </List>
        </Container>
      </div>
    )
})
  return(
    <div>
    {employeesWorkload}
    </div>
  )
}

export default WorkLoad;