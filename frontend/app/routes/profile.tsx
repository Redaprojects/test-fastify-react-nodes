// app/routes/profile.tsx
import { Link, Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-8 border-b mb-4">
        <Link to="/profile/posts/grid" className="py-2 font-semibold">
          Posts
        </Link>
        <Link to="/profile/reels/grid" className="py-2 font-semibold">
          Reels
        </Link>
      </div>
      <Outlet />
    </div>
  );
}