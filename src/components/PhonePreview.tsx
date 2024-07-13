'use client'
import { cn } from '@/lib/utils'
import { CaseColor } from '@prisma/client'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import React, { useEffect, useRef, useState } from 'react'

export default function PhonePreview({ croppedImageUrl, color }: { croppedImageUrl: string, color: CaseColor }) {

    const ref = useRef<HTMLDivElement>(null)

    const [renderedDimentions, setRenderedDimentions] = useState({
        height: 0,
        width: 0,
    })

    const handleResize = () => {
        if(!ref.current){
            return
        }

        const {width,height} = ref.current.getBoundingClientRect();

        setRenderedDimentions({width,height})
    }

    useEffect ( () => {
        handleResize()

        window.addEventListener("resize",handleResize)

        return () => window.removeEventListener('resize',handleResize)
    },[ref.current])

    let caseBackgroundColour = 'bg-zinc-950'
    if (color === 'blue') caseBackgroundColour = 'bg-blue-950'
    if (color === 'rose') caseBackgroundColour = 'bg-rose-950'

    return (
        <AspectRatio ref={ref} ratio={3000 / 2001} className='relative'>
            <div className=' absolute z-20 scale-[1.0352]' style={{
                left: renderedDimentions.width / 2 - renderedDimentions.width / (1216 / 121),
                top: renderedDimentions.height / 6.22,
            }}>

                <img width={renderedDimentions.width / (3000 / 637)} className={cn('phone-skew relative z-20 rounded-t-[15px] rounded-b[10px] md:t-[30px] lg:rounded-b-[20px]', caseBackgroundColour)}
                src={croppedImageUrl} alt="" />
            </div>

            <div className='relative h-full w-full z-40'>
                <img src='phone' alt="/clearphone.png" className='pointer-events-none h-full w-full antialiased rounded-md' />
            </div>

            

        </AspectRatio>
    )
}
