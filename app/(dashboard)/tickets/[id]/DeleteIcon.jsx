"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

// icons & UI
import { TiDelete } from 'react-icons/ti'
import { deleteTicket } from '../actions'

export default function DeleteIcon({ id }) {
  const [isPending,startTransition] = useTransition()

  

  return (
    <button 
      className="btn-primary" 
      onClick={()=>startTransition(()=>deleteTicket(id))}
      disabled={isPending}
    >
      {isPending && (
        <>
          <TiDelete />
          Deleting....
        </>
      )}
      {!isPending && (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  )
}