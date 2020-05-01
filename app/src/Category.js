import React,{Component} from 'react';
import AppNav from './AppNav';
import { ListGroup, ListGroupItem,Button ,Table,Container,Input,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';


class Category extends Component {
    emptyItem = {
        id:0,
        name:''
    }
    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories : [],
        item : this.emptyItem
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
    } 

     async handleSubmit(event){
     
        const item = this.state.item;
      
        await fetch(`http://localhost:8080/api/categories`, {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(item),
        });
        
        event.preventDefault();
        this.props.history.push("/categories");
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


      
     async componentDidMount(){
         const response = await fetch('http://localhost:8080/api/categories');
         const body = await response.json();
         this.setState({Categories: body, isLoading:false});

     }


    render() { 
        const title =<h3>Catégories</h3>;
        const {Categories, isLoading} = this.state;
        
        if (isLoading)
                return (<div> loading ...</div>);


        let rows =
                Categories.map( category =>  
                   <tr key={category.id}>
                    <td>{category.name}</td>
                 </tr>);

        return ( 
            <div  style={{backgroundColor: '#f1f1f1'}}>
                <AppNav/>
                <Container >
                    <br/>
                    {title}
                    <hr/>
                         {rows}
                     <hr/>
                    <h3>Nouvelle catégorie</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name"></Label>
                            <Input type="text" name="name" id="name" 
                                onChange={this.handleChange}/>
                        
                        </FormGroup>
                        <FormGroup>
                            <Button className="mr" color="primary" type="submit" to="/">Créer catégorie</Button>
                        </FormGroup>

                    </Form>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                </Container>
 
            </div>
            );  
    }
}


  
export default Category;