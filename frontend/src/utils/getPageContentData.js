import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

async function fetchPageContent() {
  try {
    const response = await axios.get(`${apiURL}/pagecontent`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch page content:", error.message);
    throw error;
  }
}

export async function getSocialLinks() {
  const data = await fetchPageContent();
  return data.socialLinks;
}

export async function getStats() {
  const data = await fetchPageContent();
  return data.stats;
}

export async function getName() {
  const data = await fetchPageContent();
  return data.name;
}

export async function getTitle() {
  const data = await fetchPageContent();
  return data.title;
}

export async function getHeroContent() {
  const data = await fetchPageContent();
  return data.heroContent;
}

export async function getHeroImage() {
  const data = await fetchPageContent();
  return data.heroImage;
}

export async function getServices() {
  const data = await fetchPageContent();
  return data.services;
}

export async function getToolsIUse() {
  const data = await fetchPageContent();
  return data.toolsIUse;
}

export async function getHowIWork() {
  const data = await fetchPageContent();
  return data.howIwork;
}

export async function getWorkingProcess() {
  const data = await fetchPageContent();
  return data.workingProcess;
}

export async function getPlans() {
  const data = await fetchPageContent();
  return data.plans;
}
