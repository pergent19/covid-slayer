import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-6">Covid Slayer</h1>
      <div className="space-x-4">
        <Link to="/register" className="px-4 py-2 bg-blue-500 text-white">Register</Link>
        <Link to="/login" className="px-4 py-2 bg-green-500 text-white">Login</Link>
      </div>
    </div>
  );
}
