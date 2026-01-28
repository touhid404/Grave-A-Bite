import { redirect } from "next/navigation";

export default function UserDashboard() {
  return redirect("/dashboard/orders");
}
