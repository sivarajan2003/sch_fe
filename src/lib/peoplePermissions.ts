export const PEOPLE_PERMISSIONS: Record<string, string[]> = {
    admin: ["students", "parents", "guardians", "teachers"],
    teacher: ["students", "guardians", "teachers"],
    parent: ["parents"],
    student: ["students"],
  };
  