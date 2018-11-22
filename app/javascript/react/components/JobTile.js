import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import JobEditDialog from "../components/JobEditDialog"
import GoogleMapReact from "google-map-react";


const styles = {
  card: {
    backgroundColor: "#FAFAFA"
  },
  media: {
    height: 140
  }
};

class JobTile extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
      let center = {
        lat: this.props.lat,
        lng: this.props.lng
    }

    const { classes } = this.props;
    return(
      <Card className={classes.card}>
  
         <div style={{ height: '20vh', width: '100%' }}>
              <GoogleMapReact
              bootstrapURLKeys={{ key:"AIzaSyA5YTh0MG0kmemXVlsl8VDbiHVUQaebWfU"}}
              center={center}
              zoom={16}
              >
              </GoogleMapReact>
        </div>
          <CardContent>
        
            <Typography align="center" variant="h6">
              {this.props.jobName}
            </Typography>
            <Typography variant="h6">
              {this.props.firstName} {this.props.lastName}
            </Typography>
            <Typography variant="h6">
              {this.props.address}
            </Typography>
            <Typography variant="h6">
              {this.props.date}
            </Typography>
            <Typography variant="h6">
              notes: {this.props.notes}
            </Typography>
          </CardContent>
        <CardActions>
         <JobEditDialog 
           editJobHandler={this.props.editJobHandler}
           jobId={this.props.jobId}
         />
          <Button color="secondary" variant="contained" onClick={this.props.deleteJob}>
            Delete
          </Button>
        </CardActions>
      </Card>
    )
  }
}


JobTile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobTile);
