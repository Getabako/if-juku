export interface ServiceInfo {
  id: string;
  title: string;
  content: string;
  image: string;
}

export interface CourseInfo {
  id: string;
  title: string;
  description: string;
  frequency: string;
  targetGrade: string;
  features: string[];
}

export interface MemberInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  imagePc: string;
  imageSp: string;
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface IssueCard {
  id: string;
  title: string;
  content: string;
  image: string;
}

export interface QuestItem {
  icon: string;
  name: string;
  status: string;
  tools: string;
}