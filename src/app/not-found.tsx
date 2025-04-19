import Image from 'next/Image';

export const metadata = {
    title: "Page not Found",
}
 
export default function NotFound() {
  return (
    <div className='px-2 w-full'>
        <div className='mx-auto py-4 flex flex-col justify-center items-center'>
            <h2 className='text-2xl'>Page Not Found</h2>
            <Image 
                className='m-0 rounded-xl'
                src="/images/notFound.webp"
                width={300}
                height={300}
                sizes='300px'
                alt='page not found'
                priority={true}
                title='Page Not Found'
            />
        </div>
    </div>
  )
}