import React from 'react';
import { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import Contact from './Contact'
import data from './data'
import './Layout.css'


 class Layout extends React.Component {

   componentWillMount(){
     this.setState({
       contacts: data,
     });
   }

   addContact = (e) => {
     e.preventDefault()

     const contacts = this.state.contacts;
     const newId = contacts[contacts.length - 1].id + 1;

     this.setState({
       contacts: contacts.concat({
         id: newId,
         name: this.refs.name.value,
         email: this.refs.email.value,
       }),
     });
     this.refs.name.value = null
     this.refs.email.value = null
   };

   newContact = () =>
    <div className="pure-g">
      <div className="pure-u-12-24">
        <form className="pure-form" onSubmit={this.addContact}>
          <fieldset>
            <legend>New contact</legend>
            <input ref='email' type='email' placeholder='example@example.com' />
            <input ref='name' type='text' placeholder='Name' />

            <button type='submit' className='pure-button pure-button-primary'>Add</button>
          </fieldset>
        </form>
      </div>
    </div>

   render(){
     return (
       <div className="Layout">
        {this.newContact()}
         <div className='pure-g'>
           {this.state.contacts.map(info =>
             <Contact key={info.id} {...info} />
           )}
         </div>
       </div>
     )
   }
 }

 const mapStateToProps = ({ contacts }) => ({
  contacts
})

 export default connect(mapStateToProps)(Layout)
