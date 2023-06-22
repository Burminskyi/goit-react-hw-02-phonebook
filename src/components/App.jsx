import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Filter } from './Filter/Filter.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const contact = { id: nanoid(), name: data.name, number: data.number };
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filtredContacts = this.getFilteredContacts();

    return (
      <div
        style={{
          width: '300px',
          padding: '15px',
          margin: 'auto',
          alignContent: 'center',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filtredContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
