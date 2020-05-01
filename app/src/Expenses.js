import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import './index.css'


class Expenses extends Component {

    emptyItem = {
        description : '' ,
        expensedate : new Date(),
        id:0,
        location : '',
        category : {id:1 , name:''}
    }

    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories:[],
        Expenses : [],
        date :new Date(),
        item : this.emptyItem
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
       this.handleDateChange= this.handleDateChange.bind(this);

    } 

    async handleSubmit(event){
     
      const item = this.state.item;
    
      await fetch(`http://localhost:8080/api/expenses`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(item),
      });
      
      event.preventDefault();
      this.props.history.push("/expenses");
    }


    handleChange(event){
      const target= event.target;
      const value= target.value;
      const name = target.name;
      let item={...this.state.item};
      item[name] = value;
      this.setState({item});
      console.log(item);
    }


    handleDateChange(date){
      let item={...this.state.item};
      item.expensedate= date;
      this.setState({item});
    
    }


    async remove(id){
        await fetch(`http://localhost:8080/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
          this.setState({Expenses : updatedExpenses});
        });
    }


    async componentDidMount() {
 
        const responseExp= await fetch('http://localhost:8080/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({Expenses : bodyExp , isLoading :false});

        const response= await fetch('http://localhost:8080/api/categories');
        const body= await response.json();
        this.setState({Categories : body , isLoading :false});

        console.log(body);

    }



    render() { 
        const title =<h3>Ajouter une dépense</h3>;
        const {Categories,isLoading} = this.state;

        const {Expenses} =this.state;
        

        if (isLoading)
            return(<div>Loading....</div>)
        

        let optionList  =
                Categories.map( (category) =>
                    <option value={category.id} key={category.id}>
                                {category.name} 
                    </option>
                )
        
        let rows =
            Expenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="DD/MM/YYYY"/></td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Supprimer</Button></td>
              </tr>


            )
              
        return (
            <div style={{backgroundColor: '#f1f1f1'}}>
                <AppNav/>
                <Container >
                  <br/>
                    {title}
                    <hr/>
                    <Form onSubmit={this.handleSubmit}>

                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="description" name="description" id="description" 
                            onChange={this.handleChange} autoComplete="name"/>
                    
                    </FormGroup>

                      <FormGroup>
                          <Label for="category" id="category">Catégorie</Label>
                          <select  onChange={this.handleChange} >
                                  {optionList}
                          </select>
                      </FormGroup>


                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                        <Label for="location">Lieu</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                        </FormGroup>                      
                    </div>

                    <FormGroup>
                        <Label for="city">Date&nbsp;&nbsp;</Label>
                        <DatePicker    selected={this.state.item.expensedate}  onChange={this.handleDateChange} />
                    </FormGroup>

                    
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Annuler</Button>
                    </FormGroup>
                  </Form>
                </Container>
              
              {''}
              <Container style={{backgroundColor: '#f1f1f1'}}>
              <hr/>
                <h3>Mes dépenses</h3>
                <Table className="mt-4">
                <thead>
                  <tr>
                    <th width="30%">Description</th>
                    <th width="10%">Lieu</th>
                    <th> Date</th>
                    <th> Catégorie</th>
                    <th width="10%">Action</th>
                  </tr>
                </thead>
                <tbody>
                   {rows}
                </tbody>

                </Table>
              </Container>

        </div>

        );
    }
}
 
export default Expenses;