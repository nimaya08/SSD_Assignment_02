import React from 'react';
import './Contactlist.css';
import Contact from './Contact';



function Contactlist ()  {
    const contacts=[
        {
            id:1,
            name:'Bruce',
            age:30,
        },
        {
            id:2,
            name:'Clark',
            age:30,
        },
        {
            id:3,
            name:'Diana',
            age:30,
        }
    ]
const Contactlist=contacts.map(contact=> (
    <Contact/>
    ))
return (
        <div >
      {Contactlist}
        </div>
    )
}

export default Contactlist;