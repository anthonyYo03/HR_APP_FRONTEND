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