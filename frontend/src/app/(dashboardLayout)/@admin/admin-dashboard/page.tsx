import { redirect } from "next/navigation";

export default function UserDashboard() {
  return redirect("/admin-dashboard/analytics");
}
