import { notFound } from "next/navigation"

export const dynamicParams = true // default val = true

// export async function generateStaticParams() {
//   const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//   const res = await fetch(`${baseURL}/tickets`)

//   const tickets = await res.json()
 
//   return tickets.map((ticket) => ({
//     id: ticket.id
//   }))
// }

async function getTicket(id) {
    // imitate delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    const res = await fetch(`${baseURL}/tickets/${id}`, {
      next: {
        revalidate: 60
      }
    })

    if (!res.ok) {
        notFound()
      }
  
    return res.json()
  }

export default async function TicketDetails({ params }) {
  const { id } = await params
  const ticket = await getTicket(id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
      
    </main>
  )
}
