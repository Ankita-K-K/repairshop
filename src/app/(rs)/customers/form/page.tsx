import { getCustomer } from "@/lib/queries/getCustomers";
import { BackButton } from "@/components/backButton";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "./CustomerForm";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{[key: string]: string | undefined}>
}){
    const {customerId} = await searchParams;
    if(!customerId) return { title: "New Customer"}
    return {title: `Edit Customer #${customerId}`}
}

export default async function CustomerFormPage({
    searchParams,
}: {
    searchParams: Promise<{[key: string]: string | undefined}>
}){
    try{
        const {customerId} = await searchParams;

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
            console.log(customer);
            //put form component
            return <CustomerForm customer={customer} />
        } else{
            //new customer form component
            return <CustomerForm />
        }
    }catch(e){
        if(e instanceof Error){
            Sentry.captureException(e);
            throw e;
        }
    }
}