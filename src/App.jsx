import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { CgSearch } from "react-icons/cg";
import { FaPlusCircle } from "react-icons/fa";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
// import { IoIosContact } from "react-icons/io";
// import { FaEdit } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
import Contactcards from "./components/Contactcards";
import Modal from "./components/Modal";
import AddandUpdateContact from "./components/AddandUpdateContact";
import Usedisclosure from "./components/hooks/Usedisclosure";
import { ToastContainer } from "react-toastify";
import Notfound from "./components/Notfound";

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = Usedisclosure();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "Contacts");
        //const contactSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          // console.log(contactsRef)
          // console.log(contactSnapshot)
          // console.log(contactList)
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "Contacts");
    // const contactSnapshot = await getDocs(contactsRef);
    // for search
    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex relative items-center mb-2.5">
          <CgSearch className="text-white text-3xl ml-1 absolute" />
          <input
            onChange={filterContacts}
            type="text"
            className="pl-9 flex-grow text-white bg-transparent border rounded-md border-white h-10"
            placeholder="Search Contact"
          />
          <FaPlusCircle
            onClick={isOpen}
            className="text-white text-3xl ml-1 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          {contacts.length <= 0 ? (
            <Notfound />
          ) : (
            contacts.map((contact) => (
              <Contactcards key={contact.id} contact={contact} />
            ))
          )}
        </div>
        <AddandUpdateContact onClose={onClose} onOpen={onOpen} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
