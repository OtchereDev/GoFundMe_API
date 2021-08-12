import { Donation } from "src/payments/entity/donation.entity";

export type FundDetailSerializer ={
    id:string
    category:string[]
    title:string
    description:string
    beneficiary:string
    donations:Donation[]
    goal_amount:number
    organiser:string
    country:string
    createdAt:Date
    amountRaised:number
    no_of_donors:number
}