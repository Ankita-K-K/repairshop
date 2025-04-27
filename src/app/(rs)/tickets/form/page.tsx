import { getCustomer } from "@/lib/queries/getCustomers";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/backButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "./TicketForm";
export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{[key: string]: string | undefined}>
}){
    try{
        const { customerId, ticketId } = await searchParams;
         if(!ticketId && !customerId){
                return(
                    <>
                        <h2 className="text-2xl mb-2">Ticket Id or Customer Id is required to load form</h2>
                        <BackButton title="Go Back" variant="default"/>
                    </>
                )
            }
            //new ticket form
            if(customerId){
                const customer = await getCustomer(parseInt(customerId));
                if(!customer){
                    return(
                        <>
                            <h2 className="text-2xl mb-2">Customer Id #{customerId} not found</h2>
                            <BackButton title="Go Back" variant="default"/>
                        </>
                    )
                }
                if(!customer.active){
                    return(
                        <>
                            <h2 className="text-2xl mb-2">Customer Id #{customerId} is not active.</h2>
                            <BackButton title="Go Back" variant="default"/>
                        </>
                    )
                }
                //return ticket form 
                console.log(customer);
                return <TicketForm customer={customer} />
            }
            //edit ticket form
            if(ticketId){
                const ticket = await getTicket(parseInt(ticketId));
                if(!ticket){
                    return(
                        <>
                            <h2 className="text-2xl mb-2">Ticket Id #{ticketId} not found</h2>
                            <BackButton title="Go Back" variant="default"/>
                        </>
                    )
                }
                const customer = await getCustomer(ticket.customerId);

                //return ticket form

                console.log("Ticket:", ticket);
                console.log("Customers: ", customer);
                return <TicketForm customer={customer} ticket={ticket} />
            }
    }catch(e){
        if(e instanceof Error){
            Sentry.captureException(e);
            throw e;
        }
    }
}