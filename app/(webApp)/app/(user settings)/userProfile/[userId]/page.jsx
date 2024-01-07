import UserDetails from "@/components/UserDetails/UserDetails";

export default function UserProfile({ params }) {
  return (
    <>
      <UserDetails userId={params.userId} />
    </>
  );
}
