export interface userInfo {
  name: string
  email: string
  customerId: string
}

export interface teamInfo {
  name: string
  interviewerName: string
  context: string
}

export interface teamSavedInfo {
  id: string,
  name: string,
  plan: number,
  interviewer: string,
  context: string,
  stripeID: string,
  createdAt: Date,
  inviteID: string,
  members: Array<userSavedInfo>
}

export interface userSavedInfo {
  id: string,
  name: string,
  email: string,
  stripeID: string
}

export interface teamUpdateInfo {
  id: string,
  name: string,
  interviewerName: string,
  context: string
}