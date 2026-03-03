export interface CreateRequest{
leave_type: "Sick"|"Vacation"|"Casual"
start_date:string
end_date:string
reason:string
}


export interface getRequest{

_id:string
reportedBy:{
username:''

}
leave_type: "Sick"|"Vacation"|"Casual"
status:"Pending"|"Approved"|"Rejected"
start_date:string
end_date:string
reason:string
approvedBy:{
    username:string | null
}

approvedDate?:string
createdAt:string
updatedAt:string
}


export interface updatedRequestStatus{
status:"Pending"|"Approved"|"Rejected"
}