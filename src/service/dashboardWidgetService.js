//dashboardWidgetService.js
import axios from "axios";

const API =
"http://localhost:4000/api/v1/psms/dashboard";

export const getTopSubjects =
(className) =>
axios.get(
`${API}/top-subjects?className=${className}`
);

export const getStudentActivities =
() =>
axios.get(
`${API}/student-activity`
);

export const getTodos =
() =>
axios.get(
`${API}/todos`
);