import { Global } from '@emotion/react';
import { Layout } from './Layout/Layout';
import { Style } from './GlobalStyle';
import { Component } from 'react';
import { ContactForm } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { Title } from './Contacts/Contacts.styled';
import { ContactsFilter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+380-32-459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '+980-32-443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '180-32-645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '380-32-227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const hasName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (hasName) return window.alert(`${name} is allready in contacts`);

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };
  filteredContact = e => {
    this.setState({ filter: e.currentTarget.value.trim() });
  };
  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedContacts = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedContacts)
    );
  };
  resetFormFilter = e => {
    e.preventDefault();
    this.setState({ filter: '' });
  };
  render() {
    const hasContacts = Boolean(this.state.contacts.length);
    const visibleContacts = this.getVisibleContact();
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        {hasContacts && (
          <>
            <Title>Contacts</Title>
            <ContactsFilter
              value={this.state.filter}
              onChange={this.filteredContact}
              onClick={this.resetFormFilter}
            />
            <Contacts
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        )}
        <Global styles={Style} />
      </Layout>
    );
  }
}
