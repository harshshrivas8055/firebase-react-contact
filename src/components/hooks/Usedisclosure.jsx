import React, { useState } from 'react'


const Usedisclosure = () => {
     const [onOpen, setOnopen] = useState(false);
      
      const onClose = () => {
        setOnopen(false)
      };
    
      const isOpen = () => {
        setOnopen(true)
      };

  return ({onClose, onOpen, isOpen}
  )
}

export default Usedisclosure
