import { auth } from "@/auth";
import { getAuthorizedAxios } from "@/lib/axios-auth";
import { Donation } from "@/types/dashboard.types";
import { format } from "date-fns";
import { Calendar, Droplet, Activity, Info } from "lucide-react";

export default async function DonationHistoryPage() {
  const session = await auth();
  const user = session?.user;
  const authAxios = await getAuthorizedAxios();

  let donations: Donation[] = [];
  try {
    const { data } = await authAxios.get(
      `http://localhost:5000/donations/donor/${user?.id}`
    );
    donations = data.donations;
  } catch (error) {
    console.error("Failed to fetch donations:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Donation History</h1>
        <p className="text-gray-600 mt-2">
          Track the status of your blood donations and see how you've helped save
          lives.
        </p>
      </div>

      {donations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplet className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Donations Yet
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            You haven't made any donations yet. Schedule an appointment to start
            saving lives!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
}

function DonationCard({ donation }: { donation: Donation }) {
  const getStatusColor = (status: Donation["status"]) => {
    switch (status) {
      case "stored":
        return "bg-green-100 text-green-700 border-green-200";
      case "discarded":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusLabel = (status: Donation["status"]) => {
    switch (status) {
      case "stored":
        return "Verified & Stored";
      case "discarded":
        return "Discarded";
      default:
        return "Processing / Collected";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <Droplet className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-gray-900 text-lg">
                {donation.volume}ml Donation
              </span>
              <span className="text-sm px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                {donation.bloodType}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {format(new Date(donation.donationDate), "PPP")}
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 mr-1.5" />
                ID: #{donation.id}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
              donation.status
            )}`}
          >
            {getStatusLabel(donation.status)}
          </div>
          {donation.status === "discarded" && (
             <div title="Check your medical history for more details" className="cursor-help text-gray-400 hover:text-gray-600">
                <Info className="w-5 h-5" />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
