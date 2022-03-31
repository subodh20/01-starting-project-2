import { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";
const AddUser = (props) => {
  const [userName, setUserName]= useState('');
  const [userAge, setUserAge] = useState('');
  const [error,setError] = useState();

  const userNameHandler=(event)=>{
    setUserName(event.target.value);
  }
  const userAgeHandler=(event)=>{
    setUserAge(event.target.value);
  }
  const addUserHandler=(event)=>{
    event.preventDefault();
    if(userName.trim().length === 0 || userAge.trim().length===0){
      setError({
        title:'Invalid Input',
        message:'Please enter a valid name and age (non-empty values).'
      })
      return;
    }
    if(+userAge<1)
    {
      setError({
        title:'Invalid age',
        message:'Please enter age(>0)'
      })
      return;
    }
    props.onAddUser(userName,userAge);
    setUserName('');
    setUserAge('');
  }
  const errorHandler=()=>{
    setError(null);
  }
  return ( 
    <div> 
    {error && <ErrorModel title={error.title} message={error.message} onConfirm={errorHandler}/>}
    <Card className={classes.input}>
    <form onSubmit={addUserHandler}>
      <label htmlFor="username">Username</label>
      <input id="username"type="text" value={userName} onChange={userNameHandler}/>
      <label htmlFor="age">Age</label>
      <input id="age"type="number" value={userAge} onChange={userAgeHandler}/>
      <Button type='submit'>Add User</Button>
    </form>
    </Card>
    </div>
  );
}
 
export default AddUser;