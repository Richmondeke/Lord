import StatusCheck from "@/components/status-check";

export const metadata = {
  title: "Check status | Empowerment Portal",
  description:
    "What has been delivered in Mbaitoli and Ikeduru, the programmes open now, and where to apply and track your application.",
};

export default function Page() {
  return (
    <>
      <div>
        <StatusCheck />
      </div>
    </>
  );
}
