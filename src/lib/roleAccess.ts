export const ROLE_ACCESS = {
    admin: {
      dashboard: true,
      people: true,
      academic: true,
      management: true,
      hrm: true,
      reports: true,
    },
    teacher: {
      dashboard: true,
      people: true,
      academic: true,
      management: false,
      hrm: false,
      reports: true,
    },
    student: {
      dashboard: true,
      people: ["students"],
      academic: true,
      management: false,
      hrm: false,
      reports: false,
    },
    parent: {
      dashboard: true,
      people: ["guardians"],
      academic: false,
      management: true,
      hrm: false,
      reports: false,
    },
  } as const;
  