"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

// icons & UI
import { TiDelete } from 'react-icons/ti'
import { deleteTicket } from '../actions'

export default function DeleteIcon({ id }) {
  const [isPending,startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const handleClick = async () => {
    setIsLoading(true)
    
    const res = await fetch(`${baseUrl}/api/tickets/${id}`,{
      method: "DELETE"
    })
    const json = await res.json()

    if (json.error){
      console.log(error)
      setIsLoading(false)
    }
    if(!json.error){
      router.refresh()
      router.push('/tickets')
    }
  }

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