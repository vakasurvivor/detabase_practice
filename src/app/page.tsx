import { HelloWorldLabel } from "@/components/hello-world-label";

export default function Home() {
  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <HelloWorldLabel />
        </div>
      </div>
    </main>
  );
}
