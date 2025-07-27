import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosContact } from 'react-icons/io'
import { RiDeleteBinLine } from 'react-icons/ri'
import { db } from '../config/firebase'
import Usedisclosure from './hooks/Usedisclosure'
import AddandUpdateContact from './AddandUpdateContact'
import { toast } from 'react-toastify'

const Contactcards = ({contact}) => {

     const {isOpen, onClose, onOpen} = Usedisclosure()

    const deletecontact = async () => {
        try {
            await deleteDoc(doc(db, "Contacts", contact.id));
            toast.success("Contact Deleted")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
   <div
              key={contact.id}
              className="flex items-center justify-between bg-gray-500 rounded-lg px-3 py-2 shadow-md"
            >
              <IoIosContact className="text-white text-3xl" />
              <div className="flex-1 ml-3 text-white text-sm">
                <p className="font-semibold">{contact.name}</p>
                <p className="text-gray-200">{contact.email}</p>
              </div>
              <FaEdit onClick={isOpen} className="text-white text-2xl mx-2 cursor-pointer hover:text-blue-400" />
              <RiDeleteBinLine onClick={() => deletecontact(contact.id)} className="text-white text-2xl cursor-pointer hover:text-red-400" />
            </div>

            <AddandUpdateContact contact={contact} isUpdate onClose={onClose} onOpen={onOpen}/>
    </>
  )
}

export default Contactcards
