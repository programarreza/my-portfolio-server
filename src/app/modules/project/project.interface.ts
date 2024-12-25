export type TProject = {
  _id: string;
  title: string;
  description: string;
  deployLink: string;
  githubClientLink: string;
  githubServerLink: string;
  projectChallenges: string;
  improvement: string;
  technologies: string[];
  features: string[];
  image: string;
  isDeleted: boolean;
};
