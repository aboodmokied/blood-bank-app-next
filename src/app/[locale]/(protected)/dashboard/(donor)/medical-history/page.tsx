import { axiosRequest, getAuthorizedAxios } from "@/lib/auth";
import { MedicalHistory } from "@/types/dashboard.types";

export default async function MedicalHistoryPage() {
  const authAxios = await getAuthorizedAxios();
  const { medicalHistory: medicalRecords } = await axiosRequest<{
    medicalHistory: MedicalHistory[];
  }>(authAxios, {
    url: `http://localhost:5000/medical-history/1`,
    method: "GET",
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical History</h1>
      <p className="text-gray-600 mb-8">
        A list of your recorded medical conditions and notes.
      </p>

      {medicalRecords?.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No medical records found.
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {medicalRecords?.map((record) => (
            <DashboardCard key={record.id} title={record.condition}>
              <p className="text-sm text-gray-500 mb-1">
                Diagnosed on:{" "}
                <span className="text-gray-800 font-medium">
                  {new Date(record.diagnosedAt).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-600">{record.notes}</p>
            </DashboardCard>
          ))}
        </section>
      )}
    </>
  );
}

function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      {children}
    </div>
  );
}
