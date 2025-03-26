import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, gql } from '@apollo/client';

const USER_QUERY = gql`
  query UserQuery {
    users {
      createdAt
      email
    }
  }
`;

export default function Profile() {
  const { loading, error, data } = useQuery(USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.users?.[0]; // Assuming the first user

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </CardHeader>
    </Card>
  );
}
