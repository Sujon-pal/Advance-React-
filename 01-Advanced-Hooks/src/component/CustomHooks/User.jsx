import useFetch from "./useFetch";

const User = () => {
  const { data, error, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>Error....</h1>;
  }

  return (
    <div>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
