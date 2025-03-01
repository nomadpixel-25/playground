const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
  isLoggedIn: true,
};

const isLoggedIn = user.isLoggedIn;
const AdminPanel = () => <h1>Admin Panel</h1>;
const LoginForm = () => <h1>Login Form</h1>;

export default function Profile() {
  let content;
  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
    return (
      <>
    <h1>{user.name}</h1>
    <img
      className="avatar"
      src={user.imageUrl}
      alt={'Photo of ' + user.name}
      style={{
        width: user.imageSize,
        height: user.imageSize
      }}
      />
  </>
);
}
}