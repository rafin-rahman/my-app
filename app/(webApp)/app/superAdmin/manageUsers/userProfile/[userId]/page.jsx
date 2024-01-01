import UserDetails from "@/components/UserDetails";

export default function UserProfile({ params }) {
  return (
    <>
      <UserDetails userId={params.userId} />
    </>
  );
}
