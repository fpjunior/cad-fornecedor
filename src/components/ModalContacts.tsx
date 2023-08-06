import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import * as Contacts from 'expo-contacts';

type Prop = {
  showModal: boolean;
  onCloseModal: () => void;
  onSelectContact: (contact: Contact | null) => void;
};

interface Contact {
  id: string;
  name: string;
  phone: string;
  image?: string;
}

export default function ModalContacts({
  showModal,
  onCloseModal,
  onSelectContact,
}: Prop) {
  const [searchText, setSearchText] = useState('');
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    handleSelectContact2(); // Chamada para buscar os contatos ao abrir o modal
  }, []);

  const getUniqueContacts = (contacts: any) => {
    const uniqueContacts: Contact[] = [];
    const seenKeys = new Set();

    for (const contact of contacts) {
      if (!seenKeys.has(contact.id)) {
        seenKeys.add(contact.id);

        const image = contact.imageAvailable ? contact.image?.uri : undefined;
        uniqueContacts.push({
          id: contact.id,
          name: contact.firstName ?? '',
          phone: contact.phoneNumbers?.[0]?.number ?? '',
          image: image,
        });
      }
    }

    return uniqueContacts;
  };

  async function handleSelectContact2() {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      if (permission === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.ImageAvailable,
            Contacts.Fields.Image,
          ],
          pageSize: 1000,
          pageOffset: 0,
        });

        if (data.length > 0) {
          const uniqueContacts = getUniqueContacts(data);
          setContactList(uniqueContacts);
        } else {
          console.log('Nenhum contato encontrado.');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const filterContacts = (contacts: Contact[]) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => {
        onSelectContact(item); // Notificando o componente pai sobre o contato selecionado
        onCloseModal(); // Fechando o modal de contatos
      }}
    >
      {item.image ? (
        <Image style={styles.avatar} source={{ uri: item.image }} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
      )}
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={showModal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecione um contato</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do contato..."
          onChangeText={handleSearchTextChange}
          value={searchText}
        />
        <FlatList
          data={filterContacts(contactList)}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    selectedContact: {
        marginTop: 20,
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
})