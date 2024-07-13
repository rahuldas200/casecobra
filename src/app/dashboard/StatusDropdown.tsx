'use client'
import React from 'react'
import { OderStatus} from '@prisma/client'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { changeOrderStatus } from './action'
import { useRouter } from 'next/navigation'

const LABLE_MAP :Record<keyof typeof OderStatus, string> = {
  awiting_shipment:"Wating Shipment",
  fulfilled:"Fullfield",
  shipped:"Shipped"
} 

export const StatusDropdown = ({id,currentStatus}:{id:string,currentStatus:OderStatus}) => {

  const router = useRouter()
    
  const {mutate} = useMutation({
    mutationKey:['chenge-order-status'],
    mutationFn:changeOrderStatus,
    onSuccess:() => router.refresh(),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' 
        className='w-52 flex justify-between items-center'
        >
          {LABLE_MAP[currentStatus]}    
          <ChevronsUpDown className=' ml-4 w-4 h-4 shrink-0 opacity-50'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuTrigger className='p-0'>
          {Object.keys(OderStatus).map((status) => (
              <DropdownMenuItem key={status} className={ cn('flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',{
                "bg-zinc-100": currentStatus === status,
              })} >
                <Check 
                onClick={() => mutate({id,newStatus:status as OderStatus})}
                className={cn("mr-2 h-4 w-4 text-primary",currentStatus === status ? "opacity-100": "opacity-0")}/>
                {LABLE_MAP[status as OderStatus]}

              </DropdownMenuItem>
          ))}
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
