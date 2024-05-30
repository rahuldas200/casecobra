import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import {ReactNode} from 'react'

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <MaxWidthWrapper className=" ">
            {children}
        </MaxWidthWrapper>
    )
}

export default Layout