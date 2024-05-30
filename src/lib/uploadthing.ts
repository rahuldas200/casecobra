import { OurFileRouter } from "@/app/api/uploadting/core"
import { generateReactHelpers} from '@uploadthing/react'


export const {useUploadThing,uploadFiles} = generateReactHelpers<OurFileRouter>()