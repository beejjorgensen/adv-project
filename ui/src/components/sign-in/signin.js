import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import axios from 'axios';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  submitForm(event){
    const {username, password} = this.state;
    axios.post('http://localhost:8000/api/login/', {
      username: username,
      password: password,
    })
    .then(response => {
      this.props.getKey(response.data.key)
    })
    .catch(error => console.log(`${error}`))
  }
render(){
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={this.props.classes.layout}>
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign in</Typography>
          <form className={this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" autoComplete="email" autoFocus onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              className={this.props.classes.submit}
              onClick={this.submitForm}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );}
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
