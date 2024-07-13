import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatePrice = (price:number) =>{
  const formatter = new Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD"
  })
  return formatter.format(price)
}

export function constructMetaData({
  title = "CaseCobra - custom high-quality phone case",
  description = "Create custom high-quality phone case in second",
  image = './thumbnail.png',
  icons='/favicon.icon'
} : {
  title?:string,
  description?:string,
  image?:string,
  icons?:string
} = {}) :Metadata {
  return {
    title,
    description,
    openGraph:{
      title,
      description,
      images:[{url:image}]
    },
    twitter:{
      card:"summary_large_image",
      title,
      description,
      images:[image],
      creator:"@rahul154"
    }
  }
}
