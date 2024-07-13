import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatePrice } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { WEBPACK_LAYERS } from "next/dist/lib/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusDropdown } from "./StatusDropdown";

const Page = async () => {

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL

    if(!user || user.email !== ADMIN_EMAIL){
        return notFound();
    }

    const orderes = await db.order.findMany({
        where:{
            isPaid:true,
            createdAt:{
                gte: new Date (new Date().setDate(new Date().getDate()-7))
            }
        },
        orderBy: {
            createdAt:'desc'
        },
        include:{
            user:true,
            shipingAddress:true
        }
    })

    const lastWeekSum = await db.order.aggregate({
        where:{
            isPaid:true,
            createdAt:{
                gte: new Date (new Date().setDate(new Date().getDate()-7))
            }
        },
        _sum:{
            amount:true
        },
    })

    const lastMounthSum = await db.order.aggregate({
        where:{
            isPaid:true,
            createdAt:{
                gte: new Date (new Date().setDate(new Date().getDate()- 300))
            }
        },
        _sum:{
            amount:true
        },
    })


    const WeekLy_goal = 500;
    const mounthlyGoal = 2500

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <div className=" max-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>
                                Last week
                            </CardDescription>
                            <CardTitle className="text-4xl">
                                {formatePrice(lastWeekSum._sum.amount ?? 0)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                of {formatePrice(WeekLy_goal)} goal
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={((lastWeekSum._sum.amount ?? 0) * 100) / WeekLy_goal} />
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>
                                Last mounth
                            </CardDescription>
                            <CardTitle className="text-4xl">
                                {formatePrice(lastMounthSum._sum.amount ?? 0)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                of {formatePrice(mounthlyGoal)} goal
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={((lastMounthSum._sum.amount ?? 0) * 100) / mounthlyGoal} />
                        </CardFooter>
                    </Card>

                </div>

                <h1 className=" text-4xl font-bold tracking-tighter">
                    Incomimg orders
                </h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Coustomer</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden sm:table-cell">Purchase date</TableHead>
                            <TableHead className="hidden sm:table-cell">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            orderes.map( (order) => (
                                <TableRow key={order.id} className="bg-accent">
                                    <TableCell>
                                        <div className=" font-medium">
                                            {order.shipingAddress?.name}
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {order.user.email}
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden md:table-cell ">
                                        <StatusDropdown id={order.id} currentStatus={order.status}/>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell ">
                                        {order.createdAt.toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {formatePrice(order.amount)}
                                    </TableCell>

                                </TableRow>
                            ))
                        }                        
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Page