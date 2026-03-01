export interface CreateIssue{
title:string, 
description:string,
priority: 'low' | 'medium' | 'high';
}


export interface myIssues{

_id:string
title:string, 
description:string,
priority: 'low' | 'medium' | 'high';
status:'pending'|'in_progress'|'resolved'    
}


export interface allIssues{

_id:string
title:string, 
description:string,
priority: 'low' | 'medium' | 'high';
status:'pending'|'in_progress'|'resolved'
reportedBy:{
    _id:string
    username:string

}

createdAt:string;
updatedAt: string;
}


export interface updateStatus{
status:"pending"|"in_progress"|"resolved"
}
