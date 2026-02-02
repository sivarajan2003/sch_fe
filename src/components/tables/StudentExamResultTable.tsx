export default function StudentExamResultTable() {
    const data = [
      { subject: "Maths", marks: 95, grade: "A+" },
      { subject: "Physics", marks: 88, grade: "A" },
      { subject: "Chemistry", marks: 82, grade: "B+" },
    ];
  
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Marks</th>
              <th className="p-3 text-left">Grade</th>
            </tr>
          </thead>
  
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{r.subject}</td>
                <td className="p-3">{r.marks}</td>
                <td className="p-3">{r.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  