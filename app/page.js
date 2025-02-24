import { userData } from "@/data/user-data";
import Contributions from "./components/contributions";
import HeroSection from "./components/hero-section";
import GitLanguage from "./components/language";
import Projects from "./components/projects";
import Rank from "./components/rank";
import GitStats from "./components/stats";

async function getGitProfile() {
  const res = await fetch(
    `https://api.github.com/users/${userData.githubUser}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

async function getGitProjects() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          user(login: "thevu29") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  stargazerCount
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.data.user.pinnedItems.nodes;
}

export default async function Home() {
  const profile = await getGitProfile();
  const projects = await getGitProjects();

  return (
    <>
      <HeroSection profile={profile} />
      <GitStats />
      <Projects projects={projects} profile={profile} />
      <GitLanguage />
      <Rank />
      <Contributions />
    </>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const profile = await getGitProfile();

  return {
    title: `Nguyen The Vu`,
    description: profile.description,
  };
}
