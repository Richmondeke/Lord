import Dashboard from "@/components/dashboard";

export const metadata = {
  title: "My portal | Empowerment Portal",
  description:
    "What has been delivered in Mbaitoli and Ikeduru, the programmes open now, and where to apply and track your application.",
};

export default function Page() {
  return (
    <>
      <div>
        <Dashboard />
      </div>
    </>
  );
}
