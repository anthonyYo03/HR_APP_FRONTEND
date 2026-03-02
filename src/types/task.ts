export interface CreateTask{
name:string,
description:string,
status:string,
dueDate:string
priority: 'low' | 'medium' | 'high'

assignedTo:{
_id:string,
username:string
}
}






export interface getAllTask{

_id:string
createdBy:{
_id:string,
username:string
}
name:string,
description:string,
status:'pending'|'in-progress'|'completed',
dueDate:string
priority: 'low' | 'medium' | 'high'

assignedTo:{
_id:string,
username:string
},

createdAt:string,
updatedAt:string



}



export interface getOneTask{

_id:string
createdBy:{
_id:string,
username:string
}
name:string,
description:string,
status:'pending'|'in-progress'|'completed',
dueDate:string
priority: 'low' | 'medium' | 'high'

assignedTo:{
_id:string,
username:string
},

createdAt:string,
updatedAt:string



}







