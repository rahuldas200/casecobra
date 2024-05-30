import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'


export default function Footer() {
  return (
    <footer className=' bg-white h-20 relative'>
        <MaxWidthWrapper>
            <div className='border-t border-gray-200 '>
                <div className='h-full flex flex-col md:flex-row mt-5 md:justify-between justify-center items-center'>
                    <div className='text-center md:text-left pb-2 md:pb-0'>
                        <p className=' text-sm text-muted-foreground'>
                            &copy;{new Date().getFullYear()} All right reservered
                        </p>

                    </div>

                    <div className=' flex items-center justify-center'>
                        <div className=' flex space-x-8'>
                            <Link href="#" className='text-sm text-muted-foreground hover:text-gray-600'>
                                Terms
                            </Link>
                            <Link href="#" className='text-sm text-muted-foreground hover:text-gray-600'>
                                Privacy policy
                            </Link>
                            <Link href="#" className='text-sm text-muted-foreground hover:text-gray-600'>
                                coockie policy
                            </Link>

                        </div>

                    </div>

                </div>
            </div>
        </MaxWidthWrapper>
    </footer>
  )
}
