import { ApplicationData } from "./types";

const STORAGE_KEY = "admission_application";

export function saveApplication(data: ApplicationData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getApplication(): ApplicationData {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      personal: {} as any,
      academic: {} as any,
      previousSchool: {} as any,
      documents: {} as any,
    };
  }

  return JSON.parse(raw);
}
