// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
// import Modal from 'react-native-modal';
// import * as Contacts from 'expo-contacts';
// import { PermissionsAndroid } from 'react-native';

// interface Contact {
//   id: string;
//   name: string;
//   phone: string;
//   image?: string;
// }

// const ContactSelector: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [contactList, setContactList] = useState<Contact[]>([]);

//   const handleOpenModal = () => {
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

//   const handleSelectContact = (contact: Contact) => {
//     setSelectedContact(contact);
//     setModalVisible(false);
//   };

//   useEffect(() => {
//     handleSelectContact2(); // Chamada para buscar os contatos ao abrir o modal
//   }, []);

//   const renderContactItem = ({ item }: { item: Contact }) => (
//     <TouchableOpacity
//       style={styles.contactItem}
//       onPress={() => handleSelectContact(item)}
//     >
//       {item.image ? (
//         <Image style={styles.avatar} source={{ uri: item.image }} />
//       ) : (
//         <View style={styles.avatarPlaceholder}>
//           <Text style={styles.avatarText}>{item.name[0]}</Text>
//         </View>
//       )}
//       <Text>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   const getUniqueContacts = (contacts: any) => {
//     const uniqueContacts: Contact[] = [];
//     const seenKeys = new Set();

//     for (const contact of contacts) {
//       if (!seenKeys.has(contact.id)) {
//         seenKeys.add(contact.id);
        
//         const image = contact.imageAvailable ? contact.image?.uri : undefined; // URL da imagem (caso exista)
//         uniqueContacts.push({
//           id: contact.id,
//           name: contact.firstName ?? '',
//           phone: contact.phoneNumbers?.[0]?.number ?? '',
//           image: image,
//         });
//       }
//     }

//     return uniqueContacts;
//   };

//   async function handleSelectContact2() {
//     try {
//       const permission = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS
//       );
//       if (permission === 'granted') {
//         const { data } = await Contacts.getContactsAsync({
//           fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers, Contacts.Fields.ImageAvailable, Contacts.Fields.Image,],
//           pageSize: 1000,
//           pageOffset: 0,
//         });

//         if (data.length > 0) {
//           const uniqueContacts = getUniqueContacts(data);
//           setContactList(uniqueContacts);
//         } else {
//           console.log('Nenhum contato encontrado.');
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
//         <Text>Cadastrar através de um contato</Text>
//       </TouchableOpacity>
//       <Modal isVisible={modalVisible} onBackdropPress={handleCloseModal}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Selecione um contato</Text>
//           <FlatList
//             data={contactList} // Usando a lista de contatos real aqui
//             renderItem={renderContactItem}
//             keyExtractor={(item) => item.id}
//           />
//         </View>
//       </Modal>
//       {selectedContact && (
//         <View style={styles.selectedContact}>
//           <Text>Contato selecionado:</Text>
//           <Text>{selectedContact.name}</Text>
//           <Text>Telefone: {selectedContact.phone}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     avatar: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//       },
//       avatarPlaceholder: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//         backgroundColor: '#ccc',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       avatarText: {
//         color: 'white',
//         fontSize: 24,
//         fontWeight: 'bold',
//       },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#4f80c3',
//     borderRadius: 5,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   contactItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   selectedContact: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });

// export default ContactSelector;
