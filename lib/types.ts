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

export interface interviewInfo {
  name: string,
  purpose: string,
  questions: Array<string>,
  teamid: string
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
  interviews: Array<interviewInfo>
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

export interface interviewInfo {
  id: string,
  name: string,
  responses: number,
  namespace: string,
  collect: boolean,
  guide: Array<guideQuestions>,
  teamID: string
}

export interface interviewSavedInfo {
  id: string,
  name: string,
  responses: number,
  collect: boolean,
  teamId: string,
  guide: Array<guideQuestions>
}

export interface guideQuestions {
  id: string,
  question: string,
  interviewId: string
}