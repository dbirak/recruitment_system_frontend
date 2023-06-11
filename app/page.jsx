import ProtectRoute from "@/utils/middleware/protectRoute";

export default function Home() {
  return (
    <div>
      <ProtectRoute role="user null">sadas</ProtectRoute>
    </div>
  );
}
