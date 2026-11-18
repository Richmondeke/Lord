import BeneficiarySearch from "@/components/beneficiary-search";

export const metadata = {
  title: "Beneficiaries | Empowerment Portal",
  description:
    "What has been delivered in Mbaitoli and Ikeduru, the programmes open now, and where to apply and track your application.",
};

export default function Page() {
  return (
    <>
      <div>
        <BeneficiarySearch />
      </div>
    </>
  );
}
