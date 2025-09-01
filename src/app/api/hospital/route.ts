import { NextRequest, NextResponse } from "next/server";

const hospitals = [
  { id: 1, name: "Palestine Medical Center" },
  { id: 2, name: "Ramallah General Hospital" },
  { id: 3, name: "Gaza Health Clinic" },
  { id: 4, name: "Hebron City Hospital" },
  { id: 5, name: "Bethlehem Health Center" },
  { id: 6, name: "Nablus Regional Hospital" },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";

  const filtered = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search)
  );

  return NextResponse.json(filtered);
}
