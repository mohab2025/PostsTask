import { Posts } from '@/components'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18 px-9 py-8">
      
      <h3 className='p-4'>Welcome to Posts Task </h3>
 
      <Posts/>
      

     
    </main>
  )
}
