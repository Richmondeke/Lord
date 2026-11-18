import SignIn from "@/components/sign-in";

export const metadata = {
  title: "Sign in | Empowerment Portal",
  description:
    "What has been delivered in Mbaitoli and Ikeduru, the programmes open now, and where to apply and track your application.",
};

export default function Page() {
  return (
    <>
      <div>
        <SignIn />
      </div>
    </>
  );
}
