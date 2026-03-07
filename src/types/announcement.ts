export interface CreateNewAnnouncement{
title:string,
description:string
}

export interface getAnnouncement{
_id:string,
title:string,
description:string,
createdAt:string
}

export interface deleteOneAnnouncement{
_id:string
}