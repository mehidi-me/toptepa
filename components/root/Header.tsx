type Props = {};

export default function Header({}: Props) {
  return (
    <header>
      <div className="container">
        <div className="greetings">
          <p>
            Hi <span>Mehidi</span>,
          </p>
          <h1>Welcome back</h1>
        </div>
        <div className="profile-pic">
          <img src="images/user.png" alt="" />
        </div>
      </div>
    </header>
  );
}
