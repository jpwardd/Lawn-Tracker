import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Draggable } from "react-beautiful-dnd"

const styles = {
  card: {
    maxWidth: 345,
    margin: 8,
  },
  media: {
    height: 140,
  },
};

class JobTile extends React.Component{
  constructor(props) {
    super(props);
  }


  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.firstName} {this.props.lastName}
            </Typography>
            <Typography component="p">
              {this.props.address}
            </Typography>
            <Typography component="p">
              {this.props.city}, {this.props.state} {this.props.zipCode}.
            </Typography>
            <Typography component="p">
              {this.props.date}
            </Typography>

          </CardContent>
        </CardActionArea>
        <CardActions>
        
        </CardActions>
      </Card>
  )
  }
}


JobTile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobTile);
