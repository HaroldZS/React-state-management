import { SecurityFormFC } from "@/components/SecurityFormFC";

function UseStatePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SecurityFormFC repository="AnyRepositoryToDelete" />
    </div>
  );
}

export default UseStatePage;
